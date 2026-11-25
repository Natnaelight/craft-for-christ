import type { Metadata } from "next";
import { Suspense } from "react";
import ProductBrowser from "@/components/shop/ProductBrowser";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Craft for Christ collection of faith-inspired clothing.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function ProductsPage({ searchParams }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
          <span className="h-px w-8 bg-accent" />
          The collection
        </p>
        <h1 className="mt-3 font-heading text-4xl text-primary md:text-5xl">
          Shop
        </h1>
        <p className="mt-3 text-muted">
          Faith-inspired clothing, made for everyday life. Filter by category or
          by who it is for.
        </p>
      </header>

      <div className="mt-10">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductBrowser searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
