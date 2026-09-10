import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { BrandFinder } from "@/components/BrandFinder";

export const metadata: Metadata = {
  title: "브랜드 찾기",
  description:
    "예산·구력·설계 성향·피팅 계획 네 가지로 나에게 맞는 골프 클럽 브랜드를 좁혀 봅니다. 추천 근거를 함께 보여줍니다.",
};

export default function FinderPage() {
  return (
    <>
      <SiteHeader current="/finder" />

      <main className="flex-1">
        <section className="border-b border-line bg-ink text-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-16 sm:py-20">
            <p className="font-mono text-xs tracking-[0.25em] text-brass uppercase">
              Find your brand
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              네 가지만 답하면
              <br />
              <span className="italic text-brass">후보가 좁혀집니다.</span>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-paper/70">
              추천 결과에는 왜 그 브랜드가 나왔는지, 그리고 무엇을 감안해야
              하는지를 함께 적습니다.
            </p>
          </div>
        </section>

        <BrandFinder />
      </main>

      <SiteFooter />
    </>
  );
}
