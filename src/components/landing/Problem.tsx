import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Megaphone, MessageCircle, Volume2 } from "lucide-react";

const problems = [
  {
    n: "01",
    icon: Volume2,
    title: "Tus activaciones aburren",
    body: "Poner una bocina a todo volumen y repartir volantes no va a hacer que nadie te recuerde al día siguiente.",
  },
  {
    n: "02",
    icon: Megaphone,
    title: "Tu publicidad digital no le importa a nadie",
    body: "Lanzas la campaña, apruebas el presupuesto y termines con 6 likes en tus posts... y cuatro son de tu propio equipo de marketing.",
  },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section id="problema" ref={ref} className="relative overflow-hidden py-28">
      <motion.div
        style={{ x }}
        className="pointer-events-none whitespace-nowrap font-display text-[18vw] font-black uppercase leading-none text-foreground/[0.04]"
      >
        Desesperado · Desesperado
      </motion.div>

      <div className="relative mx-auto -mt-[12vw] grid max-w-7xl gap-16 px-6 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-destructive">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-blink" /> Diagnóstico
          </div>
          <h2 className="font-display text-4xl font-black uppercase leading-[1.05] md:text-6xl">
            Estás desesperado por <span className="text-holo">viralizar</span> tu marca.
            <br />
            <span className="text-muted-foreground">Y lo sabemos.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Harías lo que fuera por salir en las noticias, generar conversación en redes y hacer que la prensa hable
            de ti.
          </p>

          <div className="mt-12 space-y-4">
            {problems.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative flex gap-6 overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-destructive/50"
              >
                <div className="absolute inset-y-0 left-0 w-0 bg-destructive/10 transition-all duration-500 group-hover:w-full" />
                <span className="relative font-display text-4xl font-black text-muted-foreground/30 transition group-hover:text-destructive">
                  {p.n}
                </span>
                <div className="relative">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold uppercase">
                    <p.icon className="h-4 w-4 text-destructive" /> {p.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fake sad post */}
        <motion.div style={{ rotate: rot }} className="relative mx-auto w-full max-w-sm self-center">
          <div className="scanlines relative overflow-hidden rounded-3xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-muted" />
              <div>
                <div className="text-sm font-semibold">tu_marca_oficial</div>
                <div className="font-mono text-[10px] text-muted-foreground">Publicidad · hace 3 semanas</div>
              </div>
            </div>
            <div className="mt-4 grid aspect-square place-items-center rounded-2xl bg-muted font-display text-2xl font-black uppercase text-muted-foreground/40">
              ¡50% off!
              <br />
              compra ya
            </div>
            <div className="mt-4 flex items-center gap-5 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="h-5 w-5" />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="font-display text-xl font-black text-foreground"
                >
                  6
                </motion.span>
              </span>
              <MessageCircle className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase">0 comentarios</span>
            </div>
            <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 p-2 font-mono text-[10px] uppercase text-destructive">
              ⚠ 4 de 6 likes = tu equipo de marketing
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
