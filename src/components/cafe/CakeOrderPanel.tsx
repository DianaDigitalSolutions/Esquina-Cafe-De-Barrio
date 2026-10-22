import { useState, type FormEvent } from "react";
import { Panel } from "./Panel";
import { Field, aria } from "./Field";
import { EMAIL_RE, PHONE_RE, cakes, cakeSizes, cakeEstimateLabel } from "./data";

const empty = { name: "", phone: "", email: "", date: "", slot: "", people: "", cake: "", flavor: "", design: "", allergies: "" };
type Form = typeof empty;
type Key = keyof Form;

const holidays = ["01-01", "01-06", "05-01", "08-15", "10-12", "11-01", "12-06", "12-08", "12-25"];
function pickupTimes(date: string) {
  if (!date) return { morning: [], afternoon: [], limited: false };
  const [year, month, day] = date.split("-").map(Number);
  if (year === undefined || month === undefined || day === undefined) return { morning: [], afternoon: [], limited: false };
  const weekday = new Date(year, month - 1, day).getDay();
  const limited = weekday === 0 || holidays.includes(date.slice(5));
  const times = (start: number, end: number) => {
    const options: string[] = [];
    for (let minute = start; minute <= end; minute += 30) {
      options.push(`${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`);
    }
    return options;
  };
  return {
    morning: times(limited ? 540 : weekday === 6 ? 510 : 450, weekday === 6 || limited ? 810 : 780),
    afternoon: limited ? [] : times(weekday === 6 ? 1020 : 990, weekday === 6 ? 1230 : 1200),
    limited,
  };
}

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function validate(f: Form, min: string) {
  const e: Partial<Record<Key, string>> = {};
  if (!f.name.trim()) e.name = "Dinos tu nombre y apellidos para apuntar el encargo.";
  if (!PHONE_RE.test(f.phone.trim()) || f.phone.replace(/\D/g, "").length < 9) e.phone = "Escribe un teléfono válido para llamarte, por ejemplo 612 345 678.";
  if (!f.email.trim()) e.email = "Necesitamos tu correo para enviarte la confirmación.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Este correo no parece válido. Revisa que tenga @ y un dominio.";
  if (!f.date) e.date = "Elige el día en que quieres recoger la tarta.";
  else if (f.date < min) e.date = "Necesitamos 2 días para prepararla. Elige una fecha posterior.";
  const hours = pickupTimes(f.date);
  if (![...hours.morning, ...hours.afternoon].includes(f.slot)) e.slot = "Elige la hora a la que pasarás a recogerla.";
  if (!f.people) e.people = "Dinos para cuántas personas es la tarta.";
  if (!cakes.some((cake) => cake.id === f.cake)) e.cake = "Elige la tarta que te apetece.";
  if (f.cake === "custom" && !f.flavor.trim()) e.flavor = "Cuéntanos de qué te apetece la tarta.";
  if (!f.design.trim()) e.design = "Describe el diseño que imaginas, aunque sea una idea suelta.";
  return e;
}

