import React from "react";
import { Icon } from "../Icon";
import { getSizeClasses, getVariantClasses, getComponentVariant, getComponentTypography, type ComponentSize } from "../../tokens";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  leftIcon?: string;
  rightIcon?: string;
  size?: ComponentSize;
  variant?: "dark" | "light";
};

export default function Input({
  leftIcon,
  rightIcon,
  size = "md",
  variant = "dark",
  className = "",
  disabled,
  ...rest
}: InputProps) {
  
  // Base classes - structure and layout
  const baseClasses = "flex items-center rounded min-w-[200px] transition-colors focus-within:outline-none";

  // Get typography token for input text
  const inputTypography = getComponentTypography("input-text");

  // Get size and variant tokens from the token system
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);
  const variantTokens = getComponentVariant(variant);

  // Build placeholder color based on variant
  const placeholderColor = variant === "dark" ? "placeholder:text-white/30" : "placeholder:text-black/60";

  const inputClasses = [
    "flex-1",
    "min-w-0",
    "bg-transparent",
    "border-none",
    "outline-none",
    inputTypography.className,
    variantTokens.text,
    placeholderColor,
  ].join(" ");

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    // Icons use contrasting variant: dark containers get light icons, light containers get dark icons
    const iconVariant = variant === "dark" ? "light" : "dark";

    return (
      <span className="relative shrink-0">
        <Icon
          name={iconName}
          size={sizeClasses.iconSize}
          variant={iconVariant}
        />
      </span>
    );
  };

  return (
    <div
      className={[
        baseClasses,
        sizeClasses.container,
        sizeClasses.size,
        variantClasses,
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