import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { TIERS, BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  title: "브랜드 등급 전체 보기 — CLUBRANK",
};

export default function BrandsPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-5">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden gap-8 text-sm text-mist sm:flex">
            <Link href="/brands" className="text-ink">
              브랜드
            </Link>
            <Link href="/#about" className="hover:text-ink">
              소개
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">
            All Brands
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            브랜드 등급
          </h1>
          <p className="mt-4 max-w-xl text-mist">
            등급이 높은 순으로 정렬되어 있습니다. 등급·설명은 정보 수집·검수
            단계를 거쳐 지속적으로 갱신됩니다.
          </p>
        </section>

        {TIERS.map((tier) => {
          const brands = BRANDS.filter((b) => b.tier === tier.code);
          if (brands.length === 0) return null;
          return (
            <section
              key={tier.code}
              className="border-t border-line px-6 py-14"
            >
              <div className="mx-auto max-w-[1120px]">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm ${tier.colorClass}`}
                  >
                    {tier.code}
                  </span>
                  <h2 className="font-display text-2xl tracking-tight">
                    {tier.labelKo}
                  </h2>
                  <span className="font-mono text-xs uppercase text-mist">
                    {tier.label}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {brands.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}`}
                      className="rounded-md border border-line p-6 transition-colors hover:border-ink"
                    >
                      <p className="font-display text-xl">{b.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-mist">
                        {b.note}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-8 text-xs text-mist">
          <Logo withWordmark={false} className="text-mist" />
          <p>© {new Date().getFullYear()} CLUBRANK</p>
        </div>
      </footer>
    </>
  );
}
