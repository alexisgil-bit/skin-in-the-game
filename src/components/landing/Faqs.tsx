import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Esto no es demasiado caro para mi presupuesto?",
    a: "Al contrario, es el hackeo más rentable que vas a encontrar. Un espectacular estático te cuesta una fortuna al mes y nadie lo voltea a ver. Con nosotros tú decides cuánto gastar desde la plataforma: desde brandear a un par de atletas de élite para salir en la foto del podio, hasta armar una invasión masiva de decenas de corredores. Muestras tu presupuesto, cotizas en tiempo real y no sueltas un solo peso a ciegas.",
  },
  {
    q: "¿Esto realmente funciona para mi industria?",
    a: "Si tu negocio necesita que la gente te recuerde y hable de ti, funciona. No importa si vendes software B2B, bebidas, finanzas o ropa; la gente que está en la calle viendo el evento es tu consumidor final. No estás comprando un \u201ccanal de nicho deportivo\u201d, estás comprando la atención de miles de personas con el celular en la mano listos para volver viral a cualquier marca que se atreva a hacer algo diferente.",
  },
  {
    q: "¿Qué pasa si le pago a un corredor y no corre o no sube nada?",
    a: "Cero riesgo. Aquí no se le regala dinero a nadie. A diferencia de los \u201cinfluencers\u201d flojos que te cobran por adelantado y luego desaparecen, aquí el atleta tiene un proceso de validación estricto: debe subirse a la plataforma con una foto mostrando los tatuajes aplicados antes de salir, una foto terminando el evento y el Reel subido a sus redes. Si no cumple con cada prueba, simplemente no cobra y no pierdes un solo peso.",
  },
  {
    q: "¿Cuánto tiempo toma montar una campaña con ustedes?",
    a: "En la plataforma te toma 10 minutos. Solo necesitas planearlo con 15 días de anticipación. Cero burocracia y cero juntas infinitas de agencias aburridas. Entras, eliges el evento, seleccionas a tus atletas por ritmo o masa y subes tu arte. Eso sí: requerimos 15 días de margen antes del evento para mandar a imprimir los tatuajes de alta resistencia y hacérselos llegar a cada corredor. Nosotros nos encargamos de la logística de la piel y la validación en vivo el día de la carrera.",
  },
];

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[0.9fr_1.4fr] md:px-10">
        <div className="md:sticky md:top-24 md:self-start">
          <span className="font-mono text-xs uppercase text-primary">// FAQ.exe</span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[1.05] md:text-6xl">
            ¿Tienes dudas o te dio <span className="text-holo-3 text-holo">frío</span>?
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition ${isOpen ? "border-primary/60 bg-card" : "border-border hover:border-foreground/30"}`}
              >
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-5 p-6 text-left">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <span className="flex-1 font-display text-base font-bold uppercase md:text-lg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pl-14 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mx-auto mt-24 max-w-4xl px-6 text-center font-display text-2xl font-bold uppercase leading-snug md:text-4xl">
        Si sigues haciendo publicidad para no incomodar a nadie, vas a seguir pasando desapercibido.{" "}
        <span className="text-primary">Es hora de hacer que hablen de tu marca.</span>
      </p>
    </section>
  );
}
