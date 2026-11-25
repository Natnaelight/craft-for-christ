import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import { parseSlug } from "@/lib/validation";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductPurchase from "./ProductPurchase";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetail({ params }: Props) {
  const slug = parseSlug((await params).slug);
  if (!slug) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (
    await getProducts({ category: product.categorySlug, sort: "newest" })
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-primary">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hover:text-primary"
            >
              {product.categoryName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <ProductPurchase product={product} />

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-14">
          <SectionHeading eyebrow="Keep browsing" title="You may also like" />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
