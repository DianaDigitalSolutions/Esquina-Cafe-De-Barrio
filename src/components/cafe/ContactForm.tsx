import { useState, type FormEvent } from "react";
import { Field, aria } from "./Field";
import { EMAIL_RE } from "./data";

const empty = { name: "", email: "", message: "" };
type Key = keyof typeof empty;

export function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);

  const set = (k: Key) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSendError("");
    const errs: Partial<Record<Key, string>> = {};
    if (!f.name.trim()) errs.name = "Dinos cómo te llamas para saludarte.";
    if (!f.email.trim()) errs.email = "Necesitamos tu correo para poder responderte.";
    else if (!EMAIL_RE.test(f.email.trim())) errs.email = "Este correo no parece válido. Revisa que tenga @ y un dominio.";
    if (!f.message.trim()) errs.message = "Escríbenos tu mensaje, aunque sea un “hola”.";
    setErrors(errs);
    const first = (Object.keys(empty) as Key[]).find((k) => errs[k]);
    if (first) { document.getElementById(`contact-${first}`)?.focus(); return; }
    setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/dianasmf.2009@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nombre: f.name.trim(), email: f.email.trim(), mensaje: f.message.trim(), _subject: "Nuevo contacto", _template: "table", _captcha: "false" }),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Send failed");
      setF(empty);
      onSuccess();
    } catch {
      setSendError("No se ha podido enviar, inténtalo de nuevo");
    } finally {
      setSending(false);
    }
  };

  const p = (k: Key) => ({ ...aria(`contact-${k}`, errors[k]), value: f[k], onChange: set(k), className: "field" });

  return (
    <section id="contacto" className="bg-surf px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">¡Pásate a saludarnos o escríbenos!</h2>
        <p className="mt-3 text-center text-lg text-soft">Una pregunta, una sugerencia o simplemente un “hola”. Leemos todo.</p>
        <form noValidate onSubmit={submit} className="mt-8">
          <div className="space-y-4">
            <Field id="contact-name" label="Nombre" error={errors.name}><input type="text" autoComplete="name" {...p("name")} /></Field>
            <Field id="contact-email" label="Correo electrónico" error={errors.email}><input type="email" autoComplete="email" {...p("email")} /></Field>
            <Field id="contact-message" label="Mensaje" error={errors.message}><textarea rows={5} {...p("message")} /></Field>
          </div>
          {sendError && <p role="alert" className="mt-4 text-danger">{sendError}</p>}
          <button type="submit" disabled={sending} className="btn mt-6 w-full bg-leaf text-onleaf shadow-lg">{sending ? "Enviando…" : "Enviar mensaje"}</button>
        </form>
      </div>
    </section>
  );
}
