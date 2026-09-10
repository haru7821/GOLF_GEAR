import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CommandPalette } from "@/components/CommandPalette";

/**
 * 모바일에서는 폭이 모자라 compact가 아닌 항목을 접는다.
 * 접힌 항목도 ⌘K 검색으로 바로 갈 수 있다.
 */
const NAV = [
  { href: "/brands", label: "브랜드", compact: true },
  { href: "/lofts", label: "로프트", compact: true },
  { href: "/compare", label: "비교", compact: true },
  { href: "/finder", label: "브랜드 찾기", compact: false },
  { href: "/#about", label: "선정 기준", compact: false },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-5">
        <Link href="/" aria-label="CLUBRANK 홈">
          {/* 좁은 화면에서는 워드마크를 접는다. display 유틸이 Logo 내부의
              inline-flex와 충돌하므로 래퍼에서 제어한다. */}
          <span className="block sm:hidden">
            <Logo withWordmark={false} />
          </span>
          <span className="hidden sm:block">
            <Logo />
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex gap-4 text-sm sm:gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap ${
                  item.compact ? "" : "hidden sm:inline"
                } ${
                  current === item.href
                    ? "text-ink"
                    : "text-mist transition-colors hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CommandPalette />
        </div>
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
