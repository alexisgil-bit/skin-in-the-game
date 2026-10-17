import { useState } from "react";
import { ArrowRight, FileX, Timer, ShieldCheck } from "lucide-react";
import { FloatingIcons } from "./FloatingIcons";

const perks = [
  { icon: FileX, t: "Cero contratos forzosos", d: "Pagas por evento, sin amarrarte a letras chiquitas." },
  { icon: Timer, t: "Cotización al instante", d: "Armas tu paquete en menos de 10 minutos desde el configurador." },
  { icon: ShieldCheck, t: "Cero riesgo", d: "Si el corredor no sube sus fotos de validación y su Reel obligatorio, no cobra." },
];

export function FinalCta() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <section id="cta" className="px-3 pb-10 md:px-8">
      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-panel px-6 py-24 text-center md:px-16"
      >
        <div className="grid-floor absolute inset-0 opacity-50" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 70%)" }} />
        <div className="bg-holo absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" />
        <FloatingIcons mouse={mouse} variant="cta" />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-4xl font-display text-3xl font-black uppercase leading-[1.08] md:text-6xl">
            ¿Quieres <span className="text-holo">titulares y miles de views</span> o prefieres tus{" "}
            <span className="text-muted-foreground line-through decoration-destructive">6 likes</span> de siempre?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Únete a las marcas atrevidas que ya cambiaron los anuncios aburridos por escándalo, piel y viralidad real en
            los eventos más masivos de México y LATAM.
          </p>
          <a
            href="#"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 font-mono text-sm font-bold uppercase text-primary-foreground glow-primary transition hover:scale-105"
          >
            Configurar mi campaña ahora
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
          <div className="mt-16 grid gap-4 text-left md:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.t}
                className="group rounded-2xl border border-border bg-background/50 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/60"
              >
                <p.icon className="h-6 w-6 text-primary transition group-hover:scale-110" />
                <div className="mt-3 font-display text-sm font-bold uppercase">{p.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
