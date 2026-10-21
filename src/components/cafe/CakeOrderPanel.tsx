import { useState, type FormEvent } from "react";
import { Panel } from "./Panel";
import { Field, aria } from "./Field";
import { EMAIL_RE, PHONE_RE, cakes, cakeSizes, cakeEstimateLabel } from "./data";

const empty = { name: "", phone: "", email: "", date: "", slot: "", people: "", cake: "", flavor: "", design: "", allergies: "" };
type Form = typeof empty;
type Key = keyof Form;

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
  if (!f.slot) e.slot = "Elige si prefieres recogerla por la mañana o por la tarde.";
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
  const min = minDate();

  const set = (k: Key) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f, min);
    setErrors(errs);
    const first = Object.keys(empty).find((k) => errs[k as Key]);
    if (first) { document.getElementById(`cake-${first}`)?.focus(); return; }
    setSendError("El envío todavía no está disponible. Tu encargo no se ha enviado.");
  };

  const p = (k: Key) => ({ ...aria(`cake-${k}`, errors[k]), value: f[k], onChange: set(k), className: "field" });

  return (
    <Panel id="tarta" title="Encarga tu tarta" onClose={onClose} maxW="max-w-2xl">
      <p className="text-lg text-soft">
        Las hacemos en casa, con tiempo y mucho cariño. Cuéntanos qué te apetece y la preparamos a tu gusto. Tartas desde 18 € para 8 personas; el precio final te lo confirmamos por teléfono. Necesitamos 2 días de antelación.
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
              <Field id="cake-slot" label="Franja de recogida" error={errors.slot}>
                <select {...p("slot")}>
                  <option value="">Elige una franja</option>
                  <option>Mañana (9:00–13:00)</option>
                  <option>Tarde (17:00–20:00)</option>
                </select>
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
          <button type="submit" className="btn w-full bg-leaf text-onleaf">Enviar encargo</button>
          <button type="button" onClick={onClose} className="btn w-full border-2 border-line text-ink">Cancelar</button>
        </div>
      </form>
    </Panel>
  );
}
