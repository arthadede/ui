"use client";

import type { HTMLAttributes } from "react";
import { getAdaptiveVariantClassesString } from "../../tokens";

export type LayoutCenterProps = HTMLAttributes<HTMLDivElement> & {
};

export default function LayoutCenter({
  children,
  className,
  ...rest
}: LayoutCenterProps) {
  const baseClasses = "flex flex-col items-center justify-center min-h-screen w-full";

  const adaptiveBackground = getAdaptiveVariantClassesString('card');

  return (
    <div
      className={[baseClasses, adaptiveBackground, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}