"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { tierOf } from "@/data/brands";
import {
  MAX_SCORE,
  QUESTIONS,
  answersFromQuery,
  answersToQuery,
  scoreBrands,
  type Answers,
} from "@/lib/finder";

export function BrandFinder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  // 공유된 결과 URL은 마운트 후 반영한다 (서버 HTML은 항상 1번 질문 상태)
  useEffect(() => {
    const read = () => {
      const a = answersFromQuery(
        new URLSearchParams(window.location.search).get("a"),
      );
      setAnswers(a);
      const answered = QUESTIONS.filter((q) => a[q.id]).length;
      setStep(answered);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const sync = useCallback((a: Answers) => {
    const q = answersToQuery(a);
    window.history.replaceState(
      null,
      "",
      q ? `${window.location.pathname}?a=${q}` : window.location.pathname,
    );
  }, []);

  const choose = useCallback(
    (id: (typeof QUESTIONS)[number]["id"], value: string) => {
      const next = { ...answers, [id]: value };
      setAnswers(next);
      sync(next);
      setStep((s) => s + 1);
    },
    [answers, sync],
  );

  const reset = useCallback(() => {
    setAnswers({});
    setStep(0);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const done = step >= QUESTIONS.length;
  const results = useMemo(
    () => (done ? scoreBrands(answers).slice(0, 3) : []),
    [done, answers],
  );

  if (done) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            이 조건에 가장 가까운 브랜드
          </h2>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-fairway underline underline-offset-4 hover:text-ink"
          >
            다시 진단하기
          </button>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {QUESTIONS.map((q) => {
            const picked = q.options.find((o) => o.value === answers[q.id]);
            return picked ? (
              <li
                key={q.id}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-mist"
              >
                {picked.label}
              </li>
            ) : null;
          })}
        </ul>

        <ol className="mt-12 space-y-5">
          {results.map((r, i) => {
            const tier = tierOf(r.brand.tier);
            const pct = Math.round((r.score / MAX_SCORE) * 100);
            return (
              <li
                key={r.brand.slug}
                className="rounded-lg border border-line bg-paper p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl text-mist">
                      {i + 1}
                    </span>
                    <div>
                      <Link
                        href={`/brands/${r.brand.slug}`}
                        className="font-display text-2xl hover:underline"
                      >
                        {r.brand.name}
                      </Link>
                      <p className="mt-1 text-sm text-mist">{r.brand.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${tier.colorClass}`}
                    >
                      {tier.code}
                    </span>
                    <span className="font-mono text-sm text-mist">
                      {pct}% 일치
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs tracking-wider text-mist uppercase">
                      맞는 점
                    </p>
                    <ul className="mt-3 space-y-2">
                      {r.reasons.map((reason) => (
                        <li
                          key={reason}
                          className="flex gap-2.5 text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fairway" />
                          {reason}
                        </li>
                      ))}
                      {r.reasons.length === 0 && (
                        <li className="text-sm text-mist">
                          조건과 겹치는 항목이 없습니다
                        </li>
                      )}
                    </ul>
                  </div>
                  {r.caveats.length > 0 && (
                    <div>
                      <p className="font-mono text-xs tracking-wider text-brass uppercase">
                        감안할 점
                      </p>
                      <ul className="mt-3 space-y-2">
                        {r.caveats.map((c) => (
                          <li
                            key={c}
                            className="flex gap-2.5 text-sm leading-relaxed text-mist"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/compare?b=${results.map((r) => r.brand.slug).join(",")}`}
            className="rounded-md bg-fairway px-6 py-3 text-sm text-paper transition-colors hover:bg-fairway-light"
          >
            이 세 브랜드 나란히 비교하기
          </Link>
          <Link
            href="/brands"
            className="rounded-md border border-line px-6 py-3 text-sm transition-colors hover:border-ink"
          >
            전체 브랜드 보기
          </Link>
        </div>

        <p className="mt-12 max-w-2xl rounded-md border border-line bg-ink/[0.02] p-4 font-mono text-xs leading-relaxed text-mist">
          * 추천은 각 브랜드의 가격 포지셔닝·구력대·설계 성향·피팅 의존도를
          답변과 맞춰 계산한 결과입니다. 이 성향 값은 측정된 사실이 아니라
          브랜드 페이지에 적힌 근거를 바탕으로 한 편집 판단이며, 실제 선택
          전에는 반드시 직접 쳐 보고 피팅을 받아 보시길 권합니다.
        </p>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      {/* 진행 표시 */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {QUESTIONS.map((item, i) => (
            <span
              key={item.id}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? "bg-fairway" : "bg-line"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-mist">
          {step + 1} / {QUESTIONS.length}
        </span>
      </div>

      <h2 className="mt-10 font-display text-3xl leading-snug tracking-tight sm:text-4xl">
        {q.title}
      </h2>
      <p className="mt-3 text-mist">{q.help}</p>

      <div className="mt-10 space-y-3">
        {q.options.map((o) => {
          const on = answers[q.id] === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(q.id, o.value)}
              className={`flex w-full items-baseline justify-between gap-4 rounded-lg border p-6 text-left transition-colors ${
                on
                  ? "border-ink bg-ink/[0.03]"
                  : "border-line hover:border-ink"
              }`}
            >
              <span>
                <span className="font-display text-xl">{o.label}</span>
                <span className="mt-1 block text-sm text-mist">{o.desc}</span>
              </span>
              <span className="shrink-0 font-mono text-mist">→</span>
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="mt-8 text-sm text-mist underline underline-offset-4 hover:text-ink"
        >
          ← 이전 질문
        </button>
      )}
    </div>
  );
}
