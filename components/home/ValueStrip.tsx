import { site } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </>
  ),
  cross: <path d="M12 3v18M6.5 9h11" />,
};

export default function ValueStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        {site.values.map((v) => (
          <li key={v.title} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[v.icon]}
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{v.title}</p>
              <p className="mt-0.5 text-sm text-muted">{v.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
