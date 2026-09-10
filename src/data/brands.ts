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
  /** 로프트 출처가 불완전하거나 자료 간 상충할 때의 검증 메모 */
  specNote?: string;
};

/** 가격은 실측 시세가 아니라 시장 내 '포지셔닝' 구분이다. 확인된 실제 가격만 note에 적는다. */
export type PriceBand = "최상위" | "상위" | "중상위" | "중가" | "입문";

export type Price = {
  band: PriceBand;
  note?: string;
};

export type Source = {
  label: string;
  url: string;
};

/**
 * 브랜드 추천(진단)에 쓰는 성향 프로필.
 * 사실 데이터가 아니라 heritage/signatureIron에 적힌 내용을 근거로 한
 * 편집 판단이며, 추천 화면에서도 그렇게 밝힌다.
 */
export type Profile = {
  /** 무리 없이 다룰 수 있는 구력대 */
  skill: ("입문" | "중급" | "상급")[];
  /** 설계가 우선하는 가치 */
  priority: "타구감" | "관용성" | "균형";
  /** 커스텀 피팅 의존도 */
  fitting: "필수" | "권장" | "불필요";
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
  /** 투어 채택·성적 근거. 확인된 자료가 없으면 생략한다. */
  tour?: string;
  /**
   * 2025 PGA 투어에서 그 브랜드의 아이언이 쓰인 우승 횟수.
   * 출처 집계에 이름이 없으면 '0승'이 아니라 '집계에 없음'이므로
   * 값을 넣지 않고 비워 둔다.
   */
  tourWins2025?: number;
  price: Price;
  profile: Profile;
  signatureIron?: SignatureIron;
  sources: Source[];
};

/**
 * 등급 근거·사양은 리뷰 매체와 리테일러 자료를 교차 확인해 작성했다.
 * 원칙:
 *  - 확인되지 않은 수치는 추정해서 채우지 않고 specNote에 공백을 명시한다.
 *  - 등급(tier)과 가격 밴드는 사실이 아니라 편집 판단이며, 그 근거를 heritage/tour/price에 남긴다.
 *  - 투어 수치는 2025 PGA 투어 시즌 기준(출처: Golf Monthly / MyGolfSpy)이다.
 *
 * 제조사 로고·제품 이미지는 대부분 에디토리얼 한정 배포이거나 승인·로그인이
 * 필요한 자산관리 플랫폼을 통해서만 제공되어, 제3자 비교 사이트 사용 허용
 * 여부가 확인되지 않았다. 그래서 이미지 없이 텍스트 워드마크만 쓴다.
 */

const TOUR_USAGE_SOURCE: Source = {
  label: "Golf Monthly — 2025 PGA Tour 사용 장비 집계",
  url: "https://www.golfmonthly.com/features/the-equipment-debrief-the-most-played-driver-iron-ball-wedge-and-putter-on-the-2025-pga-tour",
};

const TOUR_WINS_SOURCE: Source = {
  label: "MyGolfSpy — 2025 PGA Tour 우승 사용 브랜드 집계",
  url: "https://mygolfspy.com/news-opinion/is-one-brand-dominating-pga-tour-wins-in-2025/",
};

export const BRANDS: readonly Brand[] = [
  // ─── S: 아이코닉 ───────────────────────────────────────────────
  {
    slug: "titleist",
    name: "Titleist",
    tier: "S",
    note: "투어 채택률 1위, 모던 투어 아이언의 기준",
    origin: "미국",
    founded: "1932",
    parent: "Acushnet Company",
    heritage:
      "Acushnet Company 산하로 볼·클럽 전 라인업에서 투어 신뢰도가 가장 높은 브랜드. 프로 장비 선택에서 사실상의 기준점 역할을 해왔다.",
    tour: "2025 PGA 투어에서 가장 많이 사용된 아이언 브랜드. 아이언 기준 30승에 사용됐고, T100은 단일 모델 사용자 12명으로 최다.",
    tourWins2025: 30,
    price: { band: "상위", note: "T100(2021) 5-P 세트 기준 약 US$495 선" },
    profile: { skill: ["중급", "상급"], priority: "균형", fitting: "권장" },
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
        "T-시리즈 중 가장 정통에 가까운 로프트 세팅(7번 33°)",
      ],
    },
    sources: [TOUR_USAGE_SOURCE, TOUR_WINS_SOURCE],
  },
  {
    slug: "ping",
    name: "Ping",
    tier: "S",
    note: "주변 웨이팅과 커스텀 피팅을 정착시킨 엔지니어링 브랜드",
    origin: "미국",
    founded: "1959",
    heritage:
      "GE 엔지니어 출신 카스텐 솔하임이 캘리포니아 자택 차고에서 퍼터를 만들며 시작. 헤드 무게를 주변부로 분산하는 '페리미터 웨이팅'을 정착시켜, 시행착오에 의존하던 클럽 설계를 공학의 영역으로 옮겼다. 브랜드명은 임팩트 순간의 소리에서 따왔다.",
    tour: "2025 PGA 투어 아이언 사용 브랜드 상위권. 아이언 기준 9승에 사용.",
    tourWins2025: 9,
    price: { band: "상위" },
    profile: { skill: ["입문", "중급", "상급"], priority: "균형", fitting: "필수" },
    signatureIron: {
      model: "i230",
      lofts: [{ club: "7I", loft: "33°" }],
      features: [
        "PW–7번 4° 간격, 7번–3번 3.5° 간격으로 촘촘한 거리 계단 구성",
        "스탠다드 외에 파워 스펙(강)·레트로 스펙(약 2°) 로프트 옵션 제공",
        "피팅 데이터를 전제로 판매하는 커스텀 중심 유통",
      ],
      specNote:
        "7번(33°) 외 클럽별 로프트 수치는 공개 자료에서 확인되지 않아 표기하지 않음",
    },
    sources: [
      { label: "Ping (golf) — Wikipedia", url: "https://en.wikipedia.org/wiki/Ping_(golf)" },
      TOUR_WINS_SOURCE,
    ],
  },
  {
    slug: "honma",
    name: "Honma",
    tier: "S",
    note: "일본 프리미엄 헤리티지, 장인 수공정 마감",
    origin: "일본",
    founded: "1959",
    heritage:
      "1959년 2월 혼마 유키히로·히로 형제가 요코하마에 츠루미 골프센터를 열며 시작했고, 1963년 첫 자사 브랜드 클럽을 냈다. 1981년 야마가타현 사카타로 생산 거점을 옮겨 지금도 약 360명의 장인이 상주하는 캠퍼스에서 클럽을 만든다.",
    price: { band: "최상위", note: "베레스 상위 등급은 초고가대에 위치" },
    profile: { skill: ["중급", "상급"], priority: "균형", fitting: "권장" },
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
        "저중심 설계로 강한 로프트에서도 높은 탄도를 유지",
        "B(블레이드)·Vx(캐비티)·P(플레이어스 디스턴스) 3종으로 세분화",
        "자사 VIZARD 샤프트와의 조합을 전제로 한 매칭 설계",
      ],
    },
    sources: [
      {
        label: "Honma Golf — Discover Honma (연혁)",
        url: "https://us.honmagolf.com/pages/discover-honma",
      },
    ],
  },
  {
    slug: "miura",
    name: "Miura",
    tier: "S",
    note: "손 단조 아이언의 정점, 클럽 헤드 장인정신의 상징",
    origin: "일본",
    founded: "1957",
    heritage:
      "효고현 히메지에서 미우라 카츠히로가 설립. 헤드 공차를 ±0.5g 수준으로 관리하는 소량 수작업 단조로 '아이언의 예술품'이라 불리며, 창업자가 지금도 직접 헤드를 그라인딩한다. 대량 생산에 맞지 않는 공정 탓에 출시 물량 자체가 제한된다.",
    tour: "2025 PGA 투어 아이언 기준 1승에 사용. 계약 마케팅 없이 선수 선택으로만 올라온다.",
    tourWins2025: 1,
    price: {
      band: "최상위",
      note: "아이언 1클럽당 약 US$279–339, 커스텀 피팅 포함 판매",
    },
    profile: { skill: ["상급"], priority: "타구감", fitting: "필수" },
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
        "연철 소재를 100% 수작업 그라인딩으로 마감",
        "캐비티백이지만 블레이드에 가까운 컴팩트 헤드 셰이프",
        "미우라 2000 시리즈 중 가장 균형 잡힌 모델로 평가",
      ],
    },
    sources: [
      {
        label: "ExactGolf — Miura 아이언 가격대",
        url: "https://exactgolf.com/know-how/prices-of-miura-irons/",
      },
      TOUR_WINS_SOURCE,
    ],
  },

  // ─── A: 프리미엄 ───────────────────────────────────────────────
  {
    slug: "callaway",
    name: "Callaway",
    tier: "A",
    note: "AI 페이스 설계 등 기술 혁신 주도",
    origin: "미국",
    founded: "1982",
    heritage:
      "빅버사로 대형 헤드 드라이버를 대중화한 이후, 페이스 설계 시뮬레이션을 앞세워 기술 혁신을 이끌어왔다. 2003년 톱플라이트를 인수했다가 2012년 딕스 스포팅 굿즈에 매각한 이력도 있다.",
    tour: "2025 PGA 투어 아이언 기준 8승에 사용.",
    tourWins2025: 8,
    price: { band: "중상위" },
    profile: { skill: ["중급", "상급"], priority: "관용성", fitting: "권장" },
    signatureIron: {
      model: "Apex Pro (2024)",
      lofts: [
        { club: "4I", loft: "22°" },
        { club: "5I", loft: "25°" },
        { club: "6I", loft: "29°" },
        { club: "7I", loft: "33°" },
        { club: "AW", loft: "50°" },
      ],
      features: [
        "AI 설계 페이스로 미스히트 시에도 볼스피드 손실을 억제",
        "단조 헤드에 정밀 웨이트 포트를 배치한 투어 지향 컴팩트 헤드",
        "Apex 라인 중 조작성에 가장 특화된 상위 모델",
      ],
      specNote:
        "3I·8I·9I 로프트 미확인, PW는 자료마다 45°/48°로 상충해 표기 보류",
    },
    sources: [
      {
        label: "Swing Yard — Apex Pro 사양",
        url: "https://swingyard.com/callaway-apex-pro-irons-specs-and-lofts/",
      },
      TOUR_WINS_SOURCE,
    ],
  },
  {
    slug: "taylormade",
    name: "TaylorMade",
    tier: "A",
    note: "투어와 소비자 라인업의 균형",
    origin: "미국",
    founded: "1979",
    heritage:
      "메탈우드를 대중화한 원조 브랜드로, 드라이버 기술 경쟁을 주도해왔다. 투어 전용에 가까운 P-시리즈부터 대중형까지 라인업 폭이 넓다.",
    tour: "2025 PGA 투어 아이언 기준 17승에 사용, 브랜드 중 2위권.",
    tourWins2025: 17,
    price: { band: "중상위" },
    profile: { skill: ["중급", "상급"], priority: "균형", fitting: "권장" },
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
        "P-시리즈 중 투어와 소비자 사이를 잇는 포지셔닝",
      ],
    },
    sources: [TOUR_WINS_SOURCE],
  },
  {
    slug: "pxg",
    name: "PXG",
    tier: "A",
    note: "고성능·고가 포지셔닝의 대표 브랜드",
    origin: "미국",
    founded: "2014",
    heritage:
      "밥 파슨스가 '가격을 신경 쓰지 않고 최고 성능만 만든다'는 전제로 설립. 정밀 가공과 내부 웨이트 구조를 앞세워 단기간에 프리미엄 시장에 진입했고, 전 모델을 피팅 기반으로 판매한다.",
    price: {
      band: "최상위",
      note: "0311 P GEN7 5-G(6클럽) 세트 기준 약 US$800 선",
    },
    profile: { skill: ["중급", "상급"], priority: "관용성", fitting: "필수" },
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
        "얇은 페이스와 내부 웨이트 조합으로 반발 성능을 끌어올린 구조",
        "동일 세대에서 P(정통)·XP(강로프트) 모델을 병행해 니즈 분리",
        "전 모델 커스텀 피팅 전제 판매",
      ],
      specNote: "3I 로프트는 자료에서 확인되지 않음",
    },
    sources: [],
  },
  {
    slug: "mizuno",
    name: "Mizuno",
    tier: "A",
    note: "그레인 플로우 단조로 검증된 타구감",
    origin: "일본",
    founded: "1906",
    heritage:
      "100년 이상 축적된 그레인 플로우 단조(Grain Flow Forged) 공법으로, 아이언 타구감 평가에서 오랫동안 기준으로 꼽혀온 브랜드. 종합 스포츠 기업이면서도 골프 아이언에서는 장인형 평판을 유지한다.",
    tour: "2025 PGA 투어 아이언 기준 11승에 사용.",
    tourWins2025: 11,
    price: { band: "중상위" },
    profile: { skill: ["중급", "상급"], priority: "타구감", fitting: "권장" },
    signatureIron: {
      model: "JPX923 Tour",
      lofts: [
        { club: "3I", loft: "21°" },
        { club: "4I", loft: "24°" },
        { club: "5I", loft: "27°" },
        { club: "6I", loft: "30°" },
        { club: "7I", loft: "34°" },
        { club: "PW", loft: "46°" },
      ],
      features: [
        "일본 공장에서 1025E 마일드 카본 스틸을 그레인 플로우 단조",
        "같은 라인 Hot Metal 대비 6° 약한 정통 로프트 세팅",
        "세트 전체 오프셋 편차가 0.025인치로 매우 균일",
      ],
      specNote: "8I·9I 로프트는 자료에서 확인되지 않아 표기하지 않음",
    },
    sources: [
      {
        label: "LoftChart — JPX-923 Tour 사양",
        url: "https://loftchart.com/mizuno/jpx-923-tour-irons/",
      },
      TOUR_WINS_SOURCE,
    ],
  },
  {
    slug: "srixon",
    name: "Srixon",
    tier: "A",
    note: "브랜드 규모 대비 투어 성적이 두드러지는 실속형 프리미엄",
    origin: "일본",
    founded: "1996",
    parent: "Sumitomo Rubber Industries (Dunlop Sports)",
    heritage:
      "1901년 고베에서 설립된 스미토모 고무공업의 골프 부문에서 출발해, 오랫동안 타 브랜드의 볼을 만들다가 1996년 자체 브랜드를 출범시켰다. 브랜드명은 사명 이니셜(SRI)에 'ON'을 붙인 것이다.",
    tour: "2025 PGA 투어 아이언 기준 25승에 사용. 마케팅 규모를 감안하면 이례적으로 높은 수치다.",
    tourWins2025: 25,
    price: { band: "중가", note: "동급 성능 대비 가격이 낮다는 평가가 일관적" },
    profile: { skill: ["중급", "상급"], priority: "균형", fitting: "권장" },
    signatureIron: {
      model: "ZX7 Mk II",
      lofts: [
        { club: "5I", loft: "25°" },
        { club: "6I", loft: "28°" },
        { club: "7I", loft: "32°" },
        { club: "8I", loft: "36°" },
        { club: "9I", loft: "41°" },
        { club: "PW", loft: "46°" },
      ],
      features: [
        "3–7번은 넓은 그루브, 8번–GW는 깊고 촘촘한 그루브로 역할 분리",
        "그루브 사이 레이저 밀링으로 젖은 조건에서도 스핀 일관성 확보",
        "0–12 핸디캡을 겨냥한 플레이어스 캐비티",
      ],
      specNote: "4I 로프트는 자료에서 확인되지 않음",
    },
    sources: [
      {
        label: "GolfSource — ZX7 Mk II 사양",
        url: "https://golfsource.org/irons/srixon/zx7-mk-ii",
      },
      TOUR_WINS_SOURCE,
    ],
  },
  {
    slug: "epon",
    name: "Epon",
    tier: "A",
    note: "일본 최대 단조 공방이 자기 이름으로 내는 하이엔드 아이언",
    origin: "일본",
    founded: "1977",
    parent: "Endo Manufacturing (1950년 설립)",
    heritage:
      "1950년 니가타에서 창업한 엔도 제작소가 1977년 자사 브랜드로 내놓은 것이 EPON이다. 엔도는 캘러웨이·타이틀리스트 등 해외 대형 브랜드의 단조 아이언을 위탁 생산해온 일본 최대급 단조 공방으로, EPON은 그 제조 역량을 자기 브랜드로 보여주는 라인이다.",
    price: { band: "최상위", note: "소량 생산 커스텀 유통으로 정가 비교가 어려움" },
    profile: { skill: ["상급"], priority: "타구감", fitting: "필수" },
    signatureIron: {
      model: "AF-702",
      lofts: [],
      features: [
        "S20C 연철 단조 바디에 고강도 스테인리스 페이스를 접합(고반발 구조)",
        "토우·힐 텅스텐 웨이트로 저중심·와이드 스윗스팟 설계",
        "중상급자를 타깃으로 한 소량 생산 커스텀 모델",
      ],
      specNote:
        "클럽별 로프트가 자료마다 상이해 표기하지 않음 — 공식 스펙시트 확인 필요",
    },
    sources: [
      {
        label: "Nippon.com — 엔도 제작소 소개",
        url: "https://www.nippon.com/en/japan-topics/c11706/",
      },
      { label: "Epon Golf — Story", url: "https://epongolf.us/story/" },
    ],
  },

  // ─── B: 정통 ──────────────────────────────────────────────────
  {
    slug: "wilson",
    name: "Wilson",
    tier: "B",
    note: "메이저 최다승 헤리티지, 현재는 시장 점유보다 정통성에 방점",
    origin: "미국",
    founded: "1914",
    parent: "Wilson Sporting Goods (1903년 설립)",
    heritage:
      "1903년 애슐랜드 제조사로 출발한 윌슨이 1914년 골프 부문을 세웠다. 월터 헤이건·진 사라센과 함께한 시기를 거치며 통산 62승의 메이저 우승 장비를 배출해, 단일 브랜드 기준 역대 최다 기록을 갖고 있다. 다만 현재의 시장 존재감은 전성기와 차이가 있다.",
    price: { band: "중가" },
    profile: { skill: ["상급"], priority: "타구감", fitting: "불필요" },
    signatureIron: {
      model: "Staff Model Blade",
      lofts: [
        { club: "3I", loft: "21°" },
        { club: "7I", loft: "35°" },
        { club: "PW", loft: "47°" },
      ],
      features: [
        "8620 카본 스틸 단조 머슬백",
        "세트 전체가 정통 로프트 기준(7번 35°)으로, 최근 강로프트 흐름과 대비",
        "스크래치~로우 핸디캡을 명시적으로 겨냥한 설계",
      ],
      specNote: "4I·5I·6I·8I·9I 로프트는 자료에서 확인되지 않음",
    },
    sources: [
      { label: "Wilson Staff — Wikipedia", url: "https://en.wikipedia.org/wiki/Wilson_Staff" },
    ],
  },
  {
    slug: "bridgestone",
    name: "Bridgestone",
    tier: "B",
    note: "볼에서 쌓은 신뢰를 클럽으로 확장 중인 일본 정통 브랜드",
    origin: "일본",
    founded: "1935",
    parent: "Bridgestone Sports (모기업 1931년 설립)",
    heritage:
      "1931년 구루메에서 창업한 브리지스톤이 1935년 골프볼 생산을 시작했고, 1972년부터 클럽까지 영역을 넓혔다. 2024년 말에는 엔도 제작소와의 협업으로 제작한 프리미엄 단조 아이언·웨지를 앞세워 미국 클럽 시장에 재진입했다.",
    tour: "2025 PGA 투어 아이언 기준 1승에 사용.",
    tourWins2025: 1,
    price: { band: "중상위" },
    profile: { skill: ["중급", "상급"], priority: "타구감", fitting: "권장" },
    sources: [
      {
        label: "Bridgestone Golf — About",
        url: "https://www.bridgestonegolf.com/en-us/about",
      },
      TOUR_WINS_SOURCE,
    ],
  },

  // ─── C: 합리적 ────────────────────────────────────────────────
  {
    slug: "tour-edge",
    name: "Tour Edge",
    tier: "C",
    note: "투어 계약 대신 가격으로 승부하는 가치 지향 브랜드",
    origin: "미국",
    founded: "1986",
    heritage:
      "골프 프로 출신 데이비드 글로드가 1986년 일리노이에서 창업했고, 지금도 창업자가 R&D를 직접 이끄는 드문 사례다. 투어 선수 계약과 마케팅 지출을 줄여 확보한 여력을 가격 경쟁력으로 돌리는 전략을 유지한다.",
    tour: "투어 선수 계약을 두지 않는 것을 전략으로 명시한다.",
    price: { band: "입문" },
    profile: { skill: ["입문", "중급"], priority: "관용성", fitting: "불필요" },
    signatureIron: {
      model: "Hot Launch E524 (아이언우드)",
      lofts: [
        { club: "4I", loft: "23°" },
        { club: "5I", loft: "26°" },
        { club: "6I", loft: "29°" },
        { club: "7I", loft: "32°" },
        { club: "8I", loft: "36°" },
        { club: "9I", loft: "40°" },
        { club: "PW", loft: "44°" },
        { club: "AW", loft: "49°" },
      ],
      features: [
        "아이언 대신 아이언우드 형태로 관용성을 크게 키운 구성",
        "Hot Launch 라인 내 E(이지 런치)·C(콤보)·MAX 등으로 난이도 분리",
        "같은 라인 MAX 모델은 7번 27.5°로 매우 강한 로프트",
      ],
    },
    sources: [
      { label: "Tour Edge — About Us", url: "https://wix.touredge.com/aboutus" },
    ],
  },

  // ─── D: 입문 ──────────────────────────────────────────────────
  {
    slug: "top-flite",
    name: "Top-Flite",
    tier: "D",
    note: "완제품 세트 중심의 입문 전용 브랜드",
    origin: "미국",
    founded: "1971",
    parent: "Dick's Sporting Goods",
    heritage:
      "1971년 스팔딩 산하에서 출범해 저가 골프볼로 자리를 잡았고, 2003년 캘러웨이(1억 2,500만 달러), 2012년 딕스 스포팅 굿즈(2,000만 달러)로 소유주가 바뀌었다. 현재는 딕스의 자체 브랜드로, 딕스와 골프갤럭시에서만 유통된다.",
    price: { band: "입문", note: "드라이버·우드·아이언·퍼터·백을 묶은 완제품 세트 중심" },
    profile: { skill: ["입문"], priority: "관용성", fitting: "불필요" },
    signatureIron: {
      model: "XL 13-piece 세트",
      lofts: [],
      features: [
        "드라이버·페어웨이우드·하이브리드·6~9번 아이언·웨지·퍼터·백 구성",
        "저중심·고탄도 설계로 입문자·주니어 접근성에 집중",
        "개별 클럽이 아니라 세트 단위 구매가 기본",
      ],
      specNote: "완제품 세트 특성상 클럽별 로프트 공식 자료가 공개되지 않음",
    },
    sources: [
      { label: "Top-Flite — Wikipedia", url: "https://en.wikipedia.org/wiki/Top-Flite" },
    ],
  },
];
