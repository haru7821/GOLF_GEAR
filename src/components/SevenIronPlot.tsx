"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SEVEN_IRONS } from "@/lib/lofts";
import { CATEGORY_ORDER, type IronCategory } from "@/data/models";

/**
 * 7번 아이언 로프트는 좁은 밴드에 몰려 있다. 0부터 그리는 막대는 전부 같은
 * 길이로 보이고, 축을 잘라낸 막대는 길이 비교를 왜곡한다. 그래서 기준선
 * 대비 '위치'를 인코딩하는 닷 플롯을 쓴다.
 */
const CLASSIC = 35;
const LO = Math.floor(Math.min(...SEVEN_IRONS.map((b) => b.loft)) - 1);
const HI = Math.ceil(Math.max(...SEVEN_IRONS.map((b) => b.loft)) + 1);
const TICKS = Array.from({ length: HI - LO + 1 }, (_, i) => LO + i).filter(
  (t) => t % 2 === 0,
);

function pct(loft: number) {
  return ((loft - LO) / (HI - LO)) * 100;
}

export function SevenIronPlot() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<IronCategory | "전체">("전체");

  const rows = useMemo(
    () =>
      filter === "전체"
        ? SEVEN_IRONS
        : SEVEN_IRONS.filter((b) => b.category === filter),
    [filter],
  );

  const categories = useMemo(
    () =>
      CATEGORY_ORDER.filter((c) => SEVEN_IRONS.some((b) => b.category === c)),
    [],
  );

  return (
    <div>
      {/* 카테고리 필터 — 블레이드와 게임 임프루브먼트를 섞어 보면 비교가 흐려진다 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(["전체", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === c
                ? "border-ink bg-ink text-paper"
                : "border-line text-mist hover:border-ink hover:text-ink"
            }`}
          >
            {c}
            <span
              className={`ml-2 font-mono text-[11px] ${filter === c ? "text-paper/60" : "text-mist/70"}`}
            >
              {c === "전체"
                ? SEVEN_IRONS.length
                : SEVEN_IRONS.filter((b) => b.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <div className="relative mb-3 hidden h-5 sm:block">
        <div className="absolute inset-x-0 mr-[96px] ml-[248px]">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 font-mono text-xs text-mist"
              style={{ left: `${pct(t)}%` }}
            >
              {t}°
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-1">
        {rows.map((b) => {
          const active = hovered === b.id;
          const delta = Number((b.loft - CLASSIC).toFixed(1));
          return (
            <li
              key={b.id}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
              className={`flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors sm:flex-row sm:items-center sm:gap-0 ${
                active ? "bg-ink/[0.04]" : ""
              }`}
            >
              <div className="flex shrink-0 items-baseline gap-2 sm:w-[236px]">
                <Link
                  href={`/brands/${b.brandSlug}`}
                  className="font-display text-lg whitespace-nowrap hover:underline"
                >
                  {b.brandName}
                </Link>
                <span className="truncate font-mono text-[11px] text-mist">
                  {b.modelName}
                  {b.year ? ` ’${String(b.year).slice(2)}` : ""}
                </span>
              </div>

              <div className="relative h-7 flex-1">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                <div
                  className="absolute top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-mist"
                  style={{ left: `${pct(CLASSIC)}%` }}
                />
                <div
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[#2a78d6]/25"
                  style={{
                    left: `${pct(Math.min(b.loft, CLASSIC))}%`,
                    width: `${Math.abs(pct(b.loft) - pct(CLASSIC))}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
                  style={{ left: `${pct(b.loft)}%` }}
                >
                  <span
                    className="block rounded-full bg-[#2a78d6] ring-2 ring-paper transition-all"
                    style={{ width: active ? 14 : 10, height: active ? 14 : 10 }}
                  />
                </div>
                <span
                  className="absolute top-1/2 -translate-y-1/2 font-mono text-sm text-ink"
                  style={{
                    left: `${pct(b.loft)}%`,
                    marginLeft: 14,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {b.loft}°
                </span>
              </div>

              <span className="shrink-0 font-mono text-xs text-mist sm:w-[96px] sm:text-right">
                {delta === 0
                  ? "기준과 동일"
                  : `기준 ${delta > 0 ? "+" : ""}${delta}°`}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
        7번 아이언은 업계에서 로프트 강도를 비교할 때 쓰는 기준 클럽입니다.
        로프트가 <strong className="text-ink">1도 강해질수록 대략 2~3야드</strong>가
        더 나가지만, 그만큼 탄도가 낮아지고 그린에서 볼이 덜 섭니다. 다만
        <strong className="text-ink"> 블레이드와 게임 임프루브먼트를 같은 줄에
        놓고 비교하는 것은 의미가 약합니다</strong> — 애초에 다른 목적으로 만든
        클럽이라, 위 필터로 같은 성격끼리 좁혀 보는 편이 정확합니다.
      </p>
    </div>
  );
}
