export default function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
      aria-busy="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-2xl bg-border/40" />
          <div className="mt-3 h-4 w-3/4 rounded bg-border/40" />
          <div className="mt-2 h-3 w-1/3 rounded bg-border/40" />
        </div>
      ))}
    </div>
  );
}
