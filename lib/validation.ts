import { z } from "zod";
import { AUDIENCES, type Audience } from "./catalog";

export const SORT_OPTIONS = ["newest", "price-asc", "price-desc"] as const;
export type Sort = (typeof SORT_OPTIONS)[number];

export const SORT_LABELS: Record<Sort, string> = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export type ProductFilters = {
  category?: string;
  audience?: Audience;
  sort: Sort;
};

const productFiltersSchema = z.object({
  category: z.string().trim().min(1).max(60).optional().catch(undefined),
  audience: z.enum(AUDIENCES).optional().catch(undefined),
  sort: z.enum(SORT_OPTIONS).catch("newest"),
});

export function parseProductFilters(
  input: Record<string, unknown>,
): ProductFilters {
  return productFiltersSchema.parse(input);
}

// Builds a /products URL from the current filters plus any changes.
// Default values are left out so URLs stay short and clean.
export function productsHref(
  current: ProductFilters,
  changes: Partial<ProductFilters> = {},
): string {
  const next = { ...current, ...changes };
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.audience) params.set("audience", next.audience);
  if (next.sort !== "newest") params.set("sort", next.sort);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
