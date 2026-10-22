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
    fill("Día de recogida", "2099-12-20"); fill("Hora de recogida", "10:00");
    fill("Para cuántas personas", "25"); fill("Elige tu tarta", "custom");
    fill("Describe tu tarta", "Chocolate"); fill("¿Qué diseño quieres que tenga?", "Flores"); fill("Alergias o intolerancias (opcional)", "Nueces");
    fireEvent.click(screen.getByRole("button", { name: "Enviar encargo" }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(onClose).toHaveBeenCalledOnce();
    const options = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(options.body))).toEqual({ nombre: "Prueba", email: "test@example.com", "teléfono": "612345678", tarta: "Tarta a tu gusto", personas: 25, "precio estimado": "87,50 € – 125,00 €", "descripción": "Chocolate", fecha: "2099-12-20", "franja de recogida": "10:00", "diseño": "Flores", "alergias o intolerancias": "Nueces", _subject: "Nuevo encargo de tarta", _template: "table", _captcha: "false" });
    expect((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).value).toBe("");
  });
});

describe("Pickup hours", () => {
  const options = () => Array.from((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).options).map((option) => option.value).filter(Boolean);
  const range = (start: number, end: number) => Array.from({ length: (end - start) / 30 + 1 }, (_, i) => {
    const minute = start + i * 30;
    return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
  });
  it("disables time selection until a date is chosen", () => {
    render(<CakeOrderPanel onClose={vi.fn()} onSuccess={vi.fn()} />);
    expect((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).disabled).toBe(true);
    expect(options()).toEqual([]);
  });
  it.each(["2027-01-04", "2027-01-05", "2027-01-07", "2027-01-08", "2027-01-13"])("offers weekday hours in half-hour steps on %s", (date) => {
    render(<CakeOrderPanel onClose={vi.fn()} onSuccess={vi.fn()} />);
    fill("Día de recogida", date);
    expect(options()).toEqual([...range(450, 780), ...range(990, 1200)]);
  });
  it("offers Saturday hours in half-hour steps", () => {
    render(<CakeOrderPanel onClose={vi.fn()} onSuccess={vi.fn()} />);
    fill("Día de recogida", "2027-01-09");
    expect(options()).toEqual([...range(510, 810), ...range(1020, 1230)]);
  });
  it.each(["2027-01-10", ...["01-01", "01-06", "05-01", "08-15", "10-12", "11-01", "12-06", "12-08", "12-25"].flatMap((date) => [`2027-${date}`, `2028-${date}`])])("offers only 09:00–13:30 on Sundays and recurring holidays: %s", (date) => {
    render(<CakeOrderPanel onClose={vi.fn()} onSuccess={vi.fn()} />);
    fill("Día de recogida", date);
    expect(options()).toEqual(range(540, 810));
  });
  it("clears invalid times after date changes but preserves valid times", () => {
    render(<CakeOrderPanel onClose={vi.fn()} onSuccess={vi.fn()} />);
    fill("Día de recogida", "2027-01-04"); fill("Hora de recogida", "16:30");
    fill("Día de recogida", "2027-01-09");
    expect((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).value).toBe("");
    fill("Hora de recogida", "10:00"); fill("Día de recogida", "2027-01-10");
    expect((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).value).toBe("10:00");
    fill("Día de recogida", "");
    expect((screen.getByLabelText("Hora de recogida") as HTMLSelectElement).value).toBe("");
  });
});