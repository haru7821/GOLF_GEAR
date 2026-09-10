"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BRANDS, tierOf, type Brand } from "@/data/brands";

const MAX = 3;
const DEFAULT = ["titleist", "miura", "srixon"];

function readSlugs(search: string): string[] {
  const raw = (new URLSearchParams(search).get("b") ?? "")
    .split(",")
    .filter(Boolean);
  const valid = raw.filter((s) => BRANDS.some((b) => b.slug === s));
  return [...new Set(valid)].slice(0, MAX);
}

export function BrandCompare() {
  // 서버 HTML과 어긋나지 않도록 기본값으로 시작하고, URL은 마운트 후 반영한다
  const [slugs, setSlugs] = useState<string[]>(DEFAULT);

  useEffect(() => {
    const read = () => {
      const fromUrl = readSlugs(window.location.search);
      if (fromUrl.length > 0) setSlugs(fromUrl);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const push = useCallback((next: string[]) => {
    setSlugs(next);
    const query = next.length ? `?b=${next.join(",")}` : "";
    window.history.replaceState(null, "", window.location.pathname + query);
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      if (slugs.includes(slug)) push(slugs.filter((s) => s !== slug));
      else if (slugs.length < MAX) push([...slugs, slug]);
    },
    [slugs, push],
  );

  const selected = useMemo(
    () =>
      slugs
        .map((s) => BRANDS.find((b) => b.slug === s))
        .filter((b): b is Brand => Boolean(b)),
    [slugs],
  );

  const atCapacity = slugs.length >= MAX;

  return (
    <>
      <div className="border-y border-line bg-ink/[0.02]">
        <div className="mx-auto max-w-[1120px] px-6 py-6">
          <div className="flex flex-wrap items-center gap-2">
            {BRANDS.map((b) => {
              const on = slugs.includes(b.slug);
              const disabled = !on && atCapacity;
              return (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => toggle(b.slug)}
                  disabled={disabled}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : disabled
                        ? "cursor-not-allowed border-line text-line"
                        : "border-line bg-paper text-mist hover:border-ink hover:text-ink"
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-xs text-mist">
            {selected.length}/{MAX} 선택
            {atCapacity && " — 하나를 해제하면 다른 브랜드를 넣을 수 있습니다"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-6 py-14">
        {selected.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line p-16 text-center text-mist">
            비교할 브랜드를 선택하세요.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left align-top">
              <caption className="sr-only">브랜드 비교 표</caption>
              <thead>
                <tr>
                  <th className="w-[132px] pb-6" />
                  {selected.map((b) => {
                    const tier = tierOf(b.tier);
                    return (
                      <th key={b.slug} className="pr-6 pb-6 font-normal">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${tier.colorClass}`}
                        >
                          {tier.code}
                        </span>
                        <Link
                          href={`/brands/${b.slug}`}
                          className="mt-3 block font-display text-2xl hover:underline"
                        >
                          {b.name}
                        </Link>
                        <span className="font-mono text-[11px] tracking-wider text-mist uppercase">
                          {tier.labelKo}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <Row label="한 줄 요약" brands={selected} cell={(b) => b.note} />
                <Row label="원산지" brands={selected} cell={(b) => b.origin} />
                <Row label="설립" brands={selected} cell={(b) => b.founded} />
                <Row
                  label="소속"
                  brands={selected}
                  cell={(b) => b.parent ?? "독립"}
                />
                <Row
                  label="가격 포지셔닝"
                  brands={selected}
                  cell={(b) => (
                    <>
                      {b.price.band}
                      {b.price.note && (
                        <span className="mt-1 block text-xs text-mist">
                          {b.price.note}
                        </span>
                      )}
                    </>
                  )}
                />
                <Row
                  label="투어 · 검증"
                  brands={selected}
                  cell={(b) =>
                    b.tour ?? <span className="text-mist">확인된 자료 없음</span>
                  }
                />
                <Row
                  label="시그니처 아이언"
                  brands={selected}
                  cell={(b) =>
                    b.signatureIron?.model ?? (
                      <span className="text-mist">—</span>
                    )
                  }
                />
                <Row
                  label="7번 로프트"
                  brands={selected}
                  cell={(b) => {
                    const seven = b.signatureIron?.lofts.find(
                      (l) => l.club === "7I",
                    );
                    return seven ? (
                      <span className="font-mono">{seven.loft}</span>
                    ) : (
                      <span className="text-mist">미확인</span>
                    );
                  }}
                />
                <Row
                  label="로프트 확보"
                  brands={selected}
                  cell={(b) => {
                    const n = b.signatureIron?.lofts.length ?? 0;
                    return n > 0 ? (
                      <span className="font-mono">{n}개 클럽</span>
                    ) : (
                      <span className="text-mist">없음</span>
                    );
                  }}
                />
                <Row
                  label="주요 특징"
                  brands={selected}
                  cell={(b) =>
                    b.signatureIron ? (
                      <ul className="space-y-1.5">
                        {b.signatureIron.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fairway" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-mist">—</span>
                    )
                  }
                />
                <Row
                  label="출처"
                  brands={selected}
                  cell={(b) =>
                    b.sources.length > 0 ? (
                      <ul className="space-y-1">
                        {b.sources.map((s) => (
                          <li key={s.url}>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-fairway underline underline-offset-2 hover:text-ink"
                            >
                              {s.label} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-mist">—</span>
                    )
                  }
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function Row({
  label,
  brands,
  cell,
}: {
  label: string;
  brands: Brand[];
  cell: (b: Brand) => React.ReactNode;
}) {
  return (
    <tr className="border-t border-line align-top">
      <th
        scope="row"
        className="py-5 pr-6 font-mono text-xs font-normal tracking-wider text-mist uppercase"
      >
        {label}
      </th>
      {brands.map((b) => (
        <td key={b.slug} className="py-5 pr-6 text-sm leading-relaxed">
          {cell(b)}
        </td>
      ))}
    </tr>
  );
}
