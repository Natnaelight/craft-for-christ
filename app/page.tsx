export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-4xl text-primary md:text-5xl">
        Wear your faith.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Brand system test page. Every color below comes from one file.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
          Primary button
        </button>
        <button className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
          Accent button
        </button>
        <button className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground">
          Outline button
        </button>
      </div>
    </div>
  );
}