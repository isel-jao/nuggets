import type { SVGProps } from "react";

export function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m3 7 2 2 3-3" />
      <path d="m3 17 2 2 3-3" />
      <path d="M12 8h9M12 18h9" />
    </svg>
  );
}
