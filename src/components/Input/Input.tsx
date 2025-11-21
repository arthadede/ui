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
  
  const baseClasses = "flex items-center rounded transition-colors focus-within:outline-none";

  const inputTypography = getComponentTypography("input-text");

  const sizeClasses = getSizeClasses(size);
  const inputVariant = variant === "dark" ? "input-dark" : "input-light";
  const variantClasses = getVariantClasses(inputVariant);
  const variantTokens = getComponentVariant(inputVariant);

  const placeholderColor = variant === "dark" ? "placeholder:text-gray-400" : "placeholder:text-gray-500";

  const inputClasses = [
    "flex-1",
    "bg-transparent",
    "border-none",
    "outline-none",
    inputTypography.className,
    variantTokens.text,
    placeholderColor,
  ].join(" ");

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span className="relative shrink-0">
        <Icon name={iconName} size={sizeClasses.iconSize} variant={variant} />
      </span>
    );
  };

  return (
    <div
      className={[
        baseClasses,
        sizeClasses.container,
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