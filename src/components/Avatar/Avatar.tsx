import React from "react";
import { getBucket, getInitial } from "../../utils/avatar";
import { getTypographyForSize } from "../../tokens";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  name?: string;
  size?: AvatarSize;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Avatar({
  name = "",
  size = "sm",
  onClick = () => {},
  className = "",
}: AvatarProps) {
  const bucket = getBucket(name);
  const initials = getInitial(name);

  const bgPaletteCls = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-slate-500",
  ];
  const textPaletteCls = [
    "text-white", // on blue
    "text-white", // on green
    "text-white", // on red
    "text-black", // on yellow
    "text-white", // on purple
    "text-white", // on teal
    "text-black", // on orange
    "text-white", // on slate
  ];

  
  // Get typography token for avatar text based on size
  const avatarTypography = getTypographyForSize(size);

  const sizeConfig: Record<AvatarSize, string> = {
    sm: "size-9",
    md: "size-10",
    lg: "size-12",
    xl: "size-20",
  };

  const bgClass = bgPaletteCls[bucket];
  const fgClass = textPaletteCls[bucket];

  const baseClasses = "flex items-center justify-center rounded-full select-none cursor-pointer transition-colors";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        baseClasses,
        sizeConfig[size],
        avatarTypography.className,
        bgClass,
        fgClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {initials}
    </button>
  );
}