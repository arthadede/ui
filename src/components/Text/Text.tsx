"use client";

import React from "react";
import { getTypographyToken, type SemanticTypography } from "../../tokens";

export type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: SemanticTypography | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2';
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
  // Map common variant names to SemanticTypography
  const variantMap: Record<string, SemanticTypography> = {
    'h1': 'heading-1',
    'h2': 'heading-2',
    'h3': 'heading-3',
    'h4': 'heading-4',
    'h5': 'heading-5',
    'h6': 'heading-6',
    'body1': 'body',
    'body2': 'body',
    'subtitle1': 'label',
    'subtitle2': 'label',
  };

  const mappedVariant = (variant as string) in variantMap ? variantMap[variant as string] : variant;
  const typographyToken = getTypographyToken(mappedVariant as SemanticTypography);

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