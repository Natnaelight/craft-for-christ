import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);
  if (products.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="Featured"
          title="Our favorites"
          action={{ label: "View all", href: "/products" }}
        />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
