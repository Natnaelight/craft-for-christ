import Image from "next/image";
import { site } from "@/lib/site";
import ButtonLink from "@/components/ui/ButtonLink";
import GarmentIcon from "@/components/GarmentIcon";

// 19 rays fanning out from the sun at the top of the arch
const RAYS = Array.from({ length: 19 }, (_, i) => {
  const angle = ((10 + i * 9) * Math.PI) / 180;
  return {
    x: (200 + 560 * Math.cos(angle)).toFixed(1),
    y: (150 + 560 * Math.sin(angle)).toFixed(1),
  };
});

export default function Hero() {
  const { hero } = site;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Words */}
        <div className="motion-safe:animate-fade-up">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            <span className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-[1.05] text-primary md:text-6xl lg:text-7xl">
            {hero.titleStart}{" "}
            <em className="italic underline decoration-accent decoration-2 underline-offset-[10px]">
              {hero.titleAccent}
            </em>
            .
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        {/* The arch */}
        <div
          className="relative mx-auto w-full max-w-sm motion-safe:animate-fade-up lg:max-w-md"
          style={{ animationDelay: "150ms" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-primary">
            {hero.image ? (
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover"
              />
            ) : (
              <>
                <svg
                  viewBox="0 0 400 500"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  {RAYS.map((r, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="150"
                      x2={r.x}
                      y2={r.y}
                      className="stroke-accent/40"
                      strokeWidth="1.2"
                    />
                  ))}
                  <circle
                    cx="200"
                    cy="150"
                    r="46"
                    className="fill-primary stroke-accent/60"
                    strokeWidth="1"
                  />
                  <circle cx="200" cy="150" r="36" className="fill-accent" />
                  <path
                    d="M196 128h8v14h14v8h-14v22h-8v-22h-14v-8h14z"
                    className="fill-primary"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-[6%] flex justify-center">
                  <GarmentIcon
                    type="hoodies"
                    className="w-3/5 drop-shadow-lg"
                  />
                </div>
              </>
            )}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-t-full border border-accent/60"
          />
        </div>
      </div>
    </section>
  );
}
