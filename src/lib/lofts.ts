import { BRANDS, type Brand } from "@/data/brands";

/** 차트 X축의 표준 클럽 순서 */
export const CLUB_AXIS = [
  "2I",
  "3I",
  "4I",
  "5I",
  "6I",
  "7I",
  "8I",
  "9I",
  "PW",
  "GW",
] as const;

export type Club = (typeof CLUB_AXIS)[number];

/**
 * 브랜드마다 클럽 표기가 달라 표준 축에 맞춰 정규화한다.
 * 혼마는 PW/GW를 10I/11I로, PXG는 W/G로 부르고, 어프로치 웨지(AW)는
 * 세트 내 위치상 갭 웨지 자리에 해당한다.
 */
const CLUB_ALIASES: Record<string, Club> = {
  "PW(10I)": "PW",
  "GW(11I)": "GW",
  W: "PW",
  G: "GW",
  AW: "GW",
};

function normalizeClub(raw: string): Club | null {
  const alias = CLUB_ALIASES[raw];
  if (alias) return alias;
  return (CLUB_AXIS as readonly string[]).includes(raw) ? (raw as Club) : null;
}

/** "33°" → 33, "20.5°" → 20.5. 범위 표기("45–48°")처럼 단일 값이 아니면 제외한다. */
function parseLoft(raw: string): number | null {
  const match = /^(\d+(?:\.\d+)?)°$/.exec(raw.trim());
  return match ? Number(match[1]) : null;
}

export type LoftPoint = { club: Club; loft: number };

export type LoftSeries = {
  slug: string;
  name: string;
  model: string;
  points: LoftPoint[];
  /** 세트 전체 대비 확보된 로프트 수 — 데이터 완전성을 UI에 노출하기 위한 값 */
  coverage: number;
};

function toSeries(brand: Brand): LoftSeries | null {
  const iron = brand.signatureIron;
  if (!iron) return null;

  const points: LoftPoint[] = [];
  for (const spec of iron.lofts) {
    const club = normalizeClub(spec.club);
    const loft = parseLoft(spec.loft);
    if (club && loft !== null) points.push({ club, loft });
  }
  if (points.length === 0) return null;

  points.sort(
    (a, b) => CLUB_AXIS.indexOf(a.club) - CLUB_AXIS.indexOf(b.club),
  );
  return {
    slug: brand.slug,
    name: brand.name,
    model: iron.model,
    points,
    coverage: points.length,
  };
}

/** 로프트가 하나라도 확인된 브랜드만 차트 대상이 된다. */
export const LOFT_SERIES: readonly LoftSeries[] = BRANDS.map(toSeries).filter(
  (s): s is LoftSeries => s !== null,
);

/**
 * 참고용 기준선. 거리 경쟁이 붙기 이전의 전통적인 아이언 로프트 배열을
 * 편집부가 정리한 값이며, 공식 표준이 아니다. 화면에도 그렇게 밝힌다.
 */
export const CLASSIC_REFERENCE: LoftPoint[] = [
  { club: "3I", loft: 21 },
  { club: "4I", loft: 24 },
  { club: "5I", loft: 27 },
  { club: "6I", loft: 31 },
  { club: "7I", loft: 35 },
  { club: "8I", loft: 39 },
  { club: "9I", loft: 43 },
  { club: "PW", loft: 47 },
];

export type SevenIron = {
  slug: string;
  name: string;
  model: string;
  loft: number;
};

/** 7번 아이언은 업계에서 로프트 강도를 비교할 때 쓰는 기준 클럽이다. */
export const SEVEN_IRONS: readonly SevenIron[] = LOFT_SERIES.map((s) => {
  const point = s.points.find((p) => p.club === "7I");
  return point
    ? { slug: s.slug, name: s.name, model: s.model, loft: point.loft }
    : null;
})
  .filter((v): v is SevenIron => v !== null)
  .sort((a, b) => a.loft - b.loft);

export const SEVEN_IRON_SPREAD = {
  min: SEVEN_IRONS[0]?.loft ?? 0,
  max: SEVEN_IRONS[SEVEN_IRONS.length - 1]?.loft ?? 0,
  get delta() {
    return Number((this.max - this.min).toFixed(1));
  },
};

/**
 * 검증된 카테고리 팔레트(라이트 모드, 표면 #F6F4EE 기준).
 * 슬롯 순서는 색약 판별 가능성을 위해 고정이며 절대 순환시키지 않는다.
 * 6슬롯을 넘겨 선택할 수 없게 UI에서 막는다.
 */
export const SERIES_COLORS: readonly string[] = [
  "#2a78d6",
  "#eb6834",
  "#1baf7a",
  "#eda100",
  "#e87ba4",
  "#008300",
];

export const MAX_SELECTED = SERIES_COLORS.length;

/** 기본 선택: 정통(윌슨)부터 강로프트(PXG)까지 폭을 한눈에 보여주는 조합 */
export const DEFAULT_SELECTION = ["wilson", "titleist", "srixon", "pxg"];
