import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { TourWins } from "@/components/TourWins";
import { TIERS, BRANDS, tierOf } from "@/data/brands";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-28 sm:pt-36">
          <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">
            Golf Club Brand Grading
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.1] tracking-tight sm:text-7xl">
            골프 클럽 브랜드,
            <br />
            <span className="italic text-fairway">정확한 등급</span>으로.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
            헤리티지, 기술력, 투어 채택률, 가격 포지셔닝을 기준으로
            골프 클럽 브랜드를 다섯 단계로 나눠 보여주는
            프리미엄 레퍼런스입니다.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/brands"
              className="rounded-md bg-fairway px-6 py-3 text-sm text-paper transition-colors hover:bg-fairway-light"
            >
              브랜드 등급 보기
            </Link>
            <a
              href="#about"
              className="rounded-md border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink"
            >
              선정 기준
            </a>
          </div>
        </section>

        {/* Tier legend */}
        <section id="tiers" className="border-y border-line bg-ink/[0.02]">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <h2 className="font-display text-3xl tracking-tight">
              등급 체계
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-5">
              {TIERS.map((t) => (
                <div key={t.code} className="bg-paper p-6">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm ${t.colorClass}`}
                  >
                    {t.code}
                  </span>
                  <p className="mt-4 font-display text-lg">{t.labelKo}</p>
                  <p className="text-xs tracking-wide text-mist uppercase">
                    {t.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand preview */}
        <section id="brands" className="mx-auto max-w-[1120px] px-6 py-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl tracking-tight">
              아이코닉 등급 브랜드
            </h2>
            <Link
              href="/brands"
              className="font-mono text-xs text-fairway hover:underline"
            >
              전체 {BRANDS.length}개 브랜드 →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRANDS.filter((b) => b.tier === "S").map((b) => {
              const tier = tierOf(b.tier);
              return (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="rounded-md border border-line p-6 transition-colors hover:border-ink"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xl">{b.name}</p>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs ${tier.colorClass}`}
                    >
                      {tier.code}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {b.note}
                  </p>
                </Link>
              );
            })}
          </div>
          <p className="mt-6 font-mono text-xs text-mist">
            * 등급은 헤리티지·투어 검증·가격 포지셔닝을 종합한 편집 판단이며,
            브랜드별 상세 페이지에 근거와 출처를 함께 적었습니다.
          </p>
        </section>

        {/* About / criteria */}
        <section id="about" className="border-t border-line bg-ink text-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-24">
            <h2 className="font-display text-3xl tracking-tight">
              선정 기준
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-brass uppercase">
                  01
                </p>
                <p className="mt-3 font-display text-lg">헤리티지</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  브랜드의 역사와 기술 축적, 업계에 대한 기여도.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-brass uppercase">
                  02
                </p>
                <p className="mt-3 font-display text-lg">투어 · 검증</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  프로 투어 채택률과 실사용자 평가로 검증된 성능.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-brass uppercase">
                  03
                </p>
                <p className="mt-3 font-display text-lg">가격 포지셔닝</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  가격대비 완성도와 시장 내 포지셔닝의 일관성.
                </p>
              </div>
            </div>

            <div className="mt-20 border-t border-paper/15 pt-14">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl tracking-tight">
                  2025 PGA 투어 우승에 쓰인 아이언
                </h3>
                <Link
                  href="/lofts"
                  className="font-mono text-xs text-brass hover:underline"
                >
                  로프트로 비교하기 →
                </Link>
              </div>
              <div className="mt-8">
                <TourWins />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
