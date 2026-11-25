import Link from "next/link";
import { getCategories } from "@/lib/products";
import { AUDIENCES, AUDIENCE_LABELS } from "@/lib/catalog";
import GarmentIcon from "@/components/GarmentIcon";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function CategoryTiles() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionHeading eyebrow="Shop by category" title="Find your fit" />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <GarmentIcon
              type={c.slug}
              className="mx-auto w-2/3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
            />
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-heading text-xl text-primary">{c.name}</h3>
              <span className="text-sm text-muted transition-transform group-hover:translate-x-1">
                Shop &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted">Shop for</span>
        {AUDIENCES.map((a) => (
          <Link
            key={a}
            href={`/products?audience=${a}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {AUDIENCE_LABELS[a]}
          </Link>
        ))}
      </div>
    </section>
  );
}
