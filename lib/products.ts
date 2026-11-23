import { cacheLife, cacheTag } from "next/cache";
import type { Prisma } from "../generated/prisma/client";
import { prisma } from "./prisma";
import { CACHE_TAGS, compareSizes, type Audience } from "./catalog";
import type { ProductFilters } from "./validation";

// ---------- Shapes of the data our pages will receive ----------

export type Swatch = { name: string; hex: string | null };

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  categorySlug: string;
  audience: Audience;
  fromPrice: number; // santim: the lowest price among variants
  hasPriceRange: boolean; // true if some sizes cost more
  inStock: boolean; // true if any variant has stock available
  featured: boolean;
  imageUrl: string | null;
  imageAlt: string;
  colors: Swatch[];
};

export type VariantInfo = {
  id: string;
  sku: string;
  size: string;
  color: string;
  colorHex: string | null;
  price: number; // santim, final price for this variant
  available: number; // stock minus reserved, never below zero
};

export type ProductDetail = ProductSummary & {
  description: string;
  images: { url: string; alt: string }[];
  variants: VariantInfo[];
  sizes: string[]; // in the correct display order
};

// ---------- Internal helpers (not cached themselves) ----------

const summaryInclude = {
  category: true,
  variants: { orderBy: { color: "asc" } },
  images: { orderBy: { position: "asc" }, take: 1 },
} satisfies Prisma.ProductInclude;

type SummaryRow = Prisma.ProductGetPayload<{ include: typeof summaryInclude }>;

// A variant uses its own price if it has one, otherwise the product's price.
function effectivePrice(productPrice: number, override: number | null): number {
  return override ?? productPrice;
}

function toSummary(row: SummaryRow): ProductSummary {
  const prices = row.variants.map((v) =>
    effectivePrice(row.price, v.priceOverride),
  );
  const fromPrice = prices.length ? Math.min(...prices) : row.price;
  const hasPriceRange = prices.length > 0 && Math.max(...prices) !== fromPrice;

  const seen = new Set<string>();
  const colors: Swatch[] = [];
  for (const v of row.variants) {
    if (!seen.has(v.color)) {
      seen.add(v.color);
      colors.push({ name: v.color, hex: v.colorHex });
    }
  }

  const image = row.images[0];

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    categoryName: row.category.name,
    categorySlug: row.category.slug,
    audience: row.audience,
    fromPrice,
    hasPriceRange,
    inStock: row.variants.some((v) => v.stock - v.reserved > 0),
    featured: row.featured,
    imageUrl: image?.url ?? null,
    imageAlt: image?.alt || row.name,
    colors,
  };
}

function queryProducts(where: Prisma.ProductWhereInput, take?: number) {
  return prisma.product.findMany({
    where: { active: true, ...where },
    include: summaryInclude,
    orderBy: { createdAt: "desc" },
    take,
  });
}

// ---------- Public functions (cached) ----------

export async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag(CACHE_TAGS.categories);

  return prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}

export async function getProducts(
  filters: ProductFilters,
): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  const rows = await queryProducts({
    ...(filters.category ? { category: { slug: filters.category } } : {}),
    ...(filters.audience ? { audience: filters.audience } : {}),
  });
  const items = rows.map(toSummary);

  // Price depends on variants, so we sort here. Fine for dozens of products.
  if (filters.sort === "price-asc")
    items.sort((a, b) => a.fromPrice - b.fromPrice);
  if (filters.sort === "price-desc")
    items.sort((a, b) => b.fromPrice - a.fromPrice);
  return items; // "newest" is already the database order
}

export async function getFeaturedProducts(
  limit = 4,
): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  const rows = await queryProducts({ featured: true }, limit);
  return rows.map(toSummary);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  const row = await prisma.product.findFirst({
    where: { slug, active: true },
    include: {
      category: true,
      variants: true,
      images: { orderBy: { position: "asc" } },
    },
  });
  if (!row) return null;

  const variants: VariantInfo[] = row.variants
    .map((v) => ({
      id: v.id,
      sku: v.sku,
      size: v.size,
      color: v.color,
      colorHex: v.colorHex,
      price: effectivePrice(row.price, v.priceOverride),
      available: Math.max(0, v.stock - v.reserved),
    }))
    .sort(
      (a, b) => a.color.localeCompare(b.color) || compareSizes(a.size, b.size),
    );

  const sizes = [...new Set(variants.map((v) => v.size))].sort(compareSizes);

  return {
    ...toSummary(row),
    description: row.description,
    images: row.images.map((i) => ({ url: i.url, alt: i.alt || row.name })),
    variants,
    sizes,
  };
}
