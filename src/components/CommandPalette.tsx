"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BRANDS, tierOf } from "@/data/brands";

type Item = {
  href: string;
  title: string;
  hint: string;
  /** 검색 대상 문자열 (소문자) */
  haystack: string;
  badge?: { code: string; className: string };
};

const PAGES: Item[] = [
  {
    href: "/brands",
    title: "브랜드 등급",
    hint: "페이지",
    haystack: "브랜드 등급 brands 전체 목록",
  },
  {
    href: "/lofts",
    title: "로프트 비교",
    hint: "페이지",
    haystack: "로프트 비교 lofts loft 차트",
  },
  {
    href: "/compare",
    title: "브랜드 비교",
    hint: "페이지",
    haystack: "브랜드 비교 compare 나란히",
  },
  {
    href: "/finder",
    title: "브랜드 찾기",
    hint: "페이지",
    haystack: "브랜드 찾기 finder 진단 추천 퀴즈",
  },
];

const BRAND_ITEMS: Item[] = BRANDS.map((b) => {
  const tier = tierOf(b.tier);
  return {
    href: `/brands/${b.slug}`,
    title: b.name,
    hint: `${b.nameKo} · ${tier.labelKo} · ${b.origin}${
      b.signatureIron ? ` · ${b.signatureIron.model}` : ""
    }`,
    haystack: [
      b.name,
      b.nameKo,
      b.slug,
      b.origin,
      b.parent ?? "",
      tier.labelKo,
      b.price.band,
      b.signatureIron?.model ?? "",
    ]
      .join(" ")
      .toLowerCase(),
    badge: { code: tier.code, className: tier.colorClass },
  };
});

const ALL = [...BRAND_ITEMS, ...PAGES];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // 열 때마다 이전 검색어를 지운다 (effect가 아니라 여는 동작에서 처리)
  const openPalette = useCallback(() => {
    setQuery("");
    setCursor(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) {
            setQuery("");
            setCursor(0);
          }
          return !wasOpen;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL.slice(0, 8);
    return ALL.filter((i) => i.haystack.includes(q)).slice(0, 8);
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[cursor];
      if (item) go(item.href);
    }
  }

  // 선택 항목이 목록 밖으로 나가면 스크롤을 맞춘다
  useEffect(() => {
    listRef.current
      ?.querySelectorAll("li")
      [cursor]?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-mist transition-colors hover:border-ink hover:text-ink"
        aria-label="검색 열기"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle
            cx="7"
            cy="7"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M10.5 10.5L14 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <span className="hidden font-mono sm:inline">⌘K</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="브랜드·페이지 검색"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] overflow-hidden rounded-xl border border-line bg-paper shadow-[0_24px_60px_rgba(20,20,15,0.28)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="shrink-0 text-mist"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M10.5 10.5L14 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="브랜드나 페이지 검색 — 미우라, 일본, T100…"
                className="w-full bg-transparent text-base outline-none placeholder:text-mist"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mist sm:block">
                ESC
              </kbd>
            </div>

            {results.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-mist">
                일치하는 항목이 없습니다
              </p>
            ) : (
              <ul ref={listRef} className="max-h-[46vh] overflow-y-auto py-2">
                {results.map((item, i) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(item.href)}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                        i === cursor ? "bg-ink/[0.05]" : ""
                      }`}
                    >
                      {item.badge ? (
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${item.badge.className}`}
                        >
                          {item.badge.code}
                        </span>
                      ) : (
                        <span className="h-6 w-6 shrink-0" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base">
                          {item.title}
                        </span>
                        <span className="block truncate text-xs text-mist">
                          {item.hint}
                        </span>
                      </span>
                      {i === cursor && (
                        <span className="shrink-0 font-mono text-xs text-mist">
                          ↵
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
