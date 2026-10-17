import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Trophy, Zap } from "lucide-react";
import { athletes } from "./data";
import { FloatingIcons } from "./FloatingIcons";

export function Hero() {
  const [active, setActive] = useState(2);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const n = athletes.length;

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => clearInterval(t);
  }, [active, n]);

  return (
    <section
      className="relative px-3 pt-6 pb-16 md:px-8"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-panel">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-primary glow-primary" />
        <div className="noise-bg pointer-events-none absolute inset-0 opacity-60" />

        {/* NAV */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
          <a href="#" className="font-display text-xl font-black tracking-tight">
            SKIN<span className="text-primary">✕</span>MKT
          </a>
          <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider text-muted-foreground md:flex">
            <a href="#problema" className="transition hover:text-foreground">Problema</a>
            <a href="#solucion" className="text-primary">Solución</a>
            <a href="#dinamicas" className="transition hover:text-foreground">Dinámicas</a>
            <a href="#faqs" className="transition hover:text-foreground">FAQs</a>
          </div>
          <a
            href="#cta"
            className="rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase text-primary-foreground transition hover:scale-105 hover:glow-primary"
          >
            Configurar
          </a>
        </nav>

        <FloatingIcons mouse={mouse} variant="hero" />

        {/* COPY */}
        <div className="relative z-10 px-6 pt-6 text-center md:pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-glow md:text-7xl"
          >
            Te dijimos que el
            <br />
            futuro daba <span className="text-holo animate-glitch inline-block">Miedo.</span>
            <br />
            <span className="text-primary">Bienvenido.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground md:text-base"
          >
            El primer marketplace que comercializa la piel de atletas. Ponemos tu marca en el cuerpo de los
            corredores para saturar los Reels, TikToks y grupos de WhatsApp sin pedirle permiso a nadie.
          </motion.p>
          <motion.a
            href="#cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-mono text-sm font-bold uppercase text-primary-foreground glow-primary transition hover:scale-105"
          >
            Configurar mi campaña
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* STAGE / AVATAR SELECTOR */}
        <div className="relative mt-12 h-[460px] md:h-[540px]" style={{ perspective: 1400 }}>
          <div
            className="grid-floor absolute inset-x-[-10%] bottom-0 h-[55%] origin-bottom"
            style={{ transform: "rotateX(62deg)", maskImage: "linear-gradient(to top, black, transparent)" }}
          />
          <div className="absolute inset-x-0 top-[30%] h-40 bg-[radial-gradient(ellipse_at_center,var(--holo-1),transparent_65%)] opacity-30 blur-2xl" />

          <div className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Selecciona tu atleta <span className="text-primary animate-blink">▮</span>
          </div>

          {athletes.map((a, i) => {
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            const isActive = off === 0;
            return (
              <motion.button
                key={a.id}
                onClick={() => setActive(i)}
                animate={{
                  x: `calc(-50% + ${off * 200}px)`,
                  scale: isActive ? 1 : 0.78 - abs * 0.04,
                  rotateY: off * -18,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  filter: isActive ? "blur(0px) brightness(1)" : `blur(${abs}px) brightness(0.6)`,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute left-1/2 top-12 h-[380px] w-[270px] md:h-[440px] md:w-[310px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`relative h-full w-full overflow-hidden rounded-3xl border-2 ${
                    isActive ? "border-primary/60 glow-holo" : "border-border"
                  }`}
                >
                  <img src={a.img} alt={`Atleta ${a.name}`} className="h-full w-full object-cover" />
                  {isActive && <div className="bg-holo absolute inset-0 opacity-15 mix-blend-overlay" />}
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-border bg-background/60 py-1 pl-1 pr-4 backdrop-blur-md">
                    <img src={a.img} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <div className="text-left leading-tight">
                      <div className="font-mono text-[9px] uppercase text-muted-foreground">Atleta #{a.id}</div>
                      <div className="text-xs font-semibold">{a.name}</div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-border bg-background/60 p-3 text-left backdrop-blur-md"
                      >
                        <div>
                          <div className="font-mono text-[9px] uppercase text-muted-foreground">Pace medio · {a.zone}</div>
                          <div className="font-display text-xl font-black">
                            {a.pace}<span className="text-xs text-muted-foreground"> /km</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs font-bold uppercase text-primary">
                          <Trophy className="h-3.5 w-3.5" /> {a.podios} podios
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
            <button
              aria-label="Anterior"
              onClick={() => setActive((active - 1 + n) % n)}
              className="rounded-full border border-border bg-background/60 p-2 backdrop-blur transition hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase text-muted-foreground">
              <Zap className="h-3 w-3 text-primary" /> {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              aria-label="Siguiente"
              onClick={() => setActive((active + 1) % n)}
              className="rounded-full border border-border bg-background/60 p-2 backdrop-blur transition hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
