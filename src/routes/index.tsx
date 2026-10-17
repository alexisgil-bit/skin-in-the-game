import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Dynamics } from "@/components/landing/Dynamics";
import { Faqs } from "@/components/landing/Faqs";
import { FinalCta } from "@/components/landing/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKIN✕MKT — El marketplace de la piel de atletas" },
      {
        name: "description",
        content: "Ponemos tu marca en el cuerpo de los corredores para saturar Reels, TikToks y WhatsApp.",
      },
      { property: "og:title", content: "SKIN✕MKT — Te dijimos que el futuro daba miedo" },
      { property: "og:description", content: "El primer marketplace que comercializa la piel de atletas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Dynamics />
      <Faqs />
      <FinalCta />
    </main>
  );
}
