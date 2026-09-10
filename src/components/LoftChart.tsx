"use client";

import { useMemo, useState } from "react";
import {
  CLUB_AXIS,
  CLASSIC_REFERENCE,
  DEFAULT_SELECTION,
  LOFT_SERIES,
  MAX_SELECTED,
  SERIES_COLORS,
  type Club,
  type LoftSeries,
} from "@/lib/lofts";

const VB = { w: 960, h: 470 };
const PAD = { top: 28, right: 104, bottom: 52, left: 60 };
const PLOT = {
  w: VB.w - PAD.left - PAD.right,
  h: VB.h - PAD.top - PAD.bottom,
};

/** 선택된 브랜드가 붙잡고 있는 색 슬롯. 다른 브랜드를 해제해도 색이 바뀌지 않는다. */
type Claim = { slug: string; slot: number };

function lowestFreeSlot(claims: Claim[]): number | null {
  const used = new Set(claims.map((c) => c.slot));
  for (let i = 0; i < MAX_SELECTED; i++) if (!used.has(i)) return i;
  return null;
}

export function LoftChart() {
  const [claims, setClaims] = useState<Claim[]>(() =>
    DEFAULT_SELECTION.filter((slug) =>
      LOFT_SERIES.some((s) => s.slug === slug),
    ).map((slug, i) => ({ slug, slot: i })),
  );
  const [showReference, setShowReference] = useState(true);
  const [asTable, setAsTable] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const selected = useMemo(() => {
    return claims
      .map((c) => {
        const series = LOFT_SERIES.find((s) => s.slug === c.slug);
        return series ? { ...series, color: SERIES_COLORS[c.slot] } : null;
      })
      .filter((v): v is LoftSeries & { color: string } => v !== null);
  }, [claims]);

  function toggle(slug: string) {
    setClaims((prev) => {
      const existing = prev.find((c) => c.slug === slug);
      if (existing) return prev.filter((c) => c.slug !== slug);
      const slot = lowestFreeSlot(prev);
      if (slot === null) return prev; // 6개 초과 선택은 막는다
      return [...prev, { slug, slot }];
    });
  }

  // ── 축 도메인 ────────────────────────────────────────────────
  const clubs = useMemo<Club[]>(() => {
    if (selected.length === 0) return [];
    const indices = selected.flatMap((s) =>
      s.points.map((p) => CLUB_AXIS.indexOf(p.club)),
    );
    const lo = Math.min(...indices);
    const hi = Math.max(...indices);
    return CLUB_AXIS.slice(lo, hi + 1) as Club[];
  }, [selected]);

  const reference = useMemo(
    () => CLASSIC_REFERENCE.filter((p) => clubs.includes(p.club)),
    [clubs],
  );

  const yDomain = useMemo(() => {
    const lofts = selected.flatMap((s) => s.points.map((p) => p.loft));
    if (showReference) lofts.push(...reference.map((p) => p.loft));
    if (lofts.length === 0) return { min: 20, max: 50 };
    const min = Math.floor((Math.min(...lofts) - 2) / 2) * 2;
    const max = Math.ceil((Math.max(...lofts) + 2) / 2) * 2;
    return { min, max };
  }, [selected, reference, showReference]);

  const x = (club: Club) => {
    const i = clubs.indexOf(club);
    if (clubs.length <= 1) return PAD.left + PLOT.w / 2;
    return PAD.left + (i / (clubs.length - 1)) * PLOT.w;
  };
  const y = (loft: number) => {
    const t = (loft - yDomain.min) / (yDomain.max - yDomain.min);
    return PAD.top + PLOT.h - t * PLOT.h;
  };

  const yTicks = useMemo(() => {
    const step = yDomain.max - yDomain.min > 20 ? 4 : 2;
    const ticks: number[] = [];
    for (let v = yDomain.min; v <= yDomain.max; v += step) ticks.push(v);
    return ticks;
  }, [yDomain]);

  /**
   * 확인된 값 사이에 빈 클럽이 있으면 그 구간은 측정치가 아니라 이어붙인
   * 선일 뿐이다. 파선 + 반투명으로 그려서 실측 구간과 구분한다.
   */
  const segments = useMemo(() => {
    return selected.flatMap((s) =>
      s.points.slice(0, -1).map((p, i) => {
        const next = s.points[i + 1];
        const gap =
          Math.abs(clubs.indexOf(next.club) - clubs.indexOf(p.club)) > 1;
        return {
          key: `${s.slug}-${p.club}`,
          color: s.color,
          x1: x(p.club),
          y1: y(p.loft),
          x2: x(next.club),
          y2: y(next.loft),
          gap,
        };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, clubs, yDomain]);

  // ── 각 선의 끝점에 직접 라벨 (겹침 방지) ─────────────────────
  const endLabels = useMemo(() => {
    const raw = selected
      .map((s) => {
        const last = s.points[s.points.length - 1];
        return {
          name: s.name,
          color: s.color,
          x: x(last.club) + 12,
          y: y(last.loft),
        };
      })
      .sort((a, b) => a.y - b.y);
    const MIN_GAP = 17;
    for (let i = 1; i < raw.length; i++) {
      // x가 충분히 떨어져 있으면 서로 가릴 일이 없다
      if (
        Math.abs(raw[i].x - raw[i - 1].x) < 70 &&
        raw[i].y - raw[i - 1].y < MIN_GAP
      ) {
        raw[i].y = raw[i - 1].y + MIN_GAP;
      }
    }
    return raw;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, yDomain, clubs]);

  const activeClub = activeIdx !== null ? clubs[activeIdx] : null;

  function handlePointer(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const vbX = ((e.clientX - rect.left) / rect.width) * VB.w;
    const t = (vbX - PAD.left) / PLOT.w;
    if (t < -0.05 || t > 1.05 || clubs.length === 0) {
      setActiveIdx(null);
      return;
    }
    const idx = Math.round(t * (clubs.length - 1));
    setActiveIdx(Math.min(Math.max(idx, 0), clubs.length - 1));
  }

  function handleKey(e: React.KeyboardEvent<SVGSVGElement>) {
    if (clubs.length === 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIdx((prev) => {
        const next =
          prev === null
            ? 0
            : prev + (e.key === "ArrowRight" ? 1 : -1);
        return Math.min(Math.max(next, 0), clubs.length - 1);
      });
    }
    if (e.key === "Escape") setActiveIdx(null);
  }

  const atCapacity = claims.length >= MAX_SELECTED;

  return (
    <div>
      {/* 필터 행 — 아래 차트와 표 모두를 스코프한다 */}
      <div className="flex flex-wrap items-center gap-2">
        {LOFT_SERIES.map((s) => {
          const claim = claims.find((c) => c.slug === s.slug);
          const on = Boolean(claim);
          const color = claim ? SERIES_COLORS[claim.slot] : undefined;
          const disabled = !on && atCapacity;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => toggle(s.slug)}
              disabled={disabled}
              aria-pressed={on}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                on
                  ? "border-ink bg-ink text-paper"
                  : disabled
                    ? "cursor-not-allowed border-line text-line"
                    : "border-line text-mist hover:border-ink hover:text-ink"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-colors"
                style={{
                  backgroundColor: color ?? "transparent",
                  boxShadow: color ? "none" : "inset 0 0 0 1.5px currentColor",
                }}
              />
              {s.name}
              <span
                className={`font-mono text-[11px] ${on ? "text-paper/60" : "text-mist/70"}`}
              >
                {s.coverage}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-mist hover:text-ink">
          <input
            type="checkbox"
            checked={showReference}
            onChange={(e) => setShowReference(e.target.checked)}
            className="h-4 w-4 accent-[#8A8A7E]"
          />
          <svg width="26" height="8" aria-hidden="true">
            <line
              x1="0"
              y1="4"
              x2="26"
              y2="4"
              stroke="#8A8A7E"
              strokeWidth="1.5"
              strokeDasharray="6 5"
            />
          </svg>
          클래식 기준선
        </label>
        <button
          type="button"
          onClick={() => setAsTable((v) => !v)}
          className="text-fairway underline underline-offset-4 hover:text-ink"
        >
          {asTable ? "차트로 보기" : "표로 보기"}
        </button>
        {atCapacity && (
          <span className="font-mono text-xs text-brass">
            최대 {MAX_SELECTED}개까지 비교할 수 있습니다
          </span>
        )}
      </div>

      {selected.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-line p-12 text-center text-mist">
          비교할 브랜드를 하나 이상 선택하세요.
        </p>
      ) : asTable ? (
        <LoftTable clubs={clubs} selected={selected} reference={reference} />
      ) : (
        <div className="relative mt-8">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            style={{ width: "100%", height: "auto" }}
            role="img"
            aria-label={`선택한 ${selected.length}개 브랜드의 클럽별 로프트 비교 차트`}
            tabIndex={0}
            onPointerMove={handlePointer}
            onPointerLeave={() => setActiveIdx(null)}
            onKeyDown={handleKey}
            className="touch-none outline-none focus-visible:ring-2 focus-visible:ring-fairway"
          >
            {/* 가로 그리드 — 실선 헤어라인, 표면보다 한 단계만 진하게 */}
            {yTicks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + PLOT.w}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="#DEDACD"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 12}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[#8A8A7E] font-mono"
                  style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}
                >
                  {t}°
                </text>
              </g>
            ))}

            {/* X축 라벨 */}
            {clubs.map((c) => (
              <text
                key={c}
                x={x(c)}
                y={PAD.top + PLOT.h + 28}
                textAnchor="middle"
                className="fill-[#8A8A7E] font-mono"
                style={{ fontSize: 13 }}
              >
                {c}
              </text>
            ))}

            {/* 크로스헤어 */}
            {activeClub && (
              <line
                x1={x(activeClub)}
                x2={x(activeClub)}
                y1={PAD.top}
                y2={PAD.top + PLOT.h}
                stroke="#14140F"
                strokeWidth="1"
                opacity="0.35"
              />
            )}

            {/* 클래식 기준선 — 시리즈가 아니라 참고 기준이므로 중립 회색 파선 */}
            {showReference && reference.length > 1 && (
              <polyline
                points={reference
                  .map((p) => `${x(p.club)},${y(p.loft)}`)
                  .join(" ")}
                fill="none"
                stroke="#8A8A7E"
                strokeWidth="1.5"
                strokeDasharray="6 5"
              />
            )}

            {/* 시리즈 — 결측 구간은 파선으로 구분 */}
            {segments.map((seg) => (
              <line
                key={seg.key}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={seg.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={seg.gap ? "3 6" : undefined}
                opacity={seg.gap ? 0.45 : 1}
              />
            ))}
            {selected.map((s) => (
              <g key={s.slug}>
                {s.points.map((p) => (
                  <circle
                    key={p.club}
                    cx={x(p.club)}
                    cy={y(p.loft)}
                    r={activeClub === p.club ? 6 : 4}
                    fill={s.color}
                    stroke="#F6F4EE"
                    strokeWidth="2"
                  />
                ))}
              </g>
            ))}

            {/* 선 끝 직접 라벨 — 대비 완화 규칙에 따른 필수 요소 */}
            {endLabels.map((l) => (
              <text
                key={l.name}
                x={l.x}
                y={l.y + 4}
                className="fill-[#14140F]"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                {l.name}
              </text>
            ))}
          </svg>

          {activeClub && (
            <Tooltip
              club={activeClub}
              xPct={(x(activeClub) / VB.w) * 100}
              selected={selected}
              reference={showReference ? reference : []}
            />
          )}
        </div>
      )}

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
        칩의 숫자는 그 브랜드에서 <strong className="text-ink">확인된 로프트 개수</strong>입니다.
        공식 스펙시트를 구하지 못한 클럽은 추정해서 채우지 않고 비워 뒀습니다.
        점이 찍힌 곳만 실제 확인된 값이고,{" "}
        <strong className="text-ink">파선 구간은 측정치가 아니라 확인된 두 점을
        이어붙인 선</strong>일 뿐입니다. 클래식 기준선은 거리 경쟁 이전의 전통적인
        로프트 배열을 편집부가 정리한 참고값이며 공식 표준이 아닙니다.
      </p>
    </div>
  );
}

function Tooltip({
  club,
  xPct,
  selected,
  reference,
}: {
  club: Club;
  xPct: number;
  selected: (LoftSeries & { color: string })[];
  reference: { club: Club; loft: number }[];
}) {
  const rows = selected
    .map((s) => {
      const p = s.points.find((pt) => pt.club === club);
      return p ? { name: s.name, color: s.color, loft: p.loft } : null;
    })
    .filter((v): v is { name: string; color: string; loft: number } => v !== null)
    .sort((a, b) => a.loft - b.loft);

  const ref = reference.find((r) => r.club === club);
  const flip = xPct > 62;

  return (
    <div
      className="pointer-events-none absolute top-2 z-10 w-[210px] rounded-lg border border-line bg-paper p-4 shadow-[0_8px_30px_rgba(20,20,15,0.10)]"
      style={
        flip
          ? { right: `${100 - xPct}%`, marginRight: 14 }
          : { left: `${xPct}%`, marginLeft: 14 }
      }
    >
      <p className="font-mono text-xs tracking-widest text-mist uppercase">
        {club}
      </p>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-baseline gap-2.5">
            <span
              className="mt-1.5 h-0.5 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <span
              className="font-mono text-base text-ink"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {r.loft}°
            </span>
            <span className="truncate text-xs text-mist">{r.name}</span>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="text-xs text-mist">이 클럽의 확인된 값 없음</li>
        )}
      </ul>
      {ref && (
        <p className="mt-3 border-t border-line pt-2.5 font-mono text-xs text-mist">
          클래식 기준 {ref.loft}°
        </p>
      )}
    </div>
  );
}

