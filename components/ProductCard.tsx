import Link from "next/link";
import GarmentIcon from "./GarmentIcon";
import { formatETB } from "@/lib/money";
import { AUDIENCE_LABELS } from "@/lib/catalog";
import type { ProductSummary } from "@/lib/products";

export default function ProductCard({
  product: p,
}: {
  product: ProductSummary;
}) {
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-border/40">
        <div className="absolute inset-0 flex items-center justify-center">
          <GarmentIcon
            type={p.categorySlug}
            color={p.colors[0]?.hex ?? undefined}
            className="w-4/5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted">
          {AUDIENCE_LABELS[p.audience]}
        </span>
        {!p.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-primary-foreground">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
            {p.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            {p.hasPriceRange ? "From " : ""}
            {formatETB(p.fromPrice)}
          </p>
        </div>
        <ul
          className="mt-1.5 flex shrink-0 -space-x-1"
          aria-label={`${p.colors.length} colors`}
        >
          {p.colors.slice(0, 4).map((c) => (
            <li
              key={c.name}
              title={c.name}
              className="h-4 w-4 rounded-full border border-border ring-2 ring-background"
              style={{ backgroundColor: c.hex ?? undefined }}
            />
          ))}
        </ul>
      </div>
    </Link>
  );
}
