import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { BrandExplorer } from "@/components/BrandExplorer";
import { BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  title: "브랜드 등급 전체 보기",
  description:
    "골프 클럽 브랜드를 S부터 D까지 다섯 등급으로 나눠 정리한 전체 목록. 등급·원산지·가격대로 좁혀 볼 수 있습니다.",
};

export default function BrandsPage() {
  return (
    <>
      <SiteHeader current="/brands" />

      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-6 pt-20 pb-12">
          <p className="font-mono text-xs tracking-[0.2em] text-mist uppercase">
            All Brands
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            브랜드 등급
          </h1>
          <p className="mt-4 max-w-xl text-mist">
            총 {BRANDS.length}개 브랜드를 다섯 등급으로 나눠 정리했습니다.
            등급·원산지·가격대로 좁혀 보고, 각 브랜드 페이지에서 등급 근거와
            대표 아이언 사양을 확인하세요.
          </p>
        </section>

        <BrandExplorer />
      </main>

      <SiteFooter />
    </>
  );
}
