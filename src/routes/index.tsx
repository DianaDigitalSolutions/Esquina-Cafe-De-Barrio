import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Header } from "@/components/cafe/Header";
import { Hero } from "@/components/cafe/Hero";
import { Breakfasts } from "@/components/cafe/Breakfasts";
import { Info } from "@/components/cafe/Info";
import { ContactForm } from "@/components/cafe/ContactForm";
import { Footer } from "@/components/cafe/Footer";
import { MenuPanel } from "@/components/cafe/MenuPanel";
import { CakeOrderPanel } from "@/components/cafe/CakeOrderPanel";
import { Toast, type ToastData } from "@/components/cafe/Toast";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "El Café de la Esquina · Cafetería de barrio desde 1987" },
      { name: "description", content: "Desayunos de barrio, café recién molido y tartas por encargo en la Calle del Olmo, 12, Madrid." },
      { property: "og:title", content: "El Café de la Esquina" },
      { property: "og:description", content: "El café de siempre, preparado como nunca. Desayunos, carta y tartas por encargo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [panel, setPanel] = useState<"menu" | "cake" | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);
  const close = useCallback(() => setPanel(null), []);
  const closeToast = useCallback(() => setToast(null), []);
  const openMenu = () => setPanel("menu");
  const openCake = () => setPanel("cake");

  return (
    <>
      <Header onMenu={openMenu} onCake={openCake} />
      <main>
        <Hero onMenu={openMenu} />
        <Breakfasts onMenu={openMenu} />
        <Info />
        <ContactForm onSuccess={() => setToast({ id: Date.now(), title: "¡Mensaje recibido!", text: "Gracias por escribirnos, vecino. Te responderemos volando." })} />
      </main>
      <Footer />
      {panel === "menu" && <MenuPanel onClose={close} onCake={openCake} />}
      {panel === "cake" && (
        <CakeOrderPanel onClose={close} onSuccess={() => setToast({ id: Date.now(), title: "¡Encargo recibido!", text: "Gracias, vecino. Te llamaremos enseguida para confirmar tu tarta." })} />
      )}
      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}
