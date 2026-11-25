import { getCategories, getProducts } from "@/lib/products";
import { AUDIENCES, AUDIENCE_LABELS } from "@/lib/catalog";
import {
  SORT_LABELS,
  SORT_OPTIONS,
  parseProductFilters,
  productsHref,
} from "@/lib/validation";
import ProductCard from "@/components/ProductCard";
import ButtonLink from "@/components/ui/ButtonLink";
import FilterChip from "./FilterChip";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-full text-xs font-medium uppercase tracking-[0.2em] text-muted sm:w-24">
        {label}
      </span>
      {children}
    </div>
  );
}

export default async function ProductBrowser({ searchParams }: Props) {
  const filters = parseProductFilters(await searchParams);
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(filters),
  ]);
  const hasFilters = Boolean(filters.category || filters.audience);

  return (
    <div>
      <div className="space-y-4">
        <FilterRow label="Category">
          <FilterChip
            href={productsHref(filters, { category: undefined })}
            active={!filters.category}
          >
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              href={productsHref(filters, { category: c.slug })}
              active={filters.category === c.slug}
            >
              {c.name}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Shop for">
          <FilterChip
            href={productsHref(filters, { audience: undefined })}
            active={!filters.audience}
          >
            Everyone
          </FilterChip>
          {AUDIENCES.map((a) => (
            <FilterChip
              key={a}
              href={productsHref(filters, { audience: a })}
              active={filters.audience === a}
            >
              {AUDIENCE_LABELS[a]}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Sort by">
          {SORT_OPTIONS.map((s) => (
            <FilterChip
              key={s}
              href={productsHref(filters, { sort: s })}
              active={filters.sort === s}
            >
              {SORT_LABELS[s]}
            </FilterChip>
          ))}
        </FilterRow>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between border-t border-border pt-5">
        <p className="text-sm text-muted" aria-live="polite">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        {hasFilters && (
          <a
            href="/products"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Clear filters
          </a>
        )}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="font-heading text-2xl text-primary">Nothing here yet</p>
          <p className="mt-2 text-sm text-muted">
            No products match those filters.
          </p>
          <div className="mt-6">
            <ButtonLink href="/products" variant="outline">
              Clear filters
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
