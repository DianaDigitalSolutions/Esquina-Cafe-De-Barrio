import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/cafe/ContactForm";
import { CakeOrderPanel } from "@/components/cafe/CakeOrderPanel";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const fill = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label, { exact: true }), { target: { value } });
const accepted = (_url: string, _options: RequestInit) => Promise.resolve({ ok: true, json: async () => ({ success: "true" }) });

describe("FormSubmit delivery", () => {
  it("sends contact fields and the fixed owner and subject, clearing only after acceptance", async () => {
    const fetchMock = vi.fn(accepted);
    vi.stubGlobal("fetch", fetchMock);
    const onSuccess = vi.fn();
    render(<ContactForm onSuccess={onSuccess} />);
    fill("Nombre", "Prueba"); fill("Correo electrónico", "test@example.com"); fill("Mensaje", "Mensaje de prueba");
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://formsubmit.co/ajax/dianasmf.2009@gmail.com");
    const options = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json", Accept: "application/json" });
    expect(JSON.parse(String(options.body))).toEqual({ nombre: "Prueba", email: "test@example.com", mensaje: "Mensaje de prueba", _subject: "Nuevo contacto", _template: "table", _captcha: "false" });
    expect((screen.getByLabelText("Mensaje") as HTMLTextAreaElement).value).toBe("");
  });
  it("retains contact input and never confirms when the service rejects a request", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ success: "false" }) })));
    const onSuccess = vi.fn();
    render(<ContactForm onSuccess={onSuccess} />);
    fill("Nombre", "Prueba"); fill("Correo electrónico", "test@example.com"); fill("Mensaje", "Conservar este mensaje");
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await screen.findByRole("alert");
    expect(onSuccess).not.toHaveBeenCalled();
    expect((screen.getByLabelText("Mensaje") as HTMLTextAreaElement).value).toBe("Conservar este mensaje");
  });
  it("includes the custom cake range, description and every completed order field", async () => {
    const fetchMock = vi.fn(accepted);
    vi.stubGlobal("fetch", fetchMock);
    const onSuccess = vi.fn();
    const onClose = vi.fn();
    render(<CakeOrderPanel onClose={onClose} onSuccess={onSuccess} />);
    fill("Nombre y apellidos", "Prueba"); fill("Teléfono", "612345678"); fill("Correo electrónico", "test@example.com");
    fill("Día de recogida", "2099-12-20"); fill("Franja de recogida", "Mañana (9:00–13:00)");
    fill("Para cuántas personas", "25"); fill("Elige tu tarta", "custom");
    fill("Describe tu tarta", "Chocolate"); fill("¿Qué diseño quieres que tenga?", "Flores"); fill("Alergias o intolerancias", "Nueces");
    fireEvent.click(screen.getByRole("button", { name: "Enviar encargo" }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(onClose).toHaveBeenCalledOnce();
    const options = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(options.body))).toEqual({ nombre: "Prueba", email: "test@example.com", "teléfono": "612345678", tarta: "Tarta a tu gusto", personas: 25, "precio estimado": "87,50 € – 125,00 €", "descripción": "Chocolate", fecha: "2099-12-20", "franja de recogida": "Mañana (9:00–13:00)", "diseño": "Flores", "alergias o intolerancias": "Nueces", _subject: "Nuevo encargo de tarta", _template: "table", _captcha: "false" });
  });
});