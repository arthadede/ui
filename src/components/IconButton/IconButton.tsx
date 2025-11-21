"use client";

import React from "react";
import { Icon } from "../Icon";
import { getSizeClasses, getVariantClasses, type ComponentSize, type ComponentVariant } from "../../tokens";

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  iconName: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
};

export default function IconButton({
  iconName,
  size = "md",
  variant = "dark",
  disabled,
  ...rest
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);

  // Icons use contrasting variant based on container variant
  const getIconVariant = (): "dark" | "light" => {
    if (variant === "dark") return "light";
    if (variant === "light") return "dark";
    // For semantic variants (success, error, etc), use light icons
    return "light";
  };

  return (
    <button
      className={[baseClasses, sizeClasses.size, sizeClasses.padding, variantClasses]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...rest}
    >
      <Icon name={iconName} size={sizeClasses.iconSize} variant={getIconVariant()} />
    </button>
  );
}
