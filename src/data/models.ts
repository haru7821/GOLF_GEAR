import type { LoftSpec, Source } from "@/data/brands";

/**
 * 2020년 이후 출시된 아이언 모델 데이터.
 *
 * 수집 원칙
 *  - 로프트는 제조사 스펙시트를 인용한 리뷰 매체·리테일러 자료를 교차 확인해 옮겼다.
 *  - **확인되지 않은 클럽은 추정해서 채우지 않는다.** 세트 안에서 로프트 간격이
 *    규칙적이라 값을 짐작할 수 있는 경우에도 비워 두고 specNote에 적는다.
 *  - 자료끼리 값이 다르면 한쪽을 고르지 않고 충돌 사실을 specNote에 남긴다.
 *  - 연식·판매 지역(일본 내수/글로벌)에 따라 같은 이름의 모델도 스펙이 다를 수 있다.
 */
export type IronCategory =
  | "블레이드"
  | "플레이어스 캐비티"
  | "플레이어스 디스턴스"
  | "게임 임프루브먼트"
  | "맥스 게임 임프루브먼트";

export const CATEGORY_ORDER: IronCategory[] = [
  "블레이드",
  "플레이어스 캐비티",
  "플레이어스 디스턴스",
  "게임 임프루브먼트",
  "맥스 게임 임프루브먼트",
];

export const CATEGORY_DESC: Record<IronCategory, string> = {
  블레이드: "머슬백. 헤드가 가장 작고 관용성이 가장 낮다. 정확한 타격을 전제로 한다.",
  "플레이어스 캐비티":
    "블레이드에 가까운 외형에 얕은 캐비티를 더해 미스히트를 조금 덜어낸 형태.",
  "플레이어스 디스턴스":
    "컴팩트한 외형을 유지하면서 중공 구조·강한 로프트로 거리를 확보한 형태.",
  "게임 임프루브먼트": "관용성과 탄도를 우선해 헤드와 솔이 커진 형태.",
  "맥스 게임 임프루브먼트":
    "입문자 기준으로 관용성을 극단까지 올린 형태. 아이언우드처럼 변형되기도 한다.",
};

export type IronModel = {
  /** 사이트 전체에서 고유한 식별자 */
  id: string;
  brandSlug: string;
  name: string;
  /** 출시 연도. 확인되지 않으면 생략한다. */
  year?: number;
  category: IronCategory;
  /** 단조/주조 여부와 소재 등 구조 요약 */
  construction?: string;
  lofts: LoftSpec[];
  features: string[];
  /** 로프트 공백이나 자료 간 충돌을 적는다 */
  specNote?: string;
  sources?: Source[];
};

const S = (label: string, url: string): Source => ({ label, url });

