export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12" aria-busy="true">
      <div className="mb-8 h-4 w-64 animate-pulse rounded bg-border/40" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/5] animate-pulse rounded-3xl bg-border/40" />
        <div className="space-y-5">
          <div className="h-3 w-24 animate-pulse rounded bg-border/40" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-border/40" />
          <div className="h-6 w-32 animate-pulse rounded bg-border/40" />
          <div className="h-20 w-full animate-pulse rounded bg-border/40" />
          <div className="h-9 w-48 animate-pulse rounded bg-border/40" />
          <div className="h-11 w-72 animate-pulse rounded bg-border/40" />
        </div>
      </div>
    </div>
  );
}