export function CakeOrderPanel({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const min = minDate();
  const hours = pickupTimes(f.date);

  const set = (k: Key) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setF((p) => {
      if (k === "date") {
        const next = pickupTimes(value);
        return { ...p, date: value, slot: [...next.morning, ...next.afternoon].includes(p.slot) ? p.slot : "" };
      }
      return { ...p, [k]: value };
    });
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSendError("");
    const errs = validate(f, min);
    setErrors(errs);
    const first = Object.keys(empty).find((k) => errs[k as Key]);
    if (first) { document.getElementById(`cake-${first}`)?.focus(); return; }
    setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/dianasmf.2009@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: f.name.trim(), email: f.email.trim(), "teléfono": f.phone.trim(),
          tarta: cakes.find((cake) => cake.id === f.cake)?.name,
          personas: Number(f.people), "precio estimado": cakeEstimateLabel(f.cake, Number(f.people)),
          ...(f.cake === "custom" ? { "descripción": f.flavor.trim() } : {}),
          fecha: f.date, "franja de recogida": f.slot, "diseño": f.design.trim(),
          ...(f.allergies.trim() ? { "alergias o intolerancias": f.allergies.trim() } : {}),
          _subject: "Nuevo encargo de tarta", _template: "table", _captcha: "false",
        }),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Send failed");
      setF(empty);
      onClose();
      onSuccess();
    } catch {
      setSendError("No se ha podido enviar, inténtalo de nuevo");
    } finally {
      setSending(false);
    }
  };

  const p = (k: Key) => ({ ...aria(`cake-${k}`, errors[k]), value: f[k], onChange: set(k), className: "field" });

  return (
    <Panel id="tarta" title="Encarga tu tarta" onClose={onClose} maxW="max-w-2xl">
      <p className="text-lg text-soft">
        Las hacemos en casa, con tiempo y mucho cariño. Cuéntanos qué te apetece y la preparamos a tu gusto. Tartas desde 18 € para 8 personas; el precio final te lo confirmamos por teléfono. Necesitamos 2 días de antelación. Preparamos un máximo de 20 tartas al día; confirmamos siempre tu encargo por teléfono y, si ese día está completo, te proponemos otra fecha.
      </p>
      <form noValidate onSubmit={submit} className="mt-6">
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-2 font-hand text-3xl font-bold text-wood">Tus datos</legend>
            <Field id="cake-name" label="Nombre y apellidos" error={errors.name}><input type="text" autoComplete="name" {...p("name")} /></Field>
            <Field id="cake-phone" label="Teléfono" error={errors.phone}><input type="tel" autoComplete="tel" placeholder="612 345 678" {...p("phone")} /></Field>
            <Field id="cake-email" label="Correo electrónico" error={errors.email}><input type="email" autoComplete="email" {...p("email")} /></Field>
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="mb-2 font-hand text-3xl font-bold text-wood">Tu tarta</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="cake-date" label="Día de recogida" error={errors.date}><input type="date" min={min} {...p("date")} /></Field>
              <Field id="cake-slot" label="Hora de recogida" error={errors.slot}>
                <select {...p("slot")} disabled={!f.date}>
                  <option value="">{f.date ? "Elige una hora" : "Elige primero el día"}</option>
                  {f.date && <optgroup label="Por la mañana">
                    {hours.morning.map((time) => <option key={time} value={time}>{time}</option>)}
                  </optgroup>}
                  {hours.afternoon.length > 0 && <optgroup label="Por la tarde">
                    {hours.afternoon.map((time) => <option key={time} value={time}>{time}</option>)}
                  </optgroup>}
                </select>
                {hours.limited && <p className="mt-1.5 text-sm text-soft">Domingos y festivos abrimos de 9:00 a 14:00. Confirmamos el encargo por teléfono según disponibilidad.</p>}
              </Field>
            </div>
            <Field id="cake-people" label="Para cuántas personas" error={errors.people}>
              <select {...p("people")}>
                <option value="">Elige el número de personas</option>
                {cakeSizes.map((n) => <option key={n} value={n}>{n} personas</option>)}
              </select>
            </Field>
            <Field id="cake-cake" label="Elige tu tarta" error={errors.cake}>
              <select {...p("cake")}>
                <option value="">Elige una tarta</option>
                {cakes.map((cake) => <option key={cake.id} value={cake.id}>{cake.id === "custom" ? "A tu gusto" : cake.name}</option>)}
              </select>
            </Field>
            {f.cake === "custom" && <Field id="cake-flavor" label="Describe tu tarta" error={errors.flavor}>
              <textarea rows={3} placeholder="Ej.: bizcocho de zanahoria con crema de queso y nueces" {...p("flavor")} />
            </Field>}
            <div className="border-y border-line py-4" aria-live="polite" aria-atomic="true">
              <p className="font-bold">Precio total estimado</p>
              <p className="mt-1 text-2xl font-extrabold text-leaf">{cakeEstimateLabel(f.cake, Number(f.people))}</p>
              {f.cake === "custom" && <p className="mt-2 text-soft">Precio orientativo, se confirmará según el diseño</p>}
            </div>
            <Field id="cake-design" label="¿Qué diseño quieres que tenga?" error={errors.design}>
              <textarea rows={4} placeholder="Ej.: cumpleaños infantil con dinosaurios, colores verde y naranja, y el nombre “Lucas” en la parte de arriba" {...p("design")} />
            </Field>
            <Field id="cake-allergies" label="Alergias o intolerancias" optional><input type="text" {...p("allergies")} /></Field>
          </fieldset>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {sendError && <p role="alert" className="text-danger">{sendError}</p>}
          <button type="submit" disabled={sending} className="btn w-full bg-leaf text-onleaf">{sending ? "Enviando…" : "Enviar encargo"}</button>
          <button type="button" onClick={onClose} className="btn w-full border-2 border-line text-ink">Cancelar</button>
        </div>
      </form>
    </Panel>
  );
}
