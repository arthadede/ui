"use client";

import React from "react";
import Icon from "../Icon/Icon";
import { getSizeClasses, getVariantClasses, type ComponentSize } from "../../tokens";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  label?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  size?: ComponentSize;
  variant?: "primary" | "secondary";
};

export default function Button({
  label,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "primary",
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed";

  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span
        className={["relative shrink-0", disabled ? "opacity-60" : "opacity-[0.99]"]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon name={iconName} size={sizeClasses.iconSize} color={variant} />
      </span>
    );
  };

  return (
    <button
      className={[
        baseClasses,
        sizeClasses.container,
        sizeClasses.text,
        sizeClasses.minWidth,
        variantClasses,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && renderIcon(leftIcon)}
      <span className="relative shrink-0">{children ?? label ?? "Button Text"}</span>
      {rightIcon && renderIcon(rightIcon)}
    </button>
  );
}
