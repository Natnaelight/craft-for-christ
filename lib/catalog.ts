export const AUDIENCES = ["MEN", "WOMEN", "UNISEX", "KIDS"] as const;
export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  MEN: "Men",
  WOMEN: "Women",
  UNISEX: "Unisex",
  KIDS: "Kids",
};

// At or below this many items, product pages show "Only N left"
export const LOW_STOCK_THRESHOLD = 5;

// Labels for cached data. Admin code will invalidate these after edits.
export const CACHE_TAGS = {
  products: "products",
  categories: "categories",
} as const;

// Sizes sort in this order, not alphabetically (alphabetical gives L, M, S, XL).
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

function sizeRank(size: string): number {
  const index = SIZE_ORDER.indexOf(size.toUpperCase());
  if (index !== -1) return index;
  const age = parseInt(size, 10); // kids sizes such as "4-5Y" sort by the first number
  return Number.isNaN(age) ? 999 : 100 + age;
}

export function compareSizes(a: string, b: string): number {
  return sizeRank(a) - sizeRank(b) || a.localeCompare(b);
}
