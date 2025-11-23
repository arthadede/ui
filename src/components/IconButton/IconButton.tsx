"use client";

import React from "react";
import { Icon } from "../Icon";
import { getSizeClasses, getVariantClasses, getTypographyForSize, getAdaptiveVariantClassesString, type ComponentSize } from "../../tokens";

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  iconName: string;
  size?: ComponentSize;
  mode?: "dark" | "light" | "auto";
};

export default function IconButton({
  iconName,
  size = "md",
  mode = "auto",
  disabled,
  ...rest
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed";

  const sizeClasses = getSizeClasses(size);
  const typographyClasses = getTypographyForSize(size);
  const variantClasses = mode === "auto" ? getAdaptiveVariantClassesString('button') : getVariantClasses(mode);

  return (
    <button
      className={[
        baseClasses,
        sizeClasses.size,
        sizeClasses.padding,
        typographyClasses.className,
        variantClasses,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...rest}
    >
      <span
        className={[
          "relative shrink-0",
          disabled ? "opacity-60" : "opacity-[0.99]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon name={iconName} size={sizeClasses.iconSize} mode={mode} />
      </span>
    </button>
  );
}
