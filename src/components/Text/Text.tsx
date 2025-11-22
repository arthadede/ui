"use client";

import React from "react";
import { getTypographyToken, type SemanticTypography } from "../../tokens";

export type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: SemanticTypography;
  align?: "left" | "center" | "right" | "justify";
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  decoration?: "none" | "underline" | "line-through";
  truncate?: boolean;
  clamp?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Text({
  variant = "body",
  align,
  transform,
  decoration,
  truncate,
  clamp,
  className,
  children,
  ...rest
}: TextProps) {
  const typographyToken = getTypographyToken(variant);

  const classes = [
    typographyToken.className,
    align && `text-${align}`,
    transform && transform !== "none" && `${transform}`,
    decoration && decoration !== "none" && `${decoration}`,
    truncate && "truncate",
    clamp && `line-clamp-${clamp}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}