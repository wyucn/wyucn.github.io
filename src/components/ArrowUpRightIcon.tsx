type ArrowUpRightIconProps = {
  className?: string;
};

export default function ArrowUpRightIcon({
  className = "",
}: ArrowUpRightIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      className={`block shrink-0 ${className}`}
    >
      <path
        d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
