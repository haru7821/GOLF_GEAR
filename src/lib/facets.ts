import { BRANDS, type Brand, type PriceBand } from "@/data/brands";

/** 가격 밴드를 비싼 순으로 고정 정렬하기 위한 순서 */
export const PRICE_ORDER: PriceBand[] = [
  "최상위",
  "상위",
  "중상위",
  "중가",
  "입문",
];

/** URL에 한글이 인코딩돼 들어가지 않도록 슬러그를 따로 둔다. */
const ORIGIN_SLUG: Record<string, string> = { 미국: "us", 일본: "jp" };
const PRICE_SLUG: Record<PriceBand, string> = {
  최상위: "top",
  상위: "high",
  중상위: "midhigh",
  중가: "mid",
  입문: "entry",
};

function invert(map: Record<string, string>) {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

const ORIGIN_FROM_SLUG = invert(ORIGIN_SLUG);
const PRICE_FROM_SLUG = invert(PRICE_SLUG);

export const originToSlug = (v: string) => ORIGIN_SLUG[v] ?? v;
export const slugToOrigin = (v: string) => ORIGIN_FROM_SLUG[v] ?? v;
export const priceToSlug = (v: PriceBand) => PRICE_SLUG[v] ?? v;
export const slugToPrice = (v: string) => PRICE_FROM_SLUG[v] ?? v;

/** 데이터에 실제로 존재하는 값만 필터 옵션으로 노출한다. */
export const ORIGINS: string[] = [...new Set(BRANDS.map((b) => b.origin))];
export const PRICE_BANDS: PriceBand[] = PRICE_ORDER.filter((band) =>
  BRANDS.some((b) => b.price.band === band),
);

export type Filters = {
  tier: string[];
  origin: string[];
  price: string[];
  loftsOnly: boolean;
};

export const EMPTY_FILTERS: Filters = {
  tier: [],
  origin: [],
  price: [],
  loftsOnly: false,
};

export function hasAnyFilter(f: Filters) {
  return (
    f.tier.length > 0 ||
    f.origin.length > 0 ||
    f.price.length > 0 ||
    f.loftsOnly
  );
}

function hasLofts(b: Brand) {
  return (b.signatureIron?.lofts.length ?? 0) > 0;
}

/**
 * 비어 있는 조건은 그 축을 제한하지 않는다(같은 축 안에서는 OR,
 * 축과 축 사이에는 AND).
 */
export function matches(b: Brand, f: Filters) {
  if (f.tier.length > 0 && !f.tier.includes(b.tier)) return false;
  if (f.origin.length > 0 && !f.origin.includes(b.origin)) return false;
  if (f.price.length > 0 && !f.price.includes(b.price.band)) return false;
  if (f.loftsOnly && !hasLofts(b)) return false;
  return true;
}

export function applyFilters(f: Filters): Brand[] {
  return BRANDS.filter((b) => matches(b, f));
}

/**
 * 옵션 옆 개수는 '그 축을 제외한' 나머지 조건 기준으로 센다.
 * 그래야 선택했을 때 결과가 0이 되는 막다른 길이 생기지 않는다.
 */
export function countFor(
  f: Filters,
  axis: keyof Omit<Filters, "loftsOnly">,
  value: string,
) {
  const relaxed: Filters = { ...f, [axis]: [] };
  return BRANDS.filter(
    (b) => matches(b, relaxed) && brandValue(b, axis) === value,
  ).length;
}

export function countLoftsOnly(f: Filters) {
  const relaxed: Filters = { ...f, loftsOnly: false };
  return BRANDS.filter((b) => matches(b, relaxed) && hasLofts(b)).length;
}

function brandValue(b: Brand, axis: keyof Omit<Filters, "loftsOnly">) {
  if (axis === "tier") return b.tier;
  if (axis === "origin") return b.origin;
  return b.price.band;
}

// ── URL 직렬화 ────────────────────────────────────────────────

export function filtersFromParams(params: URLSearchParams): Filters {
  const list = (key: string) =>
    (params.get(key) ?? "").split(",").filter(Boolean);
  return {
    tier: list("tier").filter((t) => ["S", "A", "B", "C", "D"].includes(t)),
    origin: list("origin").map(slugToOrigin).filter((o) => ORIGINS.includes(o)),
    price: list("price")
      .map(slugToPrice)
      .filter((p) => (PRICE_BANDS as string[]).includes(p)),
    loftsOnly: params.get("lofts") === "1",
  };
}

export function filtersToQuery(f: Filters): string {
  const params = new URLSearchParams();
  if (f.tier.length) params.set("tier", f.tier.join(","));
  if (f.origin.length)
    params.set("origin", f.origin.map(originToSlug).join(","));
  if (f.price.length)
    params.set("price", f.price.map((p) => priceToSlug(p as PriceBand)).join(","));
  if (f.loftsOnly) params.set("lofts", "1");
  return params.toString();
}
