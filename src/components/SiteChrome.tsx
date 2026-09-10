import Link from "next/link";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/brands", label: "브랜드" },
  { href: "/lofts", label: "로프트 비교" },
  { href: "/#about", label: "선정 기준" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-5">
        <Link href="/" aria-label="CLUBRANK 홈">
          <Logo />
        </Link>
        <nav className="flex gap-6 text-sm sm:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                current === item.href
                  ? "text-ink"
                  : "text-mist transition-colors hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-8 text-xs text-mist">
        <Logo withWordmark={false} className="text-mist" />
        <p>© {new Date().getFullYear()} CLUBRANK</p>
      </div>
    </footer>
  );
}
