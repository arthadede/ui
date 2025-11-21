import React from "react";
import { Icon } from "../Icon";
import { getComponentTypography } from "../../tokens";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  leftIcon?: string;
  rightIcon?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
};

export default function Input({
  leftIcon,
  rightIcon,
  size = "md",
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: InputProps) {
  
  // Base classes - structure and layout
  const baseClasses = "flex items-center rounded min-w-[200px] transition-colors focus-within:outline-none";

  // Get typography token for input text
  const inputTypography = getComponentTypography("input-text");

  // Size configuration combining spacing and typography
  const sizeConfig: Record<"sm" | "md" | "lg", { container: string; iconSize: number }> = {
    sm: {
      container: "gap-2 p-2",
      iconSize: 20,
    },
    md: {
      container: "gap-2 p-2 h-10",
      iconSize: 24,
    },
    lg: {
      container: "gap-3 p-3 h-12",
      iconSize: 28,
    },
  };

  // Variant configuration using token system with library naming
  const variantConfig: Record<"primary" | "secondary", { container: string; input: string }> = {
    primary: {
      container: "bg-white/4 border border-white/10",
      input: "text-white placeholder:text-white/30",
    },
    secondary: {
      container: "bg-white",
      input: "text-black placeholder:text-black/60",
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const inputClasses = [
    "flex-1",
    "min-w-0",
    "bg-transparent",
    "border-none",
    "outline-none",
    inputTypography.className,
    currentVariant.input,
  ].join(" ");

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span className="relative shrink-0">
        <Icon
          name={iconName}
          size={currentSize.iconSize}
          color={variant === "primary" ? "secondary" : "primary"}
        />
      </span>
    );
  };

  return (
    <div
      className={[
        baseClasses,
        currentSize.container,
        currentVariant.container,
        disabled && "opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {leftIcon && renderIcon(leftIcon)}
      <input
        className={inputClasses}
        disabled={disabled}
        data-variant={variant}
        {...rest}
      />
      {rightIcon && renderIcon(rightIcon)}
    </div>
  );
}