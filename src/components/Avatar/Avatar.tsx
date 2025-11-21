import React from "react";
import { getInitial } from "../../utils/avatar";
import { getSizeClasses, getTypographyForSize, getComponentVariant, type ComponentSize } from "../../tokens";

export type AvatarProps = {
  name?: string;
  size?: ComponentSize;
  variant?: "dark" | "light";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Avatar({
  name = "",
  size = "sm",
  variant = "dark",
  onClick = () => {},
  className = "",
}: AvatarProps) {
  const initials = getInitial(name);

  // Get size, typography and variant tokens from the token system
  const sizeClasses = getSizeClasses(size);
  const avatarTypography = getTypographyForSize(size);
  const variantTokens = getComponentVariant(variant);

  const baseClasses = "flex items-center justify-center rounded-full select-none cursor-pointer transition-colors";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        baseClasses,
        sizeClasses.size,
        avatarTypography.className,
        variantTokens.background,
        variantTokens.text,
        variantTokens.border,
        variantTokens.hover,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {initials}
    </button>
  );
}