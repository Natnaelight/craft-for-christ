import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  action?: { label: string; href: string };
};

export default function SectionHeading({ eyebrow, title, action }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-3xl text-primary md:text-4xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {action.label} &rarr;
        </Link>
      )}
    </div>
  );
}
