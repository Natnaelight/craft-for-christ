import { z } from "zod";
import { AUDIENCES, type Audience } from "./catalog";

const SORT_OPTIONS = ["newest", "price-asc", "price-desc"] as const;
export type Sort = (typeof SORT_OPTIONS)[number];

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
