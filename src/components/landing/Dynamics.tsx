import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { QrCode, Scissors, Sliders, Video, ShieldCheck, Camera, Flag, Film } from "lucide-react";
import { qrImg, athletes } from "./data";

const dyn = [
  {
    key: "qr",
    icon: QrCode,
    title: "\u201cAlcánzame el QR\u201d",
    body: "El corredor lleva un código QR gigante en el hombro o espalda con una playera que dice: \u201cProductos gratis si me escaneas\u201d. La gente corre tras él para ganar la recompensa.",
    img: qrImg,
    badge: "Productos gratis si me escaneas",
  },
  {
    key: "list",
    icon: Scissors,
    title: "Cacería de listones",
    body: "Los corredores llevan cintas colgando de la cintura y una playera retando a la multitud: \u201cArráncame un listón y llévate 50% de descuento\u201d. Generas persecución, risas y contenido viral en vivo.",
    img: athletes[1].img,
    badge: "Arráncame un listón · 50% OFF",
  },
  {
    key: "custom",
    icon: Sliders,
    title: "Formatos a la medida",
    body: "Tu marca pone las reglas del juego en la ruta.",
    img: athletes[3].img,
    badge: "Tus reglas",
  },
];

const steps = [
  { icon: Camera, t: "Foto previa", d: "con tatuajes aplicados" },
  { icon: Flag, t: "Foto en meta", d: "cruzando la línea" },
  { icon: Film, t: "Reel obligatorio", d: "subido a sus redes" },
];

export function Dynamics() {
  const [sel, setSel] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const cur = dyn[sel];

  return (
    <section id="dinamicas" className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-black uppercase leading-[1.05] md:text-6xl">
            Dinámicas <span className="text-holo">interactivas</span>
          </h2>
          <span className="rounded-full border border-primary px-4 py-2 font-mono text-xs font-bold uppercase text-primary">
            ▲ Sube el nivel
          </span>
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">
          No solo llevan tu marca impresa; puedes armar dinámicas en movimiento que obligan a la gente a interactuar:
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            {dyn.map((d, i) => (
              <button
                key={d.key}
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
                className={`group relative w-full overflow-hidden rounded-2xl border p-6 text-left transition ${
                  sel === i ? "border-primary bg-card" : "border-border hover:border-foreground/30"
                }`}
              >
                {sel === i && (
                  <motion.span layoutId="dynbar" className="absolute inset-y-0 left-0 w-1 bg-primary glow-primary" />
                )}
                <div className="flex items-start gap-4">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${
                      sel === i ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase">{d.title}</h3>
                    <p className={`mt-2 text-sm text-muted-foreground transition-all ${sel === i ? "opacity-100" : "opacity-60"}`}>
                      {d.body}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <motion.div style={{ y }} className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="bg-holo absolute -inset-4 rounded-[2.5rem] opacity-40 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-border">
              <AnimatePresence mode="wait">
                <motion.img
                  key={cur.key}
                  src={cur.img}
                  alt={cur.title}
                  initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 border-[14px] border-transparent">
                {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-l-2 border-b-2", "right-0 bottom-0 border-r-2 border-b-2"].map(
                  (c) => (
                    <span key={c} className={`absolute h-8 w-8 border-primary ${c}`} />
                  ),
                )}
              </div>
              <motion.div
                key={cur.badge}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute inset-x-6 bottom-6 rounded-xl bg-primary p-3 text-center font-mono text-xs font-bold uppercase text-primary-foreground"
              >
                {cur.badge}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Cobertura Pro */}
        <div className="group relative mt-28 overflow-hidden rounded-[2rem] border border-border">
          <div className="absolute inset-0 grid grid-cols-5">
            {athletes.map((a) => (
              <img key={a.id} src={a.img} alt="" loading="lazy" className="h-full w-full object-cover opacity-30 grayscale transition duration-700 group-hover:opacity-60 group-hover:grayscale-0" />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
          <div className="relative grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-14">
            <span className="font-display text-8xl font-black text-primary md:text-9xl">3.</span>
            <div className="max-w-xl">
              <h3 className="font-display text-3xl font-black uppercase md:text-5xl">Cobertura Pro</h3>
              <p className="mt-4 flex items-center gap-2 font-mono text-xs font-bold uppercase text-primary">
                <Video className="h-4 w-4" /> Contenido listo para tus redes
              </p>
              <p className="mt-3 text-muted-foreground">
                Puedes agregar el servicio de fotografía y video profesional dedicado. Al terminar el evento no solo te
                llevas el impacto en la calle, sino un paquete de contenido en alta resolución listo para romperla en tus
                redes oficiales.
              </p>
            </div>
          </div>
        </div>

        {/* Cero riesgo */}
        <div className="mt-28 grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div>
            <ShieldCheck className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-display text-4xl font-black uppercase leading-none md:text-6xl">
              Cero riesgo
              <br />
              <span className="text-muted-foreground">de estafa</span>
            </h3>
            <p className="mt-6 text-muted-foreground">
              Aquí no le pagamos a &ldquo;influencers&rdquo; flojos. Sincronizamos la validación de cada corredor: foto previa
              con tatuajes aplicados, foto cruzando la meta y Reel obligatorio subido a sus redes. Si no cumplen con cada
              prueba, <span className="font-bold text-foreground">no cobran.</span>
            </p>
          </div>
          <div className="relative rounded-3xl border border-border bg-panel p-6 font-mono">
            <div className="mb-6 flex justify-between text-[10px] uppercase text-muted-foreground">
              <span>Validación · Atleta #12</span>
              <span className="text-primary">Sync ●</span>
            </div>
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center gap-4 border-b border-border py-5 last:border-0"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-primary text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-bold uppercase">{s.t}</div>
                  <div className="text-xs text-muted-foreground">{s.d}</div>
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.3, type: "spring" }}
                  className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground"
                >
                  OK
                </motion.span>
              </motion.div>
            ))}
            <div className="mt-4 rounded-xl border border-primary/40 bg-primary/10 p-3 text-center text-xs uppercase text-primary">
              3/3 pruebas → pago liberado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
