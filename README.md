# CLUBRANK

골프 클럽 브랜드를 헤리티지 · 투어 검증 · 가격 포지셔닝 기준으로 다섯 등급(S~D)으로 나눠 보여주는 레퍼런스 사이트.

## 스택

- Next.js 16 (App Router) / React 19 / TypeScript
- Tailwind CSS v4 (CSS 기반 테마 토큰, `src/app/globals.css`)
- 폰트: Fraunces(디스플레이) + Geist Sans/Mono(본문·수치)

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드 (전 페이지 정적 생성)
npm run lint
```

## 배포

`main` 또는 `claude/golf-club-brand-site-cphzks`에 푸시하면
`.github/workflows/deploy.yml`이 정적 export를 만들어 GitHub Pages에 올린다.
(리포지터리 Settings → Pages → Source가 **GitHub Actions**여야 한다.)

- `GITHUB_PAGES=true`일 때만 `output: "export"`로 전환된다. 로컬에서는 이 값이
  없으므로 `next dev`/`next start`가 평소대로 동작한다.
- 사이트가 `/<repo>` 하위 경로에 올라가므로 `PAGES_BASE_PATH`로 basePath를 넣는다.
  두 값 모두 워크플로가 `actions/configure-pages`의 출력에서 채운다.
- `NEXT_PUBLIC_SITE_URL`은 `metadataBase`·`sitemap.xml`·`robots.txt`에 함께 쓰인다.

로컬에서 배포본을 그대로 확인하려면:

```bash
GITHUB_PAGES=true PAGES_BASE_PATH=/GOLF_GEAR \
  NEXT_PUBLIC_SITE_URL=https://<user>.github.io/GOLF_GEAR npm run build
# out/ 을 <서버루트>/GOLF_GEAR 로 두고 정적 서버로 서빙
```

## 구조

```
src/
  app/
    page.tsx              홈 (히어로 · 등급 체계 · S등급 브랜드 · 선정 기준)
    brands/page.tsx       등급별 전체 브랜드 목록
    brands/[slug]/        브랜드 상세 (등급 근거 · 대표 아이언 사양 · 출처)
    sitemap.ts robots.ts  SEO
  components/Logo.tsx     워드마크 + 모노그램
  data/brands.ts          등급 체계와 브랜드 데이터 (단일 소스)
  lib/site.ts             사이트 URL·이름·설명 상수
```

브랜드를 추가하려면 `src/data/brands.ts`의 `BRANDS` 배열에 항목을 넣으면 된다.
목록·상세·사이트맵이 모두 이 배열에서 파생되므로 다른 파일은 손대지 않아도 된다.

## 데이터 원칙

- **확인되지 않은 수치는 추정해서 채우지 않는다.** 공백은 `specNote`에 명시하고
  화면에도 경고로 노출한다.
- **등급과 가격 밴드는 사실이 아니라 편집 판단이다.** 근거를 `heritage`/`tour`/
  `price`에 남기고, 참고한 자료는 `sources`에 링크로 단다.
- **제조사 로고·제품 이미지는 사용하지 않는다.** 주요 브랜드의 프레스킷은
  대부분 에디토리얼 용도 한정이거나 승인·로그인이 필요해, 제3자 비교 사이트의
  사용 허용 여부가 확인되지 않았다. 브랜드 표기는 텍스트 워드마크로만 한다.

브랜드 아이덴티티(컬러·타이포·톤앤매너)는 [`BRAND.md`](./BRAND.md) 참고.
