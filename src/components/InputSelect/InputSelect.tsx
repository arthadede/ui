import React from "react";
import { Icon } from "../Icon";
import { getSizeClasses, getVariantClasses, getComponentVariant, getComponentTypography, getAdaptiveVariantClasses, type ComponentSize } from "../../tokens";

export type InputSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  leftIcon?: string;
  rightIcon?: string;
  size?: ComponentSize;
  mode?: "dark" | "light" | "auto";
  placeholder?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
};

export default function InputSelect({
  leftIcon,
  rightIcon,
  size = "md",
  mode = "auto",
  className = "",
  disabled,
  placeholder,
  options = [],
  ...rest
}: InputSelectProps) {

  const baseClasses = "flex items-center rounded transition-colors focus-within:outline-none";

  const selectTypography = getComponentTypography("input-text");

  const sizeClasses = getSizeClasses(size);

  let variantClasses: string;
  let variantTokens: any;
  let placeholderColor: string;

  if (mode === "auto") {
    variantTokens = getAdaptiveVariantClasses('input');
    variantClasses = [
      variantTokens.background,
      variantTokens.border,
      variantTokens.hover,
      variantTokens.focus,
      variantTokens.disabled,
    ].filter(Boolean).join(" ");
    placeholderColor = "text-gray-400 dark:text-gray-500";
  } else {
    const inputVariant = mode === "dark" ? "input-dark" : "input-light";
    variantClasses = getVariantClasses(inputVariant);
    variantTokens = getComponentVariant(inputVariant);
    placeholderColor = mode === "dark" ? "text-gray-400" : "text-gray-500";
  }

  const selectClasses = [
    "flex-1",
    "bg-transparent",
    "border-none",
    "outline-none",
    selectTypography.className,
    mode === "auto" ? "text-black dark:text-white" : variantTokens.text,
    "appearance-none",
    "cursor-pointer",
  ].join(" ");

  const renderIcon = (iconName: string) => {
    if (!iconName) return null;

    return (
      <span className="relative shrink-0">
        <Icon name={iconName} size={sizeClasses.iconSize} mode={mode} />
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
      <select
        className={selectClasses}
        disabled={disabled}
        data-mode={mode}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled className={placeholderColor}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {!rightIcon && renderIcon("chevron-down")}
      {rightIcon && renderIcon(rightIcon)}
    </div>
  );
}