import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "./Logo";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>

        <nav className="flex gap-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © <CopyrightYear /> {site.name}. All rights reserved.
      </div>
    </footer>
  );
}