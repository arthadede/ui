"use client";

import React from "react";
import Icon from "../Icon/Icon";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
  label?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  size?: "sm" | "md" | "lg";
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
  // Base classes - structure and layout
  const baseClasses =
    "inline-flex items-center justify-center rounded transition-colors focus:outline-none disabled:cursor-not-allowed min-w-[150px]";

  // Size configuration - spacing, typography, and icon size
  const sizeConfig: Record<
    "sm" | "md" | "lg",
    { container: string; text: string; iconSize: number }
  > = {
    sm: {
      container: "gap-2 p-2",
      text: "text-sm leading-5 font-medium",
      iconSize: 20,
    },
    md: {
      container: "gap-2 p-2",
      text: "text-base leading-6 font-medium",
      iconSize: 24,
    },
    lg: {
      container: "gap-3 p-3",
      text: "text-base leading-6 font-semibold",
      iconSize: 24,
    },
  };

  // Variant configuration - colors and states
  const variantConfig: Record<"primary" | "secondary", string> = {
    primary: "bg-white/96 text-black hover:bg-white disabled:text-black/60",
    secondary:
      "bg-white/4 border border-white/10 text-white hover:bg-white/8 disabled:text-white/30",
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span
        className={["relative shrink-0", disabled ? "opacity-60" : "opacity-[0.99]"]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon name={iconName} size={currentSize.iconSize} />
      </span>
    );
  };

  return (
    <button
      className={[baseClasses, currentSize.container, currentSize.text, currentVariant, className]
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
