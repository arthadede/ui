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
  variant = "secondary",
  disabled,
  ...rest
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);

  const sizeMap: Record<ComponentSize, string> = {
    sm: "size-9",
    md: "size-10",
    lg: "size-12",
    xl: "size-16",
  };

  return (
    <button
      className={[baseClasses, sizeMap[size], sizeClasses.padding, variantClasses]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...rest}
    >
      <Icon name={iconName} size={sizeClasses.iconSize} color={variant} />
    </button>
  );
}
