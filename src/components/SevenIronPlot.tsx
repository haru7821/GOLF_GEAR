"use client";

import { useState } from "react";
import { SEVEN_IRONS } from "@/lib/lofts";

/**
 * 7번 아이언 로프트는 30~35°의 좁은 밴드에 몰려 있다. 0부터 그리는 막대는
 * 전부 같은 길이로 보이고, 축을 잘라낸 막대는 길이 비교를 왜곡한다.
 * 그래서 기준선 대비 '위치'를 인코딩하는 닷 플롯을 쓴다.
 */
const SCALE = { min: 29, max: 36 };
const CLASSIC = 35;

function pct(loft: number) {
  return ((loft - SCALE.min) / (SCALE.max - SCALE.min)) * 100;
}

export function SevenIronPlot() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      {/* 눈금 */}
      <div className="relative mb-3 hidden h-5 sm:block">
        <div className="absolute inset-x-0 mr-[92px] ml-[232px]">
          {[30, 31, 32, 33, 34, 35, 36].map((t) => (
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
        {SEVEN_IRONS.map((b) => {
          const active = hovered === b.slug;
          const delta = Number((b.loft - CLASSIC).toFixed(1));
          return (
            <li
              key={b.slug}
              onMouseEnter={() => setHovered(b.slug)}
              onMouseLeave={() => setHovered(null)}
              className={`flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors sm:flex-row sm:items-center sm:gap-0 ${
                active ? "bg-ink/[0.04]" : ""
              }`}
            >
              <div className="flex shrink-0 items-baseline gap-2 sm:w-[220px]">
                <span className="font-display text-lg whitespace-nowrap">
                  {b.name}
                </span>
                <span className="truncate font-mono text-[11px] text-mist">
                  {b.model}
                </span>
              </div>

              <div className="relative h-7 flex-1">
                {/* 트랙 */}
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                {/* 클래식 기준 눈금 */}
                <div
                  className="absolute top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-mist"
                  style={{ left: `${pct(CLASSIC)}%` }}
                />
                {/* 기준선까지의 편차 구간 */}
                <div
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[#2a78d6]/25"
                  style={{
                    left: `${pct(Math.min(b.loft, CLASSIC))}%`,
                    width: `${Math.abs(pct(b.loft) - pct(CLASSIC))}%`,
                  }}
                />
                {/* 값 */}
                <div
                  className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
                  style={{ left: `${pct(b.loft)}%` }}
                >
                  <span
                    className="block rounded-full bg-[#2a78d6] ring-2 ring-paper transition-all"
                    style={{
                      width: active ? 14 : 10,
                      height: active ? 14 : 10,
                    }}
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

              <span className="shrink-0 font-mono text-xs text-mist sm:w-[92px] sm:text-right">
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
        더 나가지만, 그만큼 탄도가 낮아지고 그린에서 볼이 덜 섭니다. 브랜드가
        말하는 &ldquo;더 멀리&rdquo;가 기술 덕분인지 로프트를 세운 결과인지는
        이 값을 봐야 구분됩니다.
      </p>
    </div>
  );
}
