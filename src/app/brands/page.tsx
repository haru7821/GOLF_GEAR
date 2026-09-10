import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { TIERS, BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  title: "브랜드 등급 전체 보기",
  description:
    "골프 클럽 브랜드를 S부터 D까지 다섯 등급으로 나눠 정리한 전체 목록.",
};

export default function BrandsPage() {
  return (
    <>
      <SiteHeader current="/brands" />

      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-20">
          <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">
            All Brands
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            브랜드 등급
          </h1>
          <p className="mt-4 max-w-xl text-mist">
            총 {BRANDS.length}개 브랜드를 다섯 등급으로 나눠 정리했습니다.
            각 브랜드 페이지에서 등급 근거와 대표 아이언 사양을 확인할 수
            있습니다.
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
                  <span className="ml-auto font-mono text-xs text-mist">
                    {brands.length}
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                  {tier.desc}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {brands.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}`}
                      className="rounded-md border border-line p-6 transition-colors hover:border-ink"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-xl">{b.name}</p>
                        <span className="font-mono text-xs whitespace-nowrap text-mist">
                          {b.price.band}
                        </span>
                      </div>
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

      <SiteFooter />
    </>
  );
}
