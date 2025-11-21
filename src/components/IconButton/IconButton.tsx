"use client";

import React from "react";
import Icon from "../Icon/Icon";

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  iconName: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "transparent";
};

export default function IconButton({
  iconName,
  size = "md",
  variant = "secondary",
  disabled,
  ...rest
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizeConfig: Record<"sm" | "md" | "lg", { container: string; iconSize: number }> = {
    sm: {
      container: "size-9 p-2",
      iconSize: 20,
    },
    md: {
      container: "h-10 w-10 p-2",
      iconSize: 24,
    },
    lg: {
      container: "size-12 p-3",
      iconSize: 24,
    },
  };

  const variantConfig: Record<"primary" | "secondary" | "transparent", string> = {
    primary: "bg-white/96 text-black hover:bg-white disabled:text-black/60",
    secondary:
      "bg-white/4 border border-white/10 text-white hover:bg-white/8 disabled:text-white/30",
    transparent: "text-white hover:bg-white/8",
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return (
    <button
      className={[baseClasses, currentSize.container, currentVariant]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...rest}
    >
      <Icon name={iconName} size={currentSize.iconSize} />
    </button>
  );
}
