"use client";

import type { HTMLAttributes } from "react";

export type LayoutCenterProps = HTMLAttributes<HTMLDivElement>;

export default function LayoutCenter({
  children,
  className,
  ...rest
}: LayoutCenterProps) {
  const baseClasses = "flex flex-col items-center justify-center min-h-screen w-full";

  return (
    <div
      className={[baseClasses, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}