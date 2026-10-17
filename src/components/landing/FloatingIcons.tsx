import ig from "@/assets/icon-ig.png";
import tt from "@/assets/icon-tt.png";
import wa from "@/assets/icon-wa.png";
import like from "@/assets/icon-like.png";

type Item = { src: string; x: string; y: string; size: number; depth: number; rot: number };

const sets: Record<string, Item[]> = {
  hero: [
    { src: ig, x: "6%", y: "18%", size: 110, depth: 1, rot: -12 },
    { src: tt, x: "86%", y: "14%", size: 90, depth: 0.4, rot: 14 },
    { src: wa, x: "88%", y: "52%", size: 130, depth: 1.4, rot: -8 },
    { src: like, x: "3%", y: "58%", size: 70, depth: 0.3, rot: 10 },
    { src: tt, x: "22%", y: "8%", size: 46, depth: 0.15, rot: -20 },
    { src: like, x: "74%", y: "6%", size: 52, depth: 0.2, rot: 18 },
  ],
  cta: [
    { src: like, x: "8%", y: "15%", size: 120, depth: 1.3, rot: -10 },
    { src: ig, x: "82%", y: "10%", size: 80, depth: 0.4, rot: 14 },
    { src: tt, x: "86%", y: "62%", size: 120, depth: 1.1, rot: -14 },
    { src: wa, x: "10%", y: "68%", size: 60, depth: 0.25, rot: 8 },
  ],
};

export function FloatingIcons({ mouse, variant }: { mouse: { x: number; y: number }; variant: "hero" | "cta" }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
      {sets[variant]!.map((it, i) => {
        const blur = it.depth < 0.5 ? (0.5 - it.depth) * 14 : it.depth > 1.2 ? (it.depth - 1.2) * 10 : 0;
        return (
          <div
            key={i}
            className="absolute transition-transform duration-300 ease-out"
            style={{
              left: it.x,
              top: it.y,
              transform: `translate(${mouse.x * 80 * it.depth}px, ${mouse.y * 80 * it.depth}px) rotate(${it.rot}deg)`,
            }}
          >
            <img
              src={it.src}
              alt=""
              width={it.size}
              height={it.size}
              className="animate-float drop-shadow-2xl"
              style={{ filter: `blur(${blur}px)`, animationDelay: `${i * 0.7}s`, opacity: it.depth < 0.3 ? 0.6 : 1 }}
            />
          </div>
        );
      })}
    </div>
  );
}
