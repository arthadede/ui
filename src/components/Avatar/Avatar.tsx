import React from "react";
import { getInitial, getBucket } from "../../utils/avatar";
import { getSizeClasses, getTypographyForSize, getComponentVariant, type ComponentSize, type ComponentVariant } from "../../tokens";

export type AvatarProps = {
  name?: string;
  size?: ComponentSize;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Avatar({
  name = "",
  size = "sm",
  onClick = () => {},
  className = "",
}: AvatarProps) {
  const initials = getInitial(name);

  // Get size, typography and variant tokens from the token system
  const sizeClasses = getSizeClasses(size);
  const avatarTypography = getTypographyForSize(size);

  // Use dynamic color assignment based on name
  const variantTokens = getComponentVariant(getDynamicVariant(name));

  // Define color palette for dynamic assignment
  function getDynamicVariant(name: string | undefined): ComponentVariant {
    const bucket = getBucket(name);
    const colorVariants: ComponentVariant[] = ["dark", "success", "error", "warning", "info"];
    return colorVariants[bucket % colorVariants.length];
  }

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