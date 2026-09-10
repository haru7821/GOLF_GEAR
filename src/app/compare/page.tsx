import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { BrandCompare } from "@/components/BrandCompare";

export const metadata: Metadata = {
  title: "브랜드 비교",
  description:
    "골프 클럽 브랜드를 최대 3개까지 나란히 놓고 등급·헤리티지·투어 성적·가격·아이언 사양을 비교합니다.",
};

export default function ComparePage() {
  return (
    <>
      <SiteHeader current="/compare" />

      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-6 pt-20 pb-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">
            Compare
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            브랜드 비교
          </h1>
          <p className="mt-4 max-w-xl text-mist">
            최대 3개까지 나란히 놓고 등급 근거를 한 화면에서 견줘 봅니다.
            선택은 주소에 남으니 그대로 공유할 수 있습니다.
          </p>
        </section>

        <BrandCompare />
      </main>

      <SiteFooter />
    </>
  );
}