const SRC = {
  titleist2025: S(
    "GolfWRX — 2025 Titleist T-Series 스펙 정리",
    "https://golfwrx.com/762836/2025-titleist-t-series-irons-breakdown-t100-t150-t250-t350-specs-tech-highlights-tour-insights/",
  ),
  golfhubTitleist: S(
    "The Golf Hub — Titleist T-Series 로프트·라이 차트",
    "https://golfhubz.com/titleist-t-series-irons-specs/",
  ),
  titleistT350Source: S(
    "GolfSource — Titleist T350 사양",
    "https://golfsource.org/irons/titleist/t350",
  ),
  titleistT350Plugged: S(
    "Plugged In Golf — 2025 T350 리뷰 (7번 29° 실측 언급)",
    "https://pluggedingolf.com/2025-titleist-t350-irons-review/",
  ),
  titleistT200Source: S(
    "GolfSource — Titleist T200(2023) 사양",
    "https://golfsource.org/irons/titleist/t200",
  ),
  pingI230: S(
    "Plugged In Golf — PING i230 리뷰(스펙 포함)",
    "https://pluggedingolf.com/ping-i230-irons-review/",
  ),
  pingI530: S(
    "LoftChart — Ping i530 로프트·라이 차트",
    "https://loftchart.com/ping/i530-irons/",
  ),
  pingModelByModel: S(
    "MyGolfSpy — PING 아이언 모델별 정리",
    "https://mygolfspy.com/buyers-guides/irons/ping-irons-model-by-model/",
  ),
  tmP790: S(
    "HoleThePutt — TaylorMade P790 로프트 차트",
    "https://holetheputt.com/taylormade-p790-specs-with-loft-chart/",
  ),
  tmP770: S(
    "LoftChart — TaylorMade P770(2023) 로프트·라이 차트",
    "https://loftchart.com/taylormade/p770-2023-irons/",
  ),
  tmP7mc: S(
    "Golfalot — TaylorMade P7MC(2023) 리뷰",
    "https://www.golfalot.com/equipment-reviews/taylormade-p7mb-23-irons-review-5234.aspx",
  ),
  callawayApex24: S(
    "GolfWRX — 2024 Callaway Apex 아이언 라인업",
    "https://www.golfwrx.com/720033/2024-callaway-apex-irons-new-apex-mb-apex-cb-apex-pro-apex-ut-irons-launched/",
  ),
  callawaySwingyard: S(
    "Swing Yard — Callaway Apex Pro 사양",
    "https://swingyard.com/callaway-apex-pro-irons-specs-and-lofts/",
  ),
  callawayTodaysGolfer24: S(
    "Today's Golfer — Apex '24 Pro·CB·MB·UT 리뷰 (모델별 7번 로프트 구분)",
    "https://www.todays-golfer.com/equipment/golf-clubs/irons/callaway/apex/callaway-apex-pro-cb-mb-ut-24-irons-review/",
  ),
  callawayGolfMonthlyPro24: S(
    "Golf Monthly — 2024 Apex Pro 아이언 리뷰",
    "https://www.golfmonthly.com/reviews/irons/callaway-2024-apex-pro-iron-review",
  ),
  callawayPreownedPro24: S(
    "Callaway Golf Pre-Owned — Apex Pro 24 스펙",
    "https://www.callawaygolfpreowned.com/iron-sets/irons-2024-apex-pro.html",
  ),
  callawayPreownedPro21: S(
    "Callaway Golf Pre-Owned — Apex Pro 21 스펙",
    "https://www.callawaygolfpreowned.com/iron-sets/irons-2021-apex-pro.html",
  ),
  mizunoPro: S(
    "MyGolfSpy — Mizuno Pro 241·243·245",
    "https://mygolfspy.com/news-opinion/mizuno-pro-241-243-and-245-irons/",
  ),
  mizuno245: S(
    "Mizuno 공식 — Pro 245 클럽 스펙",
    "https://mizunogolf.com/us/golf-clubs/mp-series/mizuno-pro-245/club-specification/",
  ),
  mizunoJpx923: S(
    "LoftChart — Mizuno JPX-923 Tour 사양",
    "https://loftchart.com/mizuno/jpx-923-tour-irons/",
  ),
  srixonZxi7: S(
    "GolfSource — Srixon ZXi7 사양",
    "https://golfsource.org/irons/srixon/zxi7",
  ),
  srixonZxi5: S(
    "GolfSource — Srixon ZXi5 사양",
    "https://golfsource.org/irons/srixon/zxi5",
  ),
  srixonZx7ii: S(
    "GolfSource — Srixon ZX7 Mk II 사양",
    "https://golfsource.org/irons/srixon/zx7-mk-ii",
  ),
  pxgGen7: S(
    "MyGolfSpy — PXG 0311 GEN7 P·XP",
    "https://mygolfspy.com/news-opinion/first-look/pxg-0311-gen7-p-and-xp-irons-have-quantumcor-technology/",
  ),
  miuraTc201: S(
    "MyGolfSpy — Miura TC-201",
    "https://mygolfspy.com/news-opinion/miura-tc-201-irons/",
  ),
  miuraMc502: S(
    "Miura Golf — MC-502 제품 페이지",
    "https://miuragolf.com/products/mc-502",
  ),
  miuraCb302: S(
    "Plugged In Golf — Miura CB-302 리뷰",
    "https://pluggedingolf.com/miura-cb-302-irons-review/",
  ),
  honmaTw767: S(
    "GolfSource — Honma TW767 Hx 사양",
    "https://golfsource.org/irons/honma/tw767-hx",
  ),
  wilsonCb: S(
    "GolfSource — Wilson Staff Model CB 사양",
    "https://golfsource.org/irons/wilson/staff-model-cb",
  ),
  wilsonBlade: S(
    "GolfSource — Wilson Staff Model Blade 사양",
    "https://golfsource.org/irons/wilson/staff-model-blade",
  ),
  wilsonDynapower: S(
    "LoftChart — Wilson Dynapower 사양",
    "https://loftchart.com/wilson/dynapower-irons/",
  ),
  bridgestone241cb: S(
    "Bridgestone Golf — 241CB 제품 페이지",
    "https://www.bridgestonegolf.com.au/product/241cb-iron/",
  ),
  tourEdge524: S(
    "Plugged In Golf — Tour Edge Hot Launch C524·E524 리뷰",
    "https://pluggedingolf.com/tour-edge-hot-launch-c524-e524-irons-review/",
  ),
  eponTour: S(
    "GolfWRX — The Precision That Is Epon",
    "https://golfwrx.com/458482/the-precision-that-is-epon/",
  ),
};

/** "33°" 형태로 통일해 두고, 파서가 숫자만 뽑아 쓴다. */
const L = (pairs: [string, string][]): LoftSpec[] =>
  pairs.map(([club, loft]) => ({ club, loft }));

