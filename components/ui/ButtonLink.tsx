import Link from "next/link";

const styles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  light: "bg-accent text-accent-foreground hover:bg-accent/90",
  "outline-light":
    "border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
};

type Props = {
  href: string;
  variant?: keyof typeof styles;
  children: React.ReactNode;
  className?: string;
};

export default function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
