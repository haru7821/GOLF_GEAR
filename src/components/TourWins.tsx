"use client";

import { useState } from "react";
import Link from "next/link";
import { BRANDS } from "@/data/brands";

/**
 * 2025 PGA 투어 우승에 쓰인 아이언 브랜드. 값이 0부터 30까지 벌어져 있어
 * 0을 기준으로 한 막대가 정직하게 읽힌다(로프트처럼 좁은 밴드가 아니다).
 * 단일 시리즈이므로 모든 막대는 같은 색을 쓴다 — 길이가 이미 값을 말한다.
 * 이 섹션은 잉크(다크) 표면 위에 놓이므로 팔레트의 라이트 스텝이 아니라
 * 다크 스텝(#3987e5)을 쓴다. 두 값 모두 다크 표면 대비 검증을 통과하지만,
 * 다크 밴드에 맞춰 고른 쪽은 후자다.
 */
const WINS = BRANDS.filter(
  (b): b is (typeof BRANDS)[number] & { tourWins2025: number } =>
    typeof b.tourWins2025 === "number",
).sort((a, b) => b.tourWins2025 - a.tourWins2025);

const MAX = Math.max(...WINS.map((b) => b.tourWins2025));

export function TourWins() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <ul className="space-y-1">
        {WINS.map((b) => {
          const active = hovered === b.slug;
          return (
            <li key={b.slug}>
              <Link
                href={`/brands/${b.slug}`}
                onMouseEnter={() => setHovered(b.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(b.slug)}
                onBlur={() => setHovered(null)}
                className={`flex items-center gap-4 rounded-md px-3 py-2.5 transition-colors ${
                  active ? "bg-paper/10" : ""
                }`}
              >
                <span className="w-[104px] shrink-0 font-display text-lg">
                  {b.name}
                </span>
                <span className="relative h-3 flex-1">
                  <span
                    className="absolute inset-y-0 left-0 rounded-r-[4px] bg-[#3987e5] transition-all"
                    style={{ width: `${(b.tourWins2025 / MAX) * 100}%` }}
                  />
                </span>
                <span
                  className="w-[52px] shrink-0 text-right font-mono text-sm"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {b.tourWins2025}승
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-paper/60">
        2025 PGA 투어 우승 당시 선수가 사용한 아이언 브랜드 기준입니다.
        여기 없는 브랜드는{" "}
        <strong className="text-paper">우승이 0회라는 뜻이 아니라 집계 자료에
        이름이 없다는 뜻</strong>입니다 — 확인되지 않은 값을 0으로 적지
        않았습니다. 투어 성적은 등급을 정하는 세 기준 중 하나일 뿐이며,
        계약 규모가 큰 브랜드일수록 수치가 유리하게 잡힌다는 점도 감안해야
        합니다.
      </p>
    </div>
  );
}
