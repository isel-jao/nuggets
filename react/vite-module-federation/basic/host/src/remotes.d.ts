// Types for the modules exposed by remote_app (see remote_app/vite.config.ts).
// Kept as inline `import("react")` types so this file stays a global script and
// the declarations are treated as ambient modules rather than augmentations.

declare module "remote_app/button" {
  export function Button(
    props: import("react").ButtonHTMLAttributes<HTMLButtonElement>,
  ): import("react").JSX.Element;
}

declare module "remote_app/card" {
  export function Card(
    props: import("react").HTMLAttributes<HTMLElement>,
  ): import("react").JSX.Element;
}
