/**
 * 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 주입한다.
 * 미설정 시 로컬 개발 주소를 쓴다.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteName = "CLUBRANK";
export const siteDescription =
  "골프 클럽 브랜드를 헤리티지·투어 검증·가격 포지셔닝 기준으로 다섯 등급으로 나눠 보여주는 레퍼런스.";
