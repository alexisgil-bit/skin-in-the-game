import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Eye, Users, Trophy, Gauge } from "lucide-react";
import { athletes } from "./data";

function Counter({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 2500, 1);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toLocaleString("es-MX")}</>;
}

function CamHeader({ cam, label }: { cam: string; label: string }) {
  return (
    <div className="absolute inset-x-3 top-3 z-10 flex justify-between font-mono text-[10px] uppercase">
      <span className="rounded-full bg-background/70 px-3 py-1 backdrop-blur">
        {cam} · {label}
      </span>
      <span className="flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-blink" /> Live
      </span>
    </div>
  );
}

export function Solution() {
  const [maxPace, setMaxPace] = useState(270);
  const toSec = (p: string) => {
    const [m, s] = p.split(":").map(Number);
    return m * 60 + s;
  };
  const filtered = athletes.filter((a) => toSec(a.pace) <= maxPace);

  return (
    <section id="solucion" className="relative py-20">
      {/* Marquee */}
      <div className="relative -rotate-2 overflow-hidden border-y border-primary/40 bg-primary py-5 text-primary-foreground">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl font-black uppercase md:text-5xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-12">
              <span>Si no causas controversia, estás muerto</span>
              <span>✕</span>
              <span>Que te critiquen</span>
              <span>✕</span>
              <span>Que se asusten</span>
              <span>✕</span>
              <span>Que hablen</span>
              <span>✕</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 md:px-10">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <h2 className="font-display text-4xl font-black uppercase leading-[1.05] md:text-6xl">
            Si no causas controversia, <span className="text-destructive">estás muerto.</span>
          </h2>
          <div>
            <p className="text-lg text-muted-foreground">
              Que te critiquen, que se asusten, que hablen: si hay polémica, ya ganaste.
            </p>
            <p className="mt-4 font-display text-2xl font-bold uppercase text-primary">¿Cómo van a hablar de tu marca?</p>
          </div>
        </div>

        {/* Surveillance dashboard */}
        <div className="mt-14 rounded-[2rem] border border-border bg-panel p-3">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 font-mono text-[11px] uppercase text-muted-foreground">
            <span className="flex items-center gap-2 text-foreground">
              <span className="h-2 w-2 rounded-full bg-destructive animate-blink" /> Rec · Live feed — 1 ruta / 48 atletas
            </span>
            <span>Marca detectada: 100% de las cámaras</span>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            {/* Invasión masiva */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative min-h-[420px] overflow-hidden rounded-3xl"
            >
              <CamHeader cam="Cam 01" label="Invasión masiva" />
              <div className="dither scanlines absolute inset-0 grid grid-cols-3 grid-rows-2">
                {[...athletes, athletes[0]].map((a, i) => (
                  <img
                    key={i}
                    src={a.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover grayscale contrast-150 transition duration-700 group-hover:grayscale-0"
                  />
                ))}
              </div>
              {["16% 30%", "50% 22%", "82% 64%"].map((pos, i) => (
                <div
                  key={i}
                  className="absolute z-10 h-24 w-20 border border-primary"
                  style={{ left: pos.split(" ")[0], top: pos.split(" ")[1] }}
                >
                  <span className="absolute -top-5 left-0 whitespace-nowrap bg-primary px-1.5 font-mono text-[9px] font-bold text-primary-foreground">
                    MARCA_0{i + 1} · DETECTADA
                  </span>
                </div>
              ))}
              <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl bg-background/80 p-5 backdrop-blur-md">
                <h3 className="flex items-center gap-2 font-display text-xl font-black uppercase">
                  <Users className="h-5 w-5 text-primary" /> Invasión masiva
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Brandeas a decenas de corredores al mismo tiempo. Inundas la ruta con tu marca para que sea imposible
                  no verte.
                </p>
              </div>
            </motion.div>

            {/* Viralidad */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground"
            >
              <div className="font-mono text-[10px] uppercase">Cam 02 · Viralidad involuntaria</div>
              <div>
                <div className="font-mono text-[10px] uppercase opacity-70">Celulares grabándote ahora</div>
                <div className="font-display text-6xl font-black md:text-7xl">
                  <Counter to={12480} />
                </div>
                <div className="mt-4 flex h-16 items-end gap-1">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      whileInView={{ height: `${20 + ((i * 37) % 80)}%` }}
                      transition={{ delay: i * 0.04 }}
                      className="flex-1 rounded-sm bg-primary-foreground/80"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-black uppercase">
                  <Eye className="h-5 w-5" /> Viralidad involuntaria
                </h3>
                <p className="mt-2 text-sm opacity-80">
                  Logras que miles de desconocidos saquen el celular, te graben sorprendidos y te suban gratis a sus
                  propias redes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Foco mediático — selector */}
          <div className="mt-3 grid gap-3 rounded-3xl border border-border bg-card p-6 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">Cam 03 · Foco mediático</div>
              <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-black uppercase">
                <Camera className="h-5 w-5 text-primary" /> Foco mediático
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                En nuestra plataforma seleccionas a los atletas más veloces filtrando por su ritmo medio (pace) y sus
                podios pasados. Al ir al frente de la carrera se roban todas las cámaras, y si se suben al podio, se
                llevan un bono extra. Tu marca termina en la foto de los ganadores, la prensa y las redes oficiales del
                evento.
              </p>
              <label className="mt-6 block">
                <span className="flex items-center justify-between font-mono text-[11px] uppercase">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5 text-primary" /> Pace máximo
                  </span>
                  <span className="text-primary">
                    {Math.floor(maxPace / 60)}:{String(maxPace % 60).padStart(2, "0")} /km
                  </span>
                </span>
                <input
                  type="range"
                  min={220}
                  max={280}
                  value={maxPace}
                  onChange={(e) => setMaxPace(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              {athletes.map((a) => {
                const on = filtered.includes(a);
                return (
                  <motion.div
                    key={a.id}
                    layout
                    animate={{ opacity: on ? 1 : 0.2, scale: on ? 1 : 0.92 }}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 ${
                      on ? "border-primary/70" : "border-border"
                    }`}
                  >
                    <img
                      src={a.img}
                      alt={a.name}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${on ? "" : "grayscale"}`}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-2">
                      <div className="font-display text-sm font-black">{a.pace}</div>
                      <div className="flex items-center gap-1 font-mono text-[9px] uppercase text-primary">
                        <Trophy className="h-2.5 w-2.5" /> {a.podios}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