function LoftTable({
  clubs,
  selected,
  reference,
}: {
  clubs: Club[];
  selected: (LoftSeries & { color: string })[];
  reference: { club: Club; loft: number }[];
}) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table
        className="w-full min-w-[560px] border-collapse text-sm"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <caption className="sr-only">
          선택한 브랜드의 클럽별 로프트 값
        </caption>
        <thead>
          <tr className="border-b border-ink text-left">
            <th className="py-3 pr-4 font-mono text-xs font-normal uppercase text-mist">
              클럽
            </th>
            {selected.map((s) => (
              <th key={s.slug} className="py-3 pr-4 font-normal">
                <span className="flex items-center gap-2">
                  <span
                    className="h-0.5 w-4 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name}
                </span>
              </th>
            ))}
            <th className="py-3 pr-4 font-mono text-xs font-normal uppercase text-mist">
              클래식
            </th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((c) => (
            <tr key={c} className="border-b border-line">
              <td className="py-2.5 pr-4 font-mono text-mist">{c}</td>
              {selected.map((s) => {
                const p = s.points.find((pt) => pt.club === c);
                return (
                  <td key={s.slug} className="py-2.5 pr-4 font-mono">
                    {p ? `${p.loft}°` : <span className="text-line">—</span>}
                  </td>
                );
              })}
              <td className="py-2.5 pr-4 font-mono text-mist">
                {reference.find((r) => r.club === c)?.loft ?? "—"}
                {reference.find((r) => r.club === c) ? "°" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
