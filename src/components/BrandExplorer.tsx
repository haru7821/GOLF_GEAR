"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TIERS, BRANDS, type Brand } from "@/data/brands";
import {
  EMPTY_FILTERS,
  ORIGINS,
  PRICE_BANDS,
  applyFilters,
  countFor,
  countLoftsOnly,
  filtersFromParams,
  filtersToQuery,
  hasAnyFilter,
  type Filters,
} from "@/lib/facets";

/**
 * URL 동기화를 next/navigation의 useSearchParams가 아니라 History API로 한다.
 * useSearchParams를 쓰면 이 목록이 Suspense 폴백 뒤로 밀려 정적 HTML에
 * 브랜드가 하나도 담기지 않는다. 검색 노출이 중요한 페이지라 서버에서
 * 전체 목록을 그대로 내보내고, 필터 상태는 하이드레이션 직후에 적용한다.
 */
export function BrandExplorer() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  // 서버 HTML은 항상 '필터 없음' 상태이므로, 공유된 URL의 조건은 마운트 후 적용한다
  useEffect(() => {
    const read = () =>
      setFilters(filtersFromParams(new URLSearchParams(window.location.search)));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const push = useCallback((next: Filters) => {
    setFilters(next);
    const query = filtersToQuery(next);
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, []);

  const reset = useCallback(() => push(EMPTY_FILTERS), [push]);

  const toggle = useCallback(
    (axis: "tier" | "origin" | "price", value: string) => {
      const current = filters[axis];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      push({ ...filters, [axis]: next });
    },
    [filters, push],
  );

  const results = useMemo(() => applyFilters(filters), [filters]);
  const active = hasAnyFilter(filters);

  return (
    <>
      {/* 필터 행 — 아래 목록 전체를 스코프한다 */}
      <div className="border-y border-line bg-ink/[0.02]">
        <div className="mx-auto max-w-[1120px] space-y-4 px-6 py-6">
          <FacetRow label="등급">
            {TIERS.map((t) => (
              <Chip
                key={t.code}
                on={filters.tier.includes(t.code)}
                count={countFor(filters, "tier", t.code)}
                onClick={() => toggle("tier", t.code)}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${t.colorClass}`}
                >
                  {t.code}
                </span>
                {t.labelKo}
              </Chip>
            ))}
          </FacetRow>

          <FacetRow label="원산지">
            {ORIGINS.map((o) => (
              <Chip
                key={o}
                on={filters.origin.includes(o)}
                count={countFor(filters, "origin", o)}
                onClick={() => toggle("origin", o)}
              >
                {o}
              </Chip>
            ))}
          </FacetRow>

          <FacetRow label="가격">
            {PRICE_BANDS.map((p) => (
              <Chip
                key={p}
                on={filters.price.includes(p)}
                count={countFor(filters, "price", p)}
                onClick={() => toggle("price", p)}
              >
                {p}
              </Chip>
            ))}
          </FacetRow>

          <FacetRow label="데이터">
            <Chip
              on={filters.loftsOnly}
              count={countLoftsOnly(filters)}
              onClick={() =>
                push({ ...filters, loftsOnly: !filters.loftsOnly })
              }
            >
              로프트 확보
            </Chip>
          </FacetRow>

          <div className="flex items-center gap-4 border-t border-line pt-4">
            <p className="font-mono text-sm">
              <span className="text-ink">{results.length}</span>
              <span className="text-mist"> / {BRANDS.length}개 브랜드</span>
            </p>
            {active && (
              <button
                type="button"
                onClick={reset}
                className="text-sm text-fairway underline underline-offset-4 hover:text-ink"
              >
                필터 초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mx-auto max-w-[1120px] px-6 py-24 text-center">
          <p className="font-display text-2xl">조건에 맞는 브랜드가 없습니다</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-md border border-line px-6 py-3 text-sm transition-colors hover:border-ink"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        TIERS.map((tier) => {
          const brands = results.filter((b) => b.tier === tier.code);
          if (brands.length === 0) return null;
          return (
            <section key={tier.code} className="border-b border-line px-6 py-14">
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
                    <BrandCard key={b.slug} brand={b} />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}
    </>
  );
}

function FacetRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 shrink-0 font-mono text-xs tracking-wider text-mist uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  on,
  count,
  onClick,
  children,
}: {
  on: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const empty = count === 0 && !on;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={empty}
      aria-pressed={on}
      className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        on
          ? "border-ink bg-ink text-paper"
          : empty
            ? "cursor-not-allowed border-line text-line"
            : "border-line bg-paper text-mist hover:border-ink hover:text-ink"
      }`}
    >
      {children}
      <span
        className={`font-mono text-[11px] ${on ? "text-paper/60" : "text-mist/70"}`}
      >
        {count}
      </span>
    </button>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="rounded-md border border-line bg-paper p-6 transition-colors hover:border-ink"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-xl">{brand.name}</p>
        <span className="font-mono text-xs whitespace-nowrap text-mist">
          {brand.price.band}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-mist">{brand.note}</p>
      <p className="mt-4 font-mono text-[11px] text-mist/70">
        {brand.origin} · {brand.founded}
      </p>
    </Link>
  );
}
