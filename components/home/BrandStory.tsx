import { site } from "@/lib/site";
import ButtonLink from "@/components/ui/ButtonLink";

export default function BrandStory() {
  const { story } = site;

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2 lg:items-center lg:gap-20">
        <figure>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="text-accent"
            aria-hidden="true"
          >
            <path d="M12 2v20M6 8h12" />
          </svg>
          <blockquote className="mt-6 font-heading text-3xl italic leading-snug md:text-4xl">
            &ldquo;{story.verse}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
            {story.verseRef}
          </figcaption>
        </figure>

        <div>
          <h2 className="font-heading text-3xl md:text-4xl">{story.title}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-primary-foreground/80">
            {story.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" variant="light">
              Shop the collection
            </ButtonLink>
            <ButtonLink href="/about" variant="outline-light">
              Read our story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
