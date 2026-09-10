import type { NextConfig } from "next";

/**
 * GitHub Pages 배포용 설정.
 *
 * Pages는 정적 파일만 서빙하므로 GITHUB_PAGES=true일 때만 정적 export로
 * 전환한다. 로컬에서는 이 값이 없어 `next dev`/`next start`가 평소대로 돈다.
 *
 * 사이트가 https://<user>.github.io/GOLF_GEAR/ 처럼 하위 경로에 올라가기
 * 때문에 basePath가 필요하다. next/link와 정적 자산 경로는 Next가 알아서
 * 접두사를 붙이고, 클라이언트 쪽 URL 동기화는 window.location.pathname을
 * 그대로 쓰므로 basePath가 유지된다.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
