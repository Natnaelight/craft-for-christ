import "dotenv/config";
import { prisma } from "../lib/prisma";

if (process.env.NODE_ENV === "production") {
  throw new Error("Refusing to run the sample seed in production.");
}

type Audience = "MEN" | "WOMEN" | "UNISEX" | "KIDS";

const COLORS = {
  black: { name: "Black", hex: "#111111" },
  white: { name: "White", hex: "#FFFFFF" },
  navy: { name: "Navy", hex: "#1F2A44" },
  sand: { name: "Sand", hex: "#D8C8A8" },
  forest: { name: "Forest Green", hex: "#2F4F3E" },
  burgundy: { name: "Burgundy", hex: "#5B1F2B" },
} as const;
type ColorKey = keyof typeof COLORS;

const ADULT_SIZES = ["S", "M", "L", "XL", "XXL"];
const KIDS_SIZES = ["4-5Y", "6-7Y", "8-9Y", "10-11Y"]; // placeholder; set real kids sizes later

const categories = [
  { slug: "t-shirts", name: "T-Shirts" },
  { slug: "hoodies", name: "Hoodies" },
  { slug: "sweaters", name: "Sweaters" },
];

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  category: string;
  audience: Audience;
  price: number; // santim: 85000 = 850 ETB
  featured?: boolean;
  colors: ColorKey[];
};

const products: SeedProduct[] = [
  {
    slug: "faith-over-fear-tee",
    name: "Faith Over Fear Tee",
    description:
      "Soft cotton tee with a minimal faith-inspired print. Relaxed everyday fit.",
    category: "t-shirts",
    audience: "UNISEX",
    price: 85000,
    featured: true,
    colors: ["black", "white", "sand"],
  },
  {
    slug: "be-still-tee",
    name: "Be Still Tee",
    description: "Classic fit tee with a calm, understated chest print.",
    category: "t-shirts",
    audience: "MEN",
    price: 90000,
    colors: ["navy", "sand"],
  },
  {
    slug: "grace-abounds-tee",
    name: "Grace Abounds Tee",
    description: "Lightweight, slightly fitted tee with a soft script print.",
    category: "t-shirts",
    audience: "WOMEN",
    price: 85000,
    colors: ["white", "burgundy", "sand"],
  },
  {
    slug: "grace-hoodie",
    name: "Grace Hoodie",
    description:
      "Heavyweight fleece hoodie with a small embroidered mark. Unisex fit.",
    category: "hoodies",
    audience: "UNISEX",
    price: 185000,
    featured: true,
    colors: ["black", "navy", "forest"],
  },
  {
    slug: "light-of-the-world-hoodie",
    name: "Light of the World Hoodie",
    description:
      "Roomy pullover hoodie with a bold back print and a soft brushed interior.",
    category: "hoodies",
    audience: "MEN",
    price: 195000,
    featured: true,
    colors: ["black", "sand", "forest", "burgundy"],
  },
  {
    slug: "shine-hoodie",
    name: "Shine Hoodie",
    description: "Cropped-length hoodie with a delicate front print.",
    category: "hoodies",
    audience: "WOMEN",
    price: 185000,
    colors: ["sand", "burgundy"],
  },
  {
    slug: "cross-crewneck-sweater",
    name: "Cross Crewneck Sweater",
    description:
      "Warm crewneck sweater with a tonal cross detail on the chest.",
    category: "sweaters",
    audience: "UNISEX",
    price: 165000,
    featured: true,
    colors: ["navy", "sand"],
  },
  {
    slug: "psalm-23-sweater",
    name: "Psalm 23 Sweater",
    description:
      "Cozy knit-look sweater with a subtle verse reference on the sleeve.",
    category: "sweaters",
    audience: "WOMEN",
    price: 170000,
    colors: ["burgundy", "forest", "black"],
  },
  {
    slug: "little-light-tee",
    name: "Little Light Tee",
    description: "Soft, durable kids tee with a cheerful print.",
    category: "t-shirts",
    audience: "KIDS",
    price: 60000,
    colors: ["white", "navy"],
  },
  {
    slug: "little-light-hoodie",
    name: "Little Light Hoodie",
    description:
      "Warm kids hoodie with a roomy pocket and easy zip-free pullover style.",
    category: "hoodies",
    audience: "KIDS",
    price: 120000,
    colors: ["black", "forest"],
  },
];

async function main() {
  const categoryIds: Record<string, string> = {};
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    categoryIds[c.slug] = row.id;
  }

  for (const p of products) {
    const data = {
      name: p.name,
      description: p.description,
      price: p.price,
      audience: p.audience,
      featured: p.featured ?? false,
      active: true,
      categoryId: categoryIds[p.category],
    };
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });

    const sizes = p.audience === "KIDS" ? KIDS_SIZES : ADULT_SIZES;
    const variants = p.colors.flatMap((colorKey, ci) =>
      sizes.map((size) => {
        const color = COLORS[colorKey];
        // Edge cases for testing: one sold-out and one low-stock variant per product
        let stock = 12;
        if (ci === 0 && size === sizes[sizes.length - 1]) stock = 0;
        if (ci === 1 && size === sizes[0]) stock = 2;
        return {
          sku: `${p.slug}-${colorKey}-${size}`.toUpperCase(),
          size,
          color: color.name,
          colorHex: color.hex,
          stock,
        };
      }),
    );

    await Promise.all(
      variants.map((v) =>
        prisma.variant.upsert({
          where: { sku: v.sku },
          update: { ...v, reserved: 0, productId: product.id },
          create: { ...v, productId: product.id },
        }),
      ),
    );
    console.log(`${p.name}: ${variants.length} variants`);
  }

  const [c, p, v] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.variant.count(),
  ]);
  console.log(`Done. ${c} categories, ${p} products, ${v} variants.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
