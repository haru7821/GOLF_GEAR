import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { BRANDS, tierOf } from "@/data/brands";
import { CATEGORY_DESC, CATEGORY_ORDER, modelsOf, type IronModel } from "@/data/models";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return { title: "브랜드를 찾을 수 없음" };
  return {
    title: brand.name,
    description: `${brand.name} — ${tierOf(brand.tier).labelKo} 등급. ${brand.note}`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();
  const tier = tierOf(brand.tier);
  // 관용성이 낮은 쪽(블레이드)부터, 같은 성격이면 최신순
  const models = [...modelsOf(brand.slug)].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
      (b.year ?? 0) - (a.year ?? 0),
  );

  return (
    <>
      <SiteHeader current="/brands" />

      <main className="flex-1">
        <section className="mx-auto max-w-[720px] px-6 py-24">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm ${tier.colorClass}`}
          >
            {tier.code}
          </span>
          <h1 className="mt-6 font-display text-5xl tracking-tight">
            {brand.name}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mist">
            {tier.labelKo} · {tier.label}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-mist">
            {brand.note}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs uppercase text-mist">
                원산지
              </dt>
              <dd className="mt-1">{brand.origin}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-mist">
                설립
              </dt>
              <dd className="mt-1">{brand.founded}</dd>
            </div>
            {brand.parent && (
              <div>
                <dt className="font-mono text-xs uppercase text-mist">
                  소속
                </dt>
                <dd className="mt-1">{brand.parent}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs uppercase text-mist">
                가격 포지셔닝
              </dt>
              <dd className="mt-1">{brand.price.band}</dd>
            </div>
          </dl>

          <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-xl">헤리티지</h2>
            <p className="mt-3 leading-relaxed text-mist">
              {brand.heritage}
            </p>
          </div>

          {brand.tour && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl">투어 · 검증</h2>
              <p className="mt-3 leading-relaxed text-mist">{brand.tour}</p>
            </div>
          )}

          {brand.price.note && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl">가격</h2>
              <p className="mt-3 leading-relaxed text-mist">
                {brand.price.note}
              </p>
            </div>
          )}

          {models.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-xl">
                  아이언 모델 <span className="text-mist">{models.length}</span>
                </h2>
                <Link
                  href="/lofts"
                  className="text-sm text-fairway underline underline-offset-4 hover:text-ink"
                >
                  로프트 비교 차트에서 보기 →
                </Link>
              </div>
              <p className="mt-2 text-sm text-mist">
                2020년 이후 출시 모델 기준. 관용성이 낮은 순서로 정렬했습니다.
              </p>

              <div className="mt-8 space-y-10">
                {models.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
            </div>
          )}

          {brand.sources.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl">출처</h2>
              <ul className="mt-4 space-y-2">
                {brand.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-fairway underline underline-offset-4 hover:text-ink"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-16 rounded-md border border-line bg-ink/[0.02] p-4 font-mono text-xs leading-relaxed text-mist">
            * 사양은 리뷰 매체·리테일러 자료를 교차 확인해 작성했으나 연식과
            판매 지역에 따라 실제와 차이가 있을 수 있습니다. 등급과 가격
            포지셔닝은 사실이 아니라 편집 판단이며, 그 근거를 위 항목에
            남겼습니다. 제조사 로고·제품 이미지는 사용 조건이 브랜드별로
            확인되지 않아 표기하지 않았습니다.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function ModelCard({ model }: { model: IronModel }) {
  return (
    <article className="rounded-lg border border-line p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-2xl">{model.name}</h3>
        <p className="font-mono text-xs text-mist">
          {model.year ? `${model.year}년` : "출시 연도 미확인"}
        </p>
      </div>

      <p className="mt-2 text-sm text-ink">{model.category}</p>
      <p className="mt-1 text-xs leading-relaxed text-mist">
        {CATEGORY_DESC[model.category]}
      </p>

      {model.construction && (
        <p className="mt-4 text-sm leading-relaxed text-mist">
          <span className="font-mono text-[11px] tracking-wider uppercase">
            구조
          </span>{" "}
          {model.construction}
        </p>
      )}

      {model.lofts.length > 0 ? (
        <div className="mt-5 overflow-x-auto">
          <table
            className="w-full min-w-[420px] border-collapse font-mono text-sm"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <caption className="sr-only">{model.name} 클럽별 로프트</caption>
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase text-mist">
                {model.lofts.map((l) => (
                  <th key={l.club} className="py-2 pr-4 font-normal">
                    {l.club}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {model.lofts.map((l) => (
                  <td key={l.club} className="py-2 pr-4">
                    {l.loft}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 font-mono text-xs text-mist">
          공개 자료에서 클럽별 로프트를 확인하지 못했습니다
        </p>
      )}

      <ul className="mt-5 space-y-2">
        {model.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm leading-relaxed text-mist">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fairway" />
            {f}
          </li>
        ))}
      </ul>

      {model.specNote && (
        <p className="mt-5 font-mono text-xs leading-relaxed text-brass">
          ⚠ {model.specNote}
        </p>
      )}

      {model.sources && model.sources.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
          {model.sources.map((src) => (
            <li key={src.url}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-fairway underline underline-offset-2 hover:text-ink"
              >
                {src.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
