import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo() {
  return (
    <Link href="/" className="font-heading text-xl tracking-tight text-primary">
      {site.name}
    </Link>
  );
}