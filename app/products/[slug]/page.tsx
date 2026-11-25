import { Suspense } from "react";
import ProductDetail from "@/components/product/ProductDetail";
import ProductDetailSkeleton from "@/components/product/ProductDetailSkeleton";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}
