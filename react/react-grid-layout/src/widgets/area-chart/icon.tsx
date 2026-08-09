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
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 17h12V9l-4 4-3-3-5 5z" />
    </svg>
  );
}
