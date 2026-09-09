type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * CLUBRANK 로고.
 * 모노그램: 이니셜 "C" + 등급 체브런(▲) 결합. 단색으로만 사용.
 */
export function Logo({ className = "", withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20.5 7.2A8 8 0 1 0 20.5 20.8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M9.5 14 14 8.5 18.5 14"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span className="font-display text-xl tracking-tight">
          CLUBRANK
        </span>
      )}
    </span>
  );
}