export const IRON_MODELS: readonly IronModel[] = [
  // ─── Titleist ────────────────────────────────────────────────
  {
    id: "titleist-t100-2025",
    brandSlug: "titleist",
    name: "T100",
    year: 2025,
    category: "플레이어스 캐비티",
    construction: "단조 헤드 + 텅스텐 웨이트",
    lofts: L([
      ["3I", "20°"], ["4I", "23°"], ["5I", "26°"], ["6I", "29°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41°"], ["PW", "45°"], ["GW", "49°"],
    ]),
    features: [
      "T-시리즈에서 가장 정통에 가까운 로프트 세팅(7번 33°)",
      "투어 프로 사용률이 가장 높은 단일 아이언 모델",
      "미스히트 관용성을 위한 언더컷 캐비티 구조",
    ],
    sources: [SRC.titleist2025, SRC.golfhubTitleist],
  },
  {
    id: "titleist-t150-2025",
    brandSlug: "titleist",
    name: "T150",
    year: 2025,
    category: "플레이어스 캐비티",
    construction: "단조 헤드 + 텅스텐 웨이트",
    lofts: L([
      ["3I", "19°"], ["4I", "22°"], ["5I", "25°"], ["6I", "28°"],
      ["7I", "32°"], ["8I", "36°"], ["9I", "40°"], ["PW", "44°"], ["GW", "48°"],
    ]),
    features: [
      "T100과 같은 외형에 세트 전체 로프트를 1° 강하게 세팅",
      "T100보다 거리를 조금 더 원하는 투어 지향 플레이어용",
      "T100 ↔ T150 콤보 세트 구성이 가능하도록 길이를 맞춤",
    ],
    sources: [SRC.titleist2025],
  },
  {
    id: "titleist-t250-2025",
    brandSlug: "titleist",
    name: "T250",
    year: 2025,
    category: "플레이어스 디스턴스",
    lofts: L([
      ["2I", "18°"], ["3I", "20°"], ["4I", "22°"], ["5I", "24°"], ["6I", "27°"],
      ["7I", "30.5°"], ["8I", "34.5°"], ["9I", "38.5°"], ["PW", "43°"], ["GW", "48°"],
    ]),
    features: [
      "기존 T200을 대체하는 플레이어스 디스턴스 모델",
      "7번 30.5°로 T100(33°)보다 2.5° 강함",
      "탄도가 낮은 골퍼를 위한 런치 스펙(로프트를 약하게 조정한 버전) 별도 제공",
    ],
    sources: [SRC.titleist2025],
  },
  {
    id: "titleist-t350-2025",
    brandSlug: "titleist",
    name: "T350",
    year: 2025,
    category: "게임 임프루브먼트",
    lofts: L([
      ["4I", "20°"], ["6I", "26°"], ["7I", "29°"],
      ["8I", "33°"], ["9I", "38°"], ["PW", "43°"],
    ]),
    features: [
      "2025 T-시리즈 중 로프트가 가장 강하고 스핀이 가장 낮음",
      "힐·토우 내부 텅스텐 웨이트로 강한 로프트에서도 높은 탄도를 확보",
      "높은 탄도와 거리를 우선한 관용성 중심 설계",
    ],
    specNote:
      "5번만 22°/23°로 자료가 엇갈려 표기 보류(세대 차이 가능성). 7번은 한때 29°/30.5°로 충돌한다고 적어 뒀으나, 30.5°는 같은 패밀리 T200·T250의 값이 섞인 것이었고 29°가 2023·2025 양 세대와 복수 리뷰에서 일치한다",
    sources: [
      SRC.titleist2025,
      SRC.golfhubTitleist,
      SRC.titleistT350Source,
      SRC.titleistT350Plugged,
    ],
  },
  {
    id: "titleist-t200-2023",
    brandSlug: "titleist",
    name: "T200",
    year: 2023,
    category: "플레이어스 디스턴스",
    construction: "단조 SUP-10 페이스 인서트 + 폴리머 코어",
    lofts: L([["7I", "30.5°"]]),
    features: [
      "2025년 T250으로 대체된 이전 세대 플레이어스 디스턴스",
      "7번 30.5°로 같은 세대 T100(34°)보다 3.5° 강함",
      "T350의 7번 로프트가 30.5°로 잘못 알려지는 혼동의 실제 출처",
    ],
    specNote:
      "7번 외 클럽별 로프트 미확인. 7번도 일부 자료는 30°로 반올림해 적는다",
    sources: [SRC.titleistT200Source, SRC.golfhubTitleist],
  },

  // ─── Ping ────────────────────────────────────────────────────
  {
    id: "ping-blueprint-s-2023",
    brandSlug: "ping",
    name: "Blueprint S",
    year: 2023,
    category: "플레이어스 캐비티",
    construction: "단조",
    lofts: [],
    features: [
      "핑의 단조 플레이어스 아이언 (주조인 i230과 대비되는 라인)",
      "파워 스펙(강)·레트로 스펙(약) 로프트 옵션을 동일하게 제공",
      "i230·Blueprint T와 콤보 세트를 구성할 수 있도록 설계",
    ],
    specNote:
      "자료에는 'i230·Blueprint T와 로프트가 동일하다'고만 나와 클럽별 수치를 직접 확인하지 못해 비워 둠",
    sources: [SRC.pingModelByModel],
  },
  {
    id: "ping-i230-2022",
    brandSlug: "ping",
    name: "i230",
    year: 2022,
    category: "플레이어스 캐비티",
    construction: "주조 431 스테인리스",
    lofts: L([
      ["3I", "19°"], ["4I", "22.5°"], ["5I", "26°"], ["6I", "29.5°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41°"], ["PW", "45°"], ["UW", "50°"],
    ]),
    features: [
      "PW–7번 4° 간격, 7번–3번 3.5° 간격으로 거리 계단이 촘촘함",
      "스탠다드 외에 파워 스펙·레트로 스펙(약 2°) 로프트 옵션 제공",
      "피팅 데이터를 전제로 판매하는 커스텀 중심 유통",
    ],
    sources: [SRC.pingI230],
  },
  {
    id: "ping-i530-2024",
    brandSlug: "ping",
    name: "i530",
    year: 2024,
    category: "플레이어스 디스턴스",
    construction: "단조 페이스 + 중공 바디",
    lofts: L([["7I", "29°"], ["PW", "42°"]]),
    features: [
      "블레이드에 가까운 외형에 중공 구조로 거리를 확보",
      "7번 29°로 같은 브랜드 i230(33°)보다 4° 강함",
    ],
    specNote: "4·5·6·8·9번 로프트는 공개 자료에서 확인되지 않아 표기하지 않음",
    sources: [SRC.pingI530],
  },
  {
    id: "ping-g430-2023",
    brandSlug: "ping",
    name: "G430",
    year: 2023,
    category: "게임 임프루브먼트",
    lofts: L([["PW", "41°"]]),
    features: [
      "세트 전체 로프트를 강화해 약 7~10야드 거리 이득을 노린 설계",
      "강해진 로프트 탓에 41° PW를 추가해 웨지 간격을 메움",
      "파워 스펙 로프트 옵션으로 추가 거리 조정 가능",
    ],
    specNote: "PW(41°) 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.pingModelByModel],
  },

  // ─── TaylorMade ──────────────────────────────────────────────
  {
    id: "taylormade-p7mb-2023",
    brandSlug: "taylormade",
    name: "P7MB",
    year: 2023,
    category: "블레이드",
    construction: "단조 머슬백",
    lofts: L([["7I", "34°"], ["PW", "47°"]]),
    features: [
      "P-시리즈에서 가장 얇은 톱라인과 가장 적은 오프셋",
      "P7MC와 맞추기 위해 이전 세대보다 로프트를 강화",
    ],
    specNote:
      "자료에 'P7MC와 로프트가 같다'고 나오지만 클럽별 수치를 직접 확인하지 못해 7번·PW만 표기",
    sources: [SRC.tmP7mc],
  },
  {
    id: "taylormade-p7mc-2023",
    brandSlug: "taylormade",
    name: "P7MC",
    year: 2023,
    category: "플레이어스 캐비티",
    construction: "단조 컴팩트 캐비티",
    lofts: L([
      ["3I", "20°"], ["4I", "23°"], ["5I", "26°"], ["6I", "30°"],
      ["7I", "34°"], ["8I", "38°"], ["9I", "42.5°"], ["PW", "47°"],
    ]),
    features: [
      "블레이드에 가까운 외형에 얕은 캐비티로 최소한의 관용성 확보",
      "P790·P770보다 정통에 가까운 로프트(7번 34°)",
    ],
    sources: [SRC.tmP7mc],
  },
  {
    id: "taylormade-p770-2023",
    brandSlug: "taylormade",
    name: "P770",
    year: 2023,
    category: "플레이어스 디스턴스",
    construction: "중공 바디 + 단조 페이스 인서트 + 텅스텐 웨이트",
    lofts: L([
      ["3I", "20.5°"], ["4I", "23°"], ["5I", "26°"], ["6I", "29.5°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41.5°"], ["PW", "46°"], ["AW", "51°"],
    ]),
    features: [
      "P790보다 얇은 톱라인·적은 오프셋·짧은 블레이드 길이",
      "P790 대비 세트 전체가 2~3° 약한 정통 로프트",
      "언더컷 캐비티 + 텅스텐으로 관용성과 조작성을 절충",
    ],
    sources: [SRC.tmP770],
  },
  {
    id: "taylormade-p790-2023",
    brandSlug: "taylormade",
    name: "P790",
    year: 2023,
    category: "플레이어스 디스턴스",
    construction: "중공 바디 + SpeedFoam 충전",
    lofts: L([
      ["3I", "19°"], ["4I", "21°"], ["5I", "23.5°"], ["6I", "26.5°"],
      ["7I", "30.5°"], ["8I", "35°"], ["9I", "40°"], ["PW", "45°"], ["AW", "50°"],
    ]),
    features: [
      "P-시리즈 중 오프셋이 가장 크고 헤드가 가장 큼",
      "7번 30.5°로 P770(33°)보다 2.5° 강함",
      "중공 바디에 폼을 채워 얇은 페이스의 타감을 보정",
    ],
    sources: [SRC.tmP790],
  },

  // ─── Callaway ────────────────────────────────────────────────
  {
    id: "callaway-apex-mb-2024",
    brandSlug: "callaway",
    name: "Apex MB",
    year: 2024,
    category: "블레이드",
    construction: "1025 카본 스틸 일체 단조",
    lofts: L([["7I", "34°"]]),
    features: [
      "바디와 페이스를 1025 카본 스틸 한 덩어리로 단조",
      "세트 전체에 걸쳐 무게중심을 점진적으로 이동",
      "같은 세대 Apex Pro(33°)보다 1° 약한 정통 로프트",
    ],
    specNote: "7번(34°) 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.callawayTodaysGolfer24, SRC.callawayApex24],
  },
  {
    id: "callaway-apex-cb-2024",
    brandSlug: "callaway",
    name: "Apex CB",
    year: 2024,
    category: "플레이어스 캐비티",
    construction: "1025 카본 스틸 5단계 단조 + 토우 MIM 웨이트",
    lofts: L([["7I", "34°"]]),
    features: [
      "1025 카본 스틸을 5단계 공정으로 단조",
      "토우 쪽 MIM 웨이트와 점진적 무게중심 설계",
      "투어 프로와 상급자를 겨냥한 투어 캐비티백",
    ],
    specNote: "7번(34°) 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.callawayTodaysGolfer24, SRC.callawayApex24],
  },
  {
    id: "callaway-apex-pro-2024",
    brandSlug: "callaway",
    name: "Apex Pro",
    year: 2024,
    category: "플레이어스 디스턴스",
    construction: "중공 바디 + 단조 455 페이스 컵(롱)·1025 페이스 플레이트(숏)",
    lofts: L([
      ["3I", "20.5°"], ["7I", "33°"], ["8I", "37°"], ["9I", "41°"],
      ["PW", "45°"], ["AW", "50°"],
    ]),
    features: [
      "Apex 아이언 최초로 중공 바디 구조를 적용",
      "롱아이언은 단조 455 페이스 컵, 숏아이언은 1025 페이스 플레이트로 분리 설계",
      "같은 세대 CB·MB(7번 34°)보다 1° 강한 세팅",
    ],
    specNote:
      "4·5·6번 미확인. 확인된 6개 값은 Apex Pro 21과 전부 일치한다. 한동안 '3번 19°/20.5°, 7번 33°/34°, PW 45°/48°로 충돌'이라 적어 뒀으나, 재조사 결과 34°는 같은 세대 CB·MB의 값이 Pro에 잘못 섞인 것이었다",
    sources: [
      SRC.callawayGolfMonthlyPro24,
      SRC.callawayTodaysGolfer24,
      SRC.callawayPreownedPro24,
    ],
  },
  {
    id: "callaway-apex-pro-2021",
    brandSlug: "callaway",
    name: "Apex Pro 21",
    year: 2021,
    category: "플레이어스 디스턴스",
    construction: "단조 바디 + 우레탄 마이크로스피어",
    lofts: L([
      ["3I", "20.5°"], ["4I", "23°"], ["5I", "26°"], ["6I", "29°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41°"], ["PW", "45°"], ["AW", "50°"],
    ]),
    features: [
      "2024 세대 이전의 Apex Pro. 로프트 구성은 24와 동일한 것으로 확인됨",
      "여러 스펙 페이지가 21과 24를 한 표에 섞어 놓아 혼동의 원인이 됐다",
    ],
    sources: [SRC.callawayPreownedPro21],
  },

  // ─── Mizuno ──────────────────────────────────────────────────
  {
    id: "mizuno-pro-241-2024",
    brandSlug: "mizuno",
    name: "Pro 241",
    year: 2024,
    category: "블레이드",
    construction: "그레인 플로우 단조 머슬백",
    lofts: L([["3I", "20°"], ["7I", "34°"], ["PW", "47°"]]),
    features: [
      "Pro 3종 중 헤드가 가장 작은 순수 머슬백",
      "최상급 볼스트라이커를 전제로 한 최소 관용성 설계",
    ],
    specNote:
      "4·5·6·8·9번 로프트 미확인. PW도 자료에 따라 46°/47°로 엇갈림",
    sources: [SRC.mizunoPro],
  },
  {
    id: "mizuno-pro-243-2024",
    brandSlug: "mizuno",
    name: "Pro 243",
    year: 2024,
    category: "플레이어스 캐비티",
    construction: "그레인 플로우 단조 캐비티",
    lofts: L([
      ["4I", "22°"], ["5I", "25°"], ["6I", "28°"], ["7I", "31.5°"], ["PW", "45°"],
    ]),
    features: [
      "241 머슬백과 245 디스턴스 사이를 메우는 중간 모델",
      "어드레스에서는 블레이드처럼 보이되 얕은 캐비티로 미스히트를 보완",
    ],
    specNote: "8·9번 로프트는 확인되지 않아 표기하지 않음",
    sources: [SRC.mizunoPro],
  },
  {
    id: "mizuno-pro-245-2024",
    brandSlug: "mizuno",
    name: "Pro 245",
    year: 2024,
    category: "플레이어스 디스턴스",
    construction: "그레인 플로우 단조 + 중공 구조",
    lofts: L([
      ["2I", "16.5°"], ["3I", "19°"], ["4I", "21.5°"], ["5I", "24°"], ["6I", "27°"],
      ["7I", "30°"], ["8I", "34°"], ["9I", "38°"], ["PW", "43°"], ["GW", "48°"],
    ]),
    features: [
      "Pro 3종 중 가장 관용성이 높은 플레이어스 디스턴스",
      "7번 30°로 같은 라인 241(34°)보다 4° 강함",
      "2번 아이언(16.5°)까지 갖춘 긴 세트 구성",
    ],
    sources: [SRC.mizuno245],
  },
  {
    id: "mizuno-jpx923-tour-2022",
    brandSlug: "mizuno",
    name: "JPX923 Tour",
    year: 2022,
    category: "플레이어스 캐비티",
    construction: "1025E 마일드 카본 스틸 그레인 플로우 단조",
    lofts: L([
      ["3I", "21°"], ["4I", "24°"], ["5I", "27°"], ["6I", "30°"], ["7I", "34°"], ["PW", "46°"],
    ]),
    features: [
      "일본 공장에서 1025E 마일드 카본 스틸을 그레인 플로우 단조",
      "같은 라인 Hot Metal 대비 6° 약한 정통 로프트",
      "세트 전체 오프셋 편차가 0.025인치로 매우 균일",
    ],
    specNote: "8·9번 로프트는 확인되지 않아 표기하지 않음",
    sources: [SRC.mizunoJpx923],
  },

  // ─── Srixon ──────────────────────────────────────────────────
  {
    id: "srixon-zxi7-2025",
    brandSlug: "srixon",
    name: "ZXi7",
    year: 2025,
    category: "플레이어스 캐비티",
    construction: "단조 플레이어스 캐비티",
    lofts: L([
      ["3I", "20°"], ["4I", "22°"], ["5I", "25°"], ["6I", "28°"],
      ["7I", "32°"], ["8I", "36°"], ["9I", "41°"], ["PW", "46°"],
    ]),
    features: [
      "ZX7 Mk II를 잇는 플레이어스 캐비티",
      "ZXi5와 길이·로프트를 맞춰 콤보 세트 구성이 쉬움",
    ],
    sources: [SRC.srixonZxi7],
  },
  {
    id: "srixon-zxi5-2025",
    brandSlug: "srixon",
    name: "ZXi5",
    year: 2025,
    category: "플레이어스 디스턴스",
    lofts: L([
      ["4I", "22°"], ["5I", "24°"], ["6I", "27°"],
      ["7I", "31°"], ["8I", "35°"], ["9I", "39°"], ["PW", "44°"],
    ]),
    features: [
      "ZXi7보다 1° 강한 로프트와 큰 헤드로 관용성 확보",
      "롱아이언은 ZXi5, 스코어링은 ZXi7으로 섞는 조합이 일반적",
    ],
    sources: [SRC.srixonZxi5],
  },
  {
    id: "srixon-zx7-mkii-2023",
    brandSlug: "srixon",
    name: "ZX7 Mk II",
    year: 2023,
    category: "플레이어스 캐비티",
    construction: "단조 + 레이저 밀링 그루브",
    lofts: L([
      ["5I", "25°"], ["6I", "28°"], ["7I", "32°"], ["8I", "36°"], ["9I", "41°"], ["PW", "46°"],
    ]),
    features: [
      "3–7번은 넓은 그루브, 8번–GW는 깊고 촘촘한 그루브로 역할 분리",
      "그루브 사이 레이저 밀링으로 젖은 조건에서도 스핀 일관성 확보",
      "0–12 핸디캡을 겨냥한 플레이어스 캐비티",
    ],
    specNote: "4번 로프트는 확인되지 않음",
    sources: [SRC.srixonZx7ii],
  },
  {
    id: "srixon-zx5-mkii-2023",
    brandSlug: "srixon",
    name: "ZX5 Mk II",
    year: 2023,
    category: "플레이어스 디스턴스",
    lofts: L([["7I", "31°"], ["PW", "44°"]]),
    features: [
      "ZX7 Mk II와 같은 세대의 관용성 중심 모델",
      "7번 31°로 ZX7 Mk II(32°)보다 1° 강함",
    ],
    specNote: "7번·PW 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.srixonZxi5],
  },

  // ─── PXG ─────────────────────────────────────────────────────
  {
    id: "pxg-0311-p-gen6-2023",
    brandSlug: "pxg",
    name: "0311 P GEN6",
    year: 2023,
    category: "플레이어스 디스턴스",
    construction: "중공 바디 + 초박형 페이스",
    lofts: L([
      ["4I", "20.5°"], ["5I", "23°"], ["6I", "26°"], ["7I", "30°"],
      ["8I", "34°"], ["9I", "39°"], ["PW", "44°"], ["GW", "49°"],
    ]),
    features: [
      "초박형 페이스와 내부 웨이트로 반발 성능을 끌어올린 구조",
      "P(정통)·XP(강로프트) 모델을 병행해 니즈를 분리",
      "전 모델 커스텀 피팅 전제 판매",
    ],
    specNote: "3번 로프트는 확인되지 않음",
  },
  {
    id: "pxg-0311-p-gen7-2024",
    brandSlug: "pxg",
    name: "0311 P GEN7",
    year: 2024,
    category: "플레이어스 디스턴스",
    construction: "중공 바디 + 0.050인치(약 1.27mm) 가변 초박형 페이스",
    lofts: L([["7I", "30°"]]),
    features: [
      "페이스 두께 0.050인치로 이전 세대보다 15% 얇게 가공",
      "QuantumCOR·티타늄 베젤 기술 적용",
      "이전 세대 대비 관성모멘트 3.1% 증가, 비거리 약 4야드 증가로 발표",
    ],
    specNote:
      "제조사는 '길이·로프트 스펙이 이전 세대에서 그대로 이어진다'고 밝혔지만 클럽별 수치를 직접 확인하지 못해 7번만 표기",
    sources: [SRC.pxgGen7],
  },
  {
    id: "pxg-0311-xp-gen7-2024",
    brandSlug: "pxg",
    name: "0311 XP GEN7",
    year: 2024,
    category: "게임 임프루브먼트",
    lofts: L([["7I", "27°"]]),
    features: [
      "중·상급자용 P보다 3° 강한 7번 27° 세팅",
      "거리와 관용성을 함께 노린 라인",
    ],
    specNote: "7번(27°) 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.pxgGen7],
  },

  // ─── Miura ───────────────────────────────────────────────────
  {
    id: "miura-tc-201-2020",
    brandSlug: "miura",
    name: "TC-201",
    year: 2020,
    category: "플레이어스 캐비티",
    construction: "연철 단조",
    lofts: L([
      ["3I", "21°"], ["4I", "23°"], ["5I", "26°"], ["6I", "29°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41°"], ["PW", "46°"],
    ]),
    features: [
      "머슬백에 가까운 외형에 관용성을 더한 투어 캐비티",
      "정통 로프트(7번 33°, PW 46°) 유지",
    ],
    sources: [SRC.miuraTc201],
  },
  {
    id: "miura-mc-502-2021",
    brandSlug: "miura",
    name: "MC-502",
    year: 2021,
    category: "플레이어스 캐비티",
    construction: "연철 단조",
    lofts: L([
      ["3I", "21°"], ["4I", "23°"], ["5I", "26°"], ["6I", "29°"],
      ["7I", "33°"], ["8I", "37°"], ["9I", "41°"], ["PW", "46°"],
    ]),
    features: [
      "블레이드의 외형과 성능에 소형 캐비티백의 관용성을 결합",
      "TC-201과 동일한 로프트 구성",
    ],
    sources: [SRC.miuraMc502],
  },
  {
    id: "miura-cb-302-2023",
    brandSlug: "miura",
    name: "CB-302",
    year: 2023,
    category: "플레이어스 캐비티",
    construction: "연철 단조",
    lofts: L([["4I", "22°"], ["PW", "44°"]]),
    features: [
      "미우라 공장에서 만든 것 중 가장 넓은 솔 폭(7번 기준 19mm)",
      "이전 모델 CB-301과 동일한 로프트 구성",
    ],
    specNote: "5~9번·7번 로프트는 공개 자료에서 확인되지 않음",
    sources: [SRC.miuraCb302],
  },

  // ─── Honma ───────────────────────────────────────────────────
  {
    id: "honma-tw757-vx-2022",
    brandSlug: "honma",
    name: "TW757 Vx",
    year: 2022,
    category: "플레이어스 캐비티",
    lofts: L([
      ["4I", "21°"], ["5I", "24°"], ["6I", "27°"], ["7I", "30°"],
      ["8I", "34°"], ["9I", "38°"], ["PW", "43°"], ["GW", "49°"],
    ]),
    features: [
      "저중심 설계로 강한 로프트에서도 높은 탄도를 유지",
      "B(블레이드)·Vx(캐비티)·P(플레이어스 디스턴스) 3종 중 중간",
      "자사 VIZARD 샤프트와의 조합을 전제로 한 매칭 설계",
    ],
  },
  {
    id: "honma-tw767-hx-2025",
    brandSlug: "honma",
    name: "TW767 Hx",
    year: 2025,
    category: "게임 임프루브먼트",
    lofts: L([["7I", "28°"], ["PW", "42°"]]),
    features: [
      "TW767 세대에서 중·고핸디캡을 겨냥한 관용성 모델",
      "TW757 3종에서 TW767은 Tour V·Vx·Px·Hx 4종으로 세분화",
    ],
    specNote: "7번·PW 외 클럽별 로프트는 확인되지 않음",
    sources: [SRC.honmaTw767],
  },

  // ─── Wilson ──────────────────────────────────────────────────
  {
    id: "wilson-staff-model-blade-2024",
    brandSlug: "wilson",
    name: "Staff Model Blade",
    year: 2024,
    category: "블레이드",
    construction: "8620 카본 스틸 단조 머슬백",
    lofts: L([["3I", "21°"], ["7I", "35°"], ["PW", "47°"]]),
    features: [
      "8620 카본 스틸 단조 머슬백",
      "세트 전체가 정통 로프트(7번 35°)로, 최근 강로프트 흐름과 대비",
      "스크래치~로우 핸디캡을 명시적으로 겨냥",
    ],
    specNote: "4·5·6·8·9번 로프트는 확인되지 않음",
    sources: [SRC.wilsonBlade],
  },
  {
    id: "wilson-staff-model-cb-2024",
    brandSlug: "wilson",
    name: "Staff Model CB",
    year: 2024,
    category: "플레이어스 캐비티",
    construction: "단조 캐비티백",
    lofts: L([
      ["4I", "22°"], ["5I", "25°"], ["6I", "28.5°"], ["7I", "32°"],
      ["8I", "36°"], ["9I", "40.5°"], ["PW", "45°"],
    ]),
    features: [
      "Staff Model Blade보다 3° 강한 7번(32°)",
      "블레이드와 콤보로 쓸 수 있도록 같은 세대에서 함께 출시",
    ],
    sources: [SRC.wilsonCb],
  },
  {
    id: "wilson-dynapower-2023",
    brandSlug: "wilson",
    name: "Dynapower",
    year: 2023,
    category: "게임 임프루브먼트",
    construction: "주조",
    lofts: L([["4I", "18°"], ["7I", "27°"], ["PW", "42°"]]),
    features: [
      "주조 게임 임프루브먼트 모델",
      "7번 27°로 같은 브랜드 Staff Model Blade(35°)보다 8° 강함",
    ],
    specNote: "5·6·8·9번 로프트는 확인되지 않음",
    sources: [SRC.wilsonDynapower],
  },

  // ─── Bridgestone ─────────────────────────────────────────────
  {
    id: "bridgestone-241cb-2024",
    brandSlug: "bridgestone",
    name: "241CB",
    year: 2024,
    category: "플레이어스 캐비티",
    construction: "연철 단조 (텅스텐 등 복합 소재 미사용)",
    lofts: L([["5I", "25°"], ["7I", "32°"], ["PW", "46°"]]),
    features: [
      "텅스텐 등 복합 소재를 쓰지 않은 순수 연철 단조",
      "엔도 제작소와의 협업으로 일본에서 생산",
      "5번 헤드가 동급에서 가장 컴팩트한 축",
    ],
    specNote: "4·6·8·9번 로프트는 확인되지 않음",
    sources: [SRC.bridgestone241cb],
  },

  // ─── Tour Edge ───────────────────────────────────────────────
  {
    id: "tour-edge-hot-launch-c524-2024",
    brandSlug: "tour-edge",
    name: "Hot Launch C524",
    year: 2024,
    category: "게임 임프루브먼트",
    construction: "연질 431 스테인리스 주조",
    lofts: L([
      ["4I", "20°"], ["5I", "23°"], ["6I", "26°"], ["7I", "29°"],
      ["8I", "33°"], ["9I", "38°"], ["PW", "43°"], ["AW", "48°"],
    ]),
    features: [
      "컴피티션 스펙 — 얇은 톱라인과 절제된 오프셋의 정통 캐비티백",
      "2024년 2월 발표, 3월 출시",
      "커스텀 피팅을 기본으로 제공하는 것이 이 시리즈의 특징",
    ],
    specNote: "PW는 구성에 따라 44°로 표기된 자료도 있음",
    sources: [SRC.tourEdge524],
  },
  {
    id: "tour-edge-hot-launch-e524-2024",
    brandSlug: "tour-edge",
    name: "Hot Launch E524 (아이언우드)",
    year: 2024,
    category: "맥스 게임 임프루브먼트",
    lofts: L([
      ["4I", "23°"], ["5I", "26°"], ["6I", "29°"], ["7I", "32°"],
      ["8I", "36°"], ["9I", "40°"], ["PW", "44°"], ["AW", "49°"],
    ]),
    features: [
      "익스트림 스펙 — 얕은 페이스와 큰 오프셋, 하이브리드형 롱아이언",
      "아이언 대신 아이언우드 형태로 관용성을 크게 키운 구성",
      "같은 라인 MAX 모델은 7번 27.5°로 훨씬 강한 로프트",
    ],
    sources: [SRC.tourEdge524],
  },

  // ─── Epon ────────────────────────────────────────────────────
  {
    id: "epon-af-tour-cb",
    brandSlug: "epon",
    name: "AF-Tour CB",
    category: "플레이어스 캐비티",
    construction: "일본산 S20C 카본 스틸 단조",
    lofts: L([["6I", "32°"], ["PW", "48°"]]),
    features: [
      "일본산 S20C 카본 스틸 단조",
      "4° 등간격의 정통 로프트 구성",
      "AF-Tour MB II와 콤보 세트로 제공",
    ],
    specNote: "출시 연도와 나머지 클럽 로프트는 확인되지 않음",
    sources: [SRC.eponTour],
  },
  {
    id: "epon-af-707",
    brandSlug: "epon",
    name: "AF-707",
    category: "플레이어스 디스턴스",
    construction: "포켓 캐비티 단조",
    lofts: [],
    features: [
      "이전 세대의 중공 구조에서 포켓 캐비티로 전환",
      "로프트별로 무게중심 위치를 개별 설계해 헤드를 더 컴팩트하게 구성",
    ],
    specNote: "출시 연도와 클럽별 로프트가 확인되지 않음",
    sources: [SRC.eponTour],
  },
];

export const modelsOf = (brandSlug: string) =>
  IRON_MODELS.filter((m) => m.brandSlug === brandSlug);

export const modelById = (id: string) => IRON_MODELS.find((m) => m.id === id);
