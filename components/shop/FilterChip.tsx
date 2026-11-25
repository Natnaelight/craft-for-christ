import Link from "next/link";

type Props = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

export default function FilterChip({ href, active, children }: Props) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
