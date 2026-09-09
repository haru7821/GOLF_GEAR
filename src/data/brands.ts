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

export type LoftSpec = {
  club: string; // 예: "7I", "PW"
  loft: string; // 예: "33°"
};

export type SignatureIron = {
  model: string;
  lofts: LoftSpec[];
  features: string[];
  /** 로프트 수치 출처가 불완전·상충하는 경우의 검증 메모 */
  specNote?: string;
};

export type Brand = {
  slug: string;
  name: string;
  tier: TierCode;
  note: string;
  origin: string;
  founded: string;
  parent?: string;
  heritage: string;
  signatureIron?: SignatureIron;
};

/**
 * 실제 등급 근거와 사양은 정보 수집 단계에서 조사한 내용입니다.
 * 로프트·사양은 리테일러/리뷰 매체 자료를 교차 확인했으나, 세트 구성이나
 * 연식(리테일 버전)에 따라 실제 로프트와 차이가 있을 수 있습니다.
 * 완전히 확인되지 않은 값은 specNote에 명시했습니다 — 최종 게시 전
 * 검수(사실관계 확인) 단계를 거쳐야 합니다.
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
    parent: "Acushnet Company",
    heritage: "Acushnet Company 산하, 볼·클럽 전 라인업에서 투어 신뢰도 최상위",
    signatureIron: {
      model: "T100",
      lofts: [
        { club: "3I", loft: "20°" },
        { club: "4I", loft: "23°" },
        { club: "5I", loft: "26°" },
        { club: "6I", loft: "29°" },
        { club: "7I", loft: "33°" },
        { club: "8I", loft: "37°" },
        { club: "9I", loft: "41°" },
        { club: "PW", loft: "45°" },
        { club: "GW", loft: "49°" },
      ],
      features: [
        "Dual Tour Undercut 캐비티로 관용성과 타구감을 동시에 확보",
        "5–9번에 소프트 스틸 인서트를 적용해 임팩트 피드백 강화",
        "투어 프로 다수가 실전 채택하는 '모던 투어 아이언' 포지셔닝",
      ],
    },
  },
  {
    slug: "honma",
    name: "Honma",
    tier: "S",
    note: "일본 프리미엄 헤리티지, 수공정 마감",
    origin: "일본",
    founded: "1959",
    heritage: "장인 수작업 공정과 고급 소재로 프리미엄 포지셔닝을 구축",
    signatureIron: {
      model: "TW757 Vx",
      lofts: [
        { club: "4I", loft: "21°" },
        { club: "5I", loft: "24°" },
        { club: "6I", loft: "27°" },
        { club: "7I", loft: "30°" },
        { club: "8I", loft: "34°" },
        { club: "9I", loft: "38°" },
        { club: "PW(10I)", loft: "43°" },
        { club: "GW(11I)", loft: "49°" },
      ],
      features: [
        "저중심 설계로 캐비티백이면서도 높은 탄도 구현",
        "T//World 라인업 특유의 정밀 마감과 커스텀 피팅 중심 판매",
        "B(블레이드)·Vx(캐비티)·P(플레이어스 디스턴스) 3종으로 세분화",
      ],
    },
  },
  {
    slug: "callaway",
    name: "Callaway",
    tier: "A",
    note: "AI 페이스 설계 등 기술 혁신 주도",
    origin: "미국",
    founded: "1982",
    heritage: "빅버사로 대중화를 이끈 이후 지속적인 기술 혁신을 주도",
    signatureIron: {
      model: "Apex Pro (2024)",
      lofts: [
        { club: "3I", loft: "20.5°" },
        { club: "7I", loft: "33°" },
        { club: "PW", loft: "45–48°" },
      ],
      features: [
        "AI 설계 '플래시 페이스 컵'으로 미스히트 시에도 볼스피드 유지",
        "단조 헤드에 정밀 웨이트 포트를 배치한 투어 지향 컴팩트 헤드",
        "Apex 라인 중 가장 조작성에 특화된 상위 모델",
      ],
      specNote:
        "4~6·8·9번 로프트와 PW 로프트(자료마다 45°/48°로 상이)는 자료 간 불일치로 확인 필요",
    },
  },
  {
    slug: "pxg",
    name: "PXG",
    tier: "A",
    note: "고성능·고가 포지셔닝의 대표 브랜드",
    origin: "미국",
    founded: "2014",
    heritage: "밥 파슨스가 설립, 정밀 CNC 가공과 고가 프리미엄 전략",
    signatureIron: {
      model: "0311 P GEN6",
      lofts: [
        { club: "4I", loft: "20.5°" },
        { club: "5I", loft: "23°" },
        { club: "6I", loft: "26°" },
        { club: "7I", loft: "30°" },
        { club: "8I", loft: "34°" },
        { club: "9I", loft: "39°" },
        { club: "W", loft: "44°" },
        { club: "G", loft: "49°" },
      ],
      features: [
        "울트라 씬 페이스 + 내부 웨이트로 반발계수를 극한까지 활용",
        "XP(강로프트) 모델과 병행 출시해 세부 니즈 대응",
        "전 모델 100% 커스텀 피팅 판매 전략",
      ],
      specNote: "3번 아이언 로프트는 자료에서 확인되지 않음",
    },
  },
  {
    slug: "taylormade",
    name: "TaylorMade",
    tier: "A",
    note: "투어-소비자 라인업 균형",
    origin: "미국",
    founded: "1979",
    heritage: "메탈우드를 대중화한 원조, 투어와 소비자 라인업의 균형이 강점",
    signatureIron: {
      model: "P770 (2024)",
      lofts: [
        { club: "3I", loft: "20.5°" },
        { club: "4I", loft: "23°" },
        { club: "5I", loft: "26°" },
        { club: "6I", loft: "29.5°" },
        { club: "7I", loft: "33°" },
        { club: "8I", loft: "37°" },
        { club: "9I", loft: "41.5°" },
        { club: "PW", loft: "46°" },
        { club: "AW", loft: "51°" },
      ],
      features: [
        "언더컷 캐비티 + 텅스텐 웨이트로 관용성과 조작성을 동시 확보",
        "포지드 페이스 인서트로 투어 수준의 타구감 구현",
        "P-시리즈 중 투어와 소비자 사이 '세컨드 라인업' 포지셔닝",
      ],
    },
  },
  {
    slug: "miura",
    name: "Miura",
    tier: "S",
    note: "손 단조 아이언의 정점, 클럽 헤드 장인정신의 상징",
    origin: "일본",
    founded: "1957",
    heritage:
      "효고현 히메지에서 미우라 카츠히로가 설립. 소량 수작업 단조로 '아이언의 예술품'이라 불리며 전 세계 투어 프로·수집가에게 최상급으로 평가받음",
    signatureIron: {
      model: "CB-2007",
      lofts: [
        { club: "2I", loft: "19°" },
        { club: "3I", loft: "21°" },
        { club: "4I", loft: "24°" },
        { club: "5I", loft: "27°" },
        { club: "6I", loft: "30°" },
        { club: "7I", loft: "34°" },
        { club: "8I", loft: "38°" },
        { club: "9I", loft: "42°" },
        { club: "PW", loft: "47°" },
      ],
      features: [
        "SS-2020 연철을 100% 수작업 그라인딩으로 마감",
        "캐비티백이지만 블레이드에 가까운 컴팩트 헤드 셰이프",
        "미우라 2000 시리즈 중 가장 균형 잡힌 모델로 평가",
      ],
    },
  },
  {
    slug: "mizuno",
    name: "Mizuno",
    tier: "A",
    note: "그레인 플로우 단조 기술로 검증된 타구감",
    origin: "일본",
    founded: "1906",
    heritage:
      "100년 이상 축적된 그레인 플로우 단조(Grain Flow Forged) 공법으로 투어 프로들의 신뢰가 두터운 정밀 아이언 명가",
    signatureIron: {
      model: "JPX923 Tour",
      lofts: [{ club: "7I", loft: "34°" }],
      features: [
        "그레인 플로우 단조 4공정으로 균일한 금속 결 형성",
        "동일 라인 Hot Metal 대비 6도 약한 '정통 로프트' 세팅",
        "캐비티백이지만 싱글 디짓 골퍼·투어 프로 채용 다수",
      ],
      specNote: "7번 아이언 외 나머지 클럽 로프트는 자료에서 확인되지 않음",
    },
  },
  {
    slug: "epon",
    name: "Epon",
    tier: "A",
    note: "일본 소규모 공방의 하이엔드 커스텀 단조 아이언",
    origin: "일본",
    founded: "확인 필요",
    heritage:
      "소량 생산 체제의 부티크 브랜드로, 미우라와 함께 일본 하이엔드 단조 아이언을 대표하는 마니아층 지지 브랜드 (설립 연혁·수치는 검증 필요)",
    signatureIron: {
      model: "AF-702",
      lofts: [],
      features: [
        "S20C 연철 단조 바디 + AsRoll 스테인리스 페이스(COR 0.8대)",
        "토우·힐 텅스텐 웨이트로 저중심·와이드 스윗스팟 설계",
        "중상급자를 타깃으로 한 소량 생산 커스텀 전용 모델",
      ],
      specNote:
        "클럽별 로프트 수치가 자료마다 상이·불명확하여 표기하지 않음 — 검수 단계에서 공식 스펙시트 확인 필요",
    },
  },
];
