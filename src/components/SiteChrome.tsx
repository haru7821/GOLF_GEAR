import Link from "next/link";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/brands", label: "브랜드" },
  { href: "/lofts", label: "로프트" },
  { href: "/compare", label: "비교" },
  { href: "/finder", label: "브랜드 찾기" },
  { href: "/#about", label: "선정 기준" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-5">
        <Link href="/" aria-label="CLUBRANK 홈">
          {/* 좁은 화면에서는 워드마크를 접어 내비게이션과 겹치지 않게 한다.
              display 유틸이 Logo 내부의 inline-flex와 충돌하므로 래퍼에서 제어한다. */}
          <span className="block sm:hidden">
            <Logo withWordmark={false} />
          </span>
          <span className="hidden sm:block">
            <Logo />
          </span>
        </Link>
        <nav className="flex gap-5 text-sm sm:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap ${
                current === item.href
                  ? "text-ink"
                  : "text-mist transition-colors hover:text-ink"
              }`}
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
