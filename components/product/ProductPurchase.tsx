"use client";

import { useState } from "react";
import GarmentIcon from "@/components/GarmentIcon";
import { AUDIENCE_LABELS, LOW_STOCK_THRESHOLD } from "@/lib/catalog";
import { formatETB } from "@/lib/money";
import type { ProductDetail } from "@/lib/products";

export default function ProductPurchase({
  product,
}: {
  product: ProductDetail;
}) {
  const { variants, sizes, colors } = product;

  // Start on the first color that has something in stock
  const startColor =
    colors.find((c) =>
      variants.some((v) => v.color === c.name && v.available > 0),
    ) ?? colors[0];

  // The only two things that change when the customer clicks
  const [colorName, setColorName] = useState(startColor?.name ?? "");
  const [size, setSize] = useState<string | null>(null);

  // Everything below is calculated from those two values
  const color = colors.find((c) => c.name === colorName);
  const variantFor = (s: string) =>
    variants.find((v) => v.color === colorName && v.size === s);
  const selected = size ? variantFor(size) : undefined;

  const price = selected?.price ?? product.fromPrice;
  const showFrom = !selected && product.hasPriceRange;
  const canBuy = Boolean(selected && selected.available > 0);

  function chooseColor(name: string) {
    setColorName(name);
    // Keep the chosen size only if it is still in stock in the new color
    const stillAvailable =
      size !== null &&
      variants.some(
        (v) => v.color === name && v.size === size && v.available > 0,
      );
    if (!stillAvailable) setSize(null);
  }

  let stockText = "Select a size";
  let stockClass = "text-muted";
  if (selected) {
    if (selected.available === 0) {
      stockText = "Sold out in this size";
    } else if (selected.available <= LOW_STOCK_THRESHOLD) {
      stockText = `Only ${selected.available} left`;
      stockClass = "font-medium text-primary";
    } else {
      stockText = "In stock";
    }
  }

  const buttonLabel = !size
    ? "Select a size"
    : canBuy
      ? "Add to cart"
      : "Sold out";

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Gallery: a placeholder until real photos arrive in Session 10 */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-border/40 lg:sticky lg:top-24 lg:self-start">
        <div className="absolute inset-0 flex items-center justify-center">
          <GarmentIcon
            type={product.categorySlug}
            color={color?.hex ?? undefined}
            className="w-4/5 transition-all duration-500"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
          {AUDIENCE_LABELS[product.audience]}
        </span>
      </div>

      {/* Details and choices */}
      <div>
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
          <span className="h-px w-8 bg-accent" />
          {product.categoryName}
        </p>
        <h1 className="mt-3 font-heading text-4xl text-primary md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl text-foreground">
          {showFrom ? "From " : ""}
          {formatETB(price)}
        </p>
        <p className="mt-5 max-w-lg leading-relaxed text-muted">
          {product.description}
        </p>

        {/* Color */}
        <div className="mt-8">
          <p className="text-sm font-medium text-foreground">
            Color: <span className="font-normal text-muted">{colorName}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map((c) => {
              const outOfStock = !variants.some(
                (v) => v.color === c.name && v.available > 0,
              );
              const isSelected = c.name === colorName;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => chooseColor(c.name)}
                  aria-pressed={isSelected}
                  aria-label={outOfStock ? `${c.name} (sold out)` : c.name}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border border-border transition-shadow ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  } ${outOfStock ? "opacity-40" : ""}`}
                  style={{ backgroundColor: c.hex ?? undefined }}
                />
              );
            })}
          </div>
        </div>

        {/* Size */}
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((s) => {
              const v = variantFor(s);
              const soldOut = !v || v.available === 0;
              const isSelected = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={soldOut}
                  onClick={() => setSize(s)}
                  aria-pressed={isSelected}
                  aria-label={soldOut ? `${s} (sold out)` : s}
                  className={`min-w-14 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : soldOut
                        ? "cursor-not-allowed border-border text-muted/60 line-through"
                        : "border-border bg-surface text-foreground hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className={`mt-3 text-sm ${stockClass}`} aria-live="polite">
            {stockText}
          </p>
        </div>

        {/* Add to cart: connected to a real cart in Phase 3 */}
        <button
          type="button"
          disabled={!canBuy}
          className="mt-8 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-64"
        >
          {buttonLabel}
        </button>

        {selected && (
          <p className="mt-6 text-xs text-muted">SKU: {selected.sku}</p>
        )}
      </div>
    </div>
  );
}
