import { BRANDS, type Brand, type PriceBand } from "@/data/brands";

export type QuestionId = "budget" | "skill" | "priority" | "fitting";

export type Option = {
  value: string;
  label: string;
  desc: string;
};

export type Question = {
  id: QuestionId;
  title: string;
  help: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "budget",
    title: "예산은 어느 정도로 보고 계신가요?",
    help: "가격은 실제 시세가 아니라 시장 내 포지셔닝 구분입니다.",
    options: [
      {
        value: "value",
        label: "가성비 우선",
        desc: "입문·중가대에서 고르고 싶습니다",
      },
      {
        value: "mid",
        label: "중간 정도",
        desc: "중가부터 상위까지 열어 두겠습니다",
      },
      {
        value: "any",
        label: "상관없음",
        desc: "맞으면 최상위까지 고려합니다",
      },
    ],
  },
  {
    id: "skill",
    title: "구력은 어느 정도인가요?",
    help: "다루기 어려운 클럽은 실력과 무관하게 손해가 큽니다.",
    options: [
      { value: "입문", label: "입문", desc: "이제 시작했거나 라운드 경험이 적습니다" },
      { value: "중급", label: "중급", desc: "핸디캡 대략 15~25 사이입니다" },
      { value: "상급", label: "상급", desc: "핸디캡 15 이하, 구질을 다룹니다" },
    ],
  },
  {
    id: "priority",
    title: "무엇을 더 중요하게 보시나요?",
    help: "둘 다 잡는 설계는 없습니다. 무엇을 포기할지의 문제입니다.",
    options: [
      {
        value: "타구감",
        label: "타구감 · 조작성",
        desc: "손맛과 구질 조작을 우선합니다",
      },
      {
        value: "관용성",
        label: "관용성 · 거리",
        desc: "빗맞아도 결과가 덜 나빠야 합니다",
      },
      { value: "균형", label: "균형", desc: "한쪽으로 치우치지 않게" },
    ],
  },
  {
    id: "fitting",
    title: "커스텀 피팅을 받을 계획인가요?",
    help: "피팅 전제로 설계된 브랜드는 기성품으로 사면 장점이 안 살아납니다.",
    options: [
      {
        value: "yes",
        label: "받을 생각입니다",
        desc: "샤프트·라이각까지 맞추겠습니다",
      },
      {
        value: "no",
        label: "기성품으로 간단히",
        desc: "바로 살 수 있는 쪽이 좋습니다",
      },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

const BUDGET_BANDS: Record<string, PriceBand[]> = {
  value: ["입문", "중가"],
  mid: ["중가", "중상위", "상위"],
  any: ["입문", "중가", "중상위", "상위", "최상위"],
};

export type Scored = {
  brand: Brand;
  score: number;
  reasons: string[];
  caveats: string[];
};

/**
 * 점수는 프로필과 답이 맞는 항목만 더한다. 왜 추천됐는지 화면에 그대로
 * 보여주기 위해 근거 문장을 함께 만든다. 맞지 않는 축은 caveats로 남겨
 * 추천을 무조건 좋게만 포장하지 않는다.
 */
export function scoreBrands(answers: Answers): Scored[] {
  const scored = BRANDS.map((brand) => {
    const reasons: string[] = [];
    const caveats: string[] = [];
    let score = 0;

    if (answers.budget) {
      const allowed = BUDGET_BANDS[answers.budget] ?? [];
      if (allowed.includes(brand.price.band)) {
        score += 4;
        reasons.push(`가격 포지셔닝이 '${brand.price.band}'로 예산 조건에 맞습니다`);
      } else {
        caveats.push(`가격대가 '${brand.price.band}'라 예산을 넘습니다`);
      }
    }

    if (answers.skill) {
      const skill = answers.skill as "입문" | "중급" | "상급";
      if (brand.profile.skill.includes(skill)) {
        score += 3;
        reasons.push(`${brand.profile.skill.join("·")} 구력대에 적합합니다`);
      } else {
        caveats.push(`${brand.profile.skill.join("·")} 쪽에 맞춰진 설계입니다`);
      }
    }

    if (answers.priority) {
      if (brand.profile.priority === answers.priority) {
        score += 3;
        reasons.push(`설계가 '${brand.profile.priority}'을 우선합니다`);
      } else {
        caveats.push(`'${brand.profile.priority}' 쪽에 무게가 실린 설계입니다`);
      }
    }

    if (answers.fitting) {
      const wantsFitting = answers.fitting === "yes";
      const f = brand.profile.fitting;
      if (wantsFitting && (f === "필수" || f === "권장")) {
        score += 2;
        reasons.push(
          f === "필수"
            ? "피팅을 전제로 판매돼 맞춰 살 때 장점이 온전히 살아납니다"
            : "피팅과 함께 맞추면 잘 맞습니다",
        );
      } else if (!wantsFitting && (f === "불필요" || f === "권장")) {
        score += 2;
        reasons.push("기성품으로 구해도 무리가 없습니다");
      } else if (wantsFitting) {
        caveats.push("피팅 없이도 무난한 편이라 피팅 효용이 상대적으로 작습니다");
      } else {
        caveats.push("피팅을 전제로 설계돼 기성품으로 사면 장점이 덜 살아납니다");
      }
    }

    return { brand, score, reasons, caveats };
  });

  return scored.sort(
    (a, b) =>
      b.score - a.score ||
      // 동점이면 등급이 높은 쪽을 앞에 둔다
      "SABCD".indexOf(a.brand.tier) - "SABCD".indexOf(b.brand.tier),
  );
}

export const MAX_SCORE = 4 + 3 + 3 + 2;

// ── URL 직렬화 ────────────────────────────────────────────────

/** 공유 링크에 한글이 퍼센트 인코딩돼 들어가지 않도록 ASCII 슬러그를 쓴다. */
const VALUE_SLUG: Record<string, string> = {
  입문: "beginner",
  중급: "mid",
  상급: "adv",
  타구감: "feel",
  관용성: "forgive",
  균형: "balance",
};
const SLUG_VALUE: Record<string, string> = Object.fromEntries(
  Object.entries(VALUE_SLUG).map(([k, v]) => [v, k]),
);

export function answersToQuery(a: Answers): string {
  const parts = QUESTIONS.map((q) => {
    const v = a[q.id];
    return v ? (VALUE_SLUG[v] ?? v) : "";
  }).join(",");
  return parts.replace(/,+$/, "");
}

export function answersFromQuery(raw: string | null): Answers {
  if (!raw) return {};
  const parts = raw.split(",");
  const out: Answers = {};
  QUESTIONS.forEach((q, i) => {
    const slug = parts[i];
    if (!slug) return;
    const value = SLUG_VALUE[slug] ?? slug;
    if (q.options.some((o) => o.value === value)) out[q.id] = value;
  });
  return out;
}
