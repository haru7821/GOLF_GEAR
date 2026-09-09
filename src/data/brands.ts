export type TierCode = "S" | "A" | "B" | "C" | "D";

export type Tier = {
  code: TierCode;
  label: string;
  labelKo: string;
  colorClass: string;
  desc: string;
};

export const TIERS: readonly Tier[] = [
  {
    code: "S",
    label: "Icon",
    labelKo: "아이코닉",
    colorClass: "bg-brass text-paper",
    desc: "브랜드 헤리티지와 기술력 모두에서 업계를 정의해온 최상위 브랜드.",
  },
  {
    code: "A",
    label: "Premium",
    labelKo: "프리미엄",
    colorClass: "bg-fairway text-paper",
    desc: "뚜렷한 기술적 차별점과 높은 완성도를 갖춘 프리미엄 브랜드.",
  },
  {
    code: "B",
    label: "Established",
    labelKo: "정통",
    colorClass: "bg-ink text-paper",
    desc: "오랜 업력과 안정적인 제품군으로 신뢰를 쌓아온 브랜드.",
  },
  {
    code: "C",
    label: "Value",
    labelKo: "합리적",
    colorClass: "bg-mist text-paper",
    desc: "합리적인 가격대에서 준수한 성능을 제공하는 브랜드.",
  },
  {
    code: "D",
    label: "Entry",
    labelKo: "입문",
    colorClass: "bg-line text-ink",
    desc: "입문자 접근성에 초점을 맞춘 브랜드.",
  },
];

export function tierOf(code: TierCode): Tier {
  return TIERS.find((t) => t.code === code)!;
}

export type Brand = {
  slug: string;
  name: string;
  tier: TierCode;
  note: string;
  origin: string;
  founded: string;
  heritage: string;
};

/**
 * 샘플 데이터 — 실제 등급·근거는 "정보 수집" 단계에서 사실관계를 확인해
 * 채워질 예정입니다. 현재 수치·설명은 검증되지 않은 플레이스홀더입니다.
 *
 * 참고: 각 브랜드의 공식 로고·제품 이미지는 대부분 "에디토리얼/보도 목적"
 * 한정으로 배포되거나(예: Titleist Newsroom, TaylorMade Newsroom),
 * 승인·로그인이 필요한 자산관리 플랫폼(PXG의 Brandfolder 등)을 통해서만
 * 제공되어 제3자 브랜드 비교 사이트에서의 사용 허용 여부가 명확히
 * 확인되지 않았습니다. 그래서 이미지 대신 텍스트 워드마크만 사용합니다.
 */
export const BRANDS: readonly Brand[] = [
  {
    slug: "titleist",
    name: "Titleist",
    tier: "S",
    note: "투어 채택률 1위, 정밀 단조 아이언의 기준",
    origin: "미국",
    founded: "1932",
    heritage: "Acushnet Company 산하, 볼·클럽 전 라인업에서 투어 신뢰도 최상위",
  },
  {
    slug: "honma",
    name: "Honma",
    tier: "S",
    note: "일본 프리미엄 헤리티지, 수공정 마감",
    origin: "일본",
    founded: "1959",
    heritage: "장인 수작업 공정과 고급 소재로 프리미엄 포지셔닝을 구축",
  },
  {
    slug: "callaway",
    name: "Callaway",
    tier: "A",
    note: "AI 페이스 설계 등 기술 혁신 주도",
    origin: "미국",
    founded: "1982",
    heritage: "빅버사로 대중화를 이끈 이후 지속적인 기술 혁신을 주도",
  },
  {
    slug: "pxg",
    name: "PXG",
    tier: "A",
    note: "고성능·고가 포지셔닝의 대표 브랜드",
    origin: "미국",
    founded: "2014",
    heritage: "밥 파슨스가 설립, 정밀 CNC 가공과 고가 프리미엄 전략",
  },
  {
    slug: "taylormade",
    name: "TaylorMade",
    tier: "A",
    note: "투어-소비자 라인업 균형",
    origin: "미국",
    founded: "1979",
    heritage: "메탈우드를 대중화한 원조, 투어와 소비자 라인업의 균형이 강점",
  },
  {
    slug: "cobra",
    name: "Cobra",
    tier: "B",
    note: "커스터마이징 옵션이 강점",
    origin: "미국",
    founded: "1973",
    heritage: "PUMA 산하, 다양한 커스텀 핏 옵션과 대담한 디자인이 특징",
  },
];
