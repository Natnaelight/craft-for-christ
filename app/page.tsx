import Hero from "@/components/home/Hero";
import ValueStrip from "@/components/home/ValueStrip";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CategoryTiles />
      <FeaturedProducts />
      <BrandStory />
    </>
  );
}
