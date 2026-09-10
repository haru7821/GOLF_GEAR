import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { LoftChart } from "@/components/LoftChart";
import { SevenIronPlot } from "@/components/SevenIronPlot";
import { SEVEN_IRONS, SEVEN_IRON_SPREAD, LOFT_SERIES } from "@/lib/lofts";

export const metadata: Metadata = {
  title: "로프트 비교",
  description:
    "브랜드별 아이언 로프트를 겹쳐 비교합니다. 같은 7번 아이언인데 브랜드마다 거리가 다른 이유를 로프트 데이터로 확인하세요.",
};

export default function LoftsPage() {
  const strongestLoft = SEVEN_IRON_SPREAD.min;
  const weakestLoft = SEVEN_IRON_SPREAD.max;
  // 같은 로프트를 쓰는 브랜드가 여럿이면 전부 적는다
  const strongest = SEVEN_IRONS.filter((b) => b.loft === strongestLoft);
  const weakest = SEVEN_IRONS.filter((b) => b.loft === weakestLoft);
  const names = (list: typeof SEVEN_IRONS) =>
    list.map((b) => b.name).join(" · ");

  return (
    <>
      <SiteHeader current="/lofts" />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-line bg-ink text-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-20 sm:py-28">
            <p className="font-mono text-xs tracking-[0.25em] text-brass uppercase">
              Loft Comparison
            </p>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-end">
              <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
                같은 7번 아이언인데
                <br />
                <span className="italic text-brass">거리가 다른 이유.</span>
              </h1>

              <div className="border-l-2 border-brass pl-6">
                <p className="font-display text-7xl leading-none text-brass sm:text-8xl">
                  {SEVEN_IRON_SPREAD.delta}°
                </p>
                <p className="mt-4 leading-relaxed text-paper/70">
                  같은 7번 아이언인데 브랜드 사이에 이만큼 차이가 납니다.
                  가장 강한{" "}
                  <strong className="text-paper">{names(strongest)}</strong>{" "}
                  {strongestLoft}°부터 가장 정통한{" "}
                  <strong className="text-paper">{names(weakest)}</strong>{" "}
                  {weakestLoft}°까지 —{" "}
                  <strong className="text-paper">클럽 한 번호 반</strong>에
                  해당하는 간격입니다.
                </p>
              </div>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-paper/15 pt-10 sm:grid-cols-4">
              {[
                { k: "비교 가능 브랜드", v: `${LOFT_SERIES.length}개` },
                { k: "7번 아이언 확보", v: `${SEVEN_IRONS.length}개` },
                { k: "가장 강한 로프트", v: `${strongestLoft}°` },
                { k: "가장 약한 로프트", v: `${weakestLoft}°` },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-xs tracking-wider text-paper/50 uppercase">
                    {s.k}
                  </dt>
                  <dd className="mt-2 font-display text-3xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7번 아이언 닷 플롯 */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.25em] text-mist uppercase">
                01 — Benchmark
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
                7번 아이언 로프트
              </h2>
              <p className="mt-4 leading-relaxed text-mist">
                강한 순으로 정렬했습니다. 세로 눈금은 거리 경쟁 이전의
                클래식 기준({35}°)입니다.
              </p>
            </div>
            <div className="mt-12">
              <SevenIronPlot />
            </div>
          </div>
        </section>

        {/* 세트 전체 로프트 곡선 */}
        <section>
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.25em] text-mist uppercase">
                02 — Full Set
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
                세트 전체 로프트 곡선
              </h2>
              <p className="mt-4 leading-relaxed text-mist">
                브랜드를 골라 세트 전체의 로프트 진행을 겹쳐 봅니다.
                선이 아래로 내려앉을수록 로프트를 세운 세팅이고, 클래식
                기준선에 가까울수록 정통한 배열입니다.
              </p>
            </div>
            <div className="mt-12">
              <LoftChart />
            </div>
          </div>
        </section>

        {/* 다음 단계 */}
        <section className="border-t border-line bg-ink/[0.02]">
          <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center">
            <p className="max-w-xl leading-relaxed text-mist">
              로프트는 클럽 선택의 한 축일 뿐입니다. 브랜드별 등급 근거와
              헤리티지·투어 성적·가격 포지셔닝은 브랜드 페이지에서 확인하세요.
            </p>
            <Link
              href="/brands"
              className="shrink-0 rounded-md bg-fairway px-6 py-3 text-sm text-paper transition-colors hover:bg-fairway-light"
            >
              브랜드 등급 보기
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
