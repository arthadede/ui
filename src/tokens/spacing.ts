/**
 * Comprehensive spacing token system for @histweety/ui
 * Based on Tailwind CSS spacing scale with semantic naming
 */

// Atomic spacing sizes (matching Tailwind's scale)
export type SpacingSize = "0" | "px" | "0.5" | "1" | "1.5" | "2" | "2.5" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96";

export const spacingTokens: Record<SpacingSize, string> = {
  "0": "0",
  px: "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
} as const;

// Semantic spacing scales for common UI patterns
export type SemanticSpacing = "none" | "xs" | "sm" | "compact" | "normal" | "relaxed" | "loose" | "xl" | "2xl" | "3xl";

// Spacing types
export type SpacingType = "padding" | "margin" | "gap" | "space";

export type SpacingDirection = "all" | "x" | "y" | "top" | "right" | "bottom" | "left";

// Semantic spacing tokens for different spacing types
export const semanticSpacingTokens: Record<SpacingType, Record<SemanticSpacing, string>> = {
  padding: {
    none: "p-0",
    xs: "p-2",
    sm: "p-3",
    compact: "p-4",
    normal: "p-6",
    relaxed: "p-8",
    xl: "p-12",
    "2xl": "p-16",
    "3xl": "p-24",
  },
  margin: {
    none: "m-0",
    xs: "m-2",
    sm: "m-3",
    compact: "m-4",
    normal: "m-6",
    relaxed: "m-8",
    xl: "m-12",
    "2xl": "m-16",
    "3xl": "m-24",
  },
  gap: {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-3",
    compact: "gap-4",
    normal: "gap-6",
    relaxed: "gap-8",
    xl: "gap-12",
    "2xl": "gap-16",
    "3xl": "gap-24",
  },
  space: {
    none: "space-x-0 space-y-0",
    xs: "space-x-2 space-y-2",
    sm: "space-x-3 space-y-3",
    compact: "space-x-4 space-y-4",
    normal: "space-x-6 space-y-6",
    relaxed: "space-x-8 space-y-8",
    xl: "space-x-12 space-y-12",
    "2xl": "space-x-16 space-y-16",
    "3xl": "space-x-24 space-y-24",
  },
} as const;

// Directional spacing variants
export const directionalSpacingTokens = (type: SpacingType, direction: SpacingDirection, size: SemanticSpacing): string => {
  const baseToken = semanticSpacingTokens[type][size];

  if (direction === "all") return baseToken;

  const prefix = type === "padding" ? "p" : type === "margin" ? "m" : "";

  switch (direction) {
    case "x":
      return `${prefix}x-${size === "none" ? "0" : getSpacingValue(size)}`;
    case "y":
      return `${prefix}y-${size === "none" ? "0" : getSpacingValue(size)}`;
    case "top":
      return `${prefix}t-${size === "none" ? "0" : getSpacingValue(size)}`;
    case "right":
      return `${prefix}r-${size === "none" ? "0" : getSpacingValue(size)}`;
    case "bottom":
      return `${prefix}b-${size === "none" ? "0" : getSpacingValue(size)}`;
    case "left":
      return `${prefix}l-${size === "none" ? "0" : getSpacingValue(size)}`;
    default:
      return baseToken;
  }
};

// Helper function to get spacing value from semantic token
export const getSpacingValue = (size: SemanticSpacing): string => {
  const valueMap: Record<SemanticSpacing, string> = {
    none: "0",
    xs: "2",
    sm: "3",
    compact: "4",
    normal: "6",
    relaxed: "8",
    xl: "12",
    "2xl": "16",
    "3xl": "24",
  };
  return valueMap[size];
};

// Helper functions for spacing usage
export const getSpacingClasses = (
  type: SpacingType,
  size: SemanticSpacing,
  direction: SpacingDirection = "all"
): string => {
  return directionalSpacingTokens(type, direction, size);
};

export const getPaddingClasses = (size: SemanticSpacing, direction?: SpacingDirection): string => {
  return direction
    ? directionalSpacingTokens("padding", direction, size)
    : semanticSpacingTokens.padding[size];
};

export const getMarginClasses = (size: SemanticSpacing, direction?: SpacingDirection): string => {
  return direction
    ? directionalSpacingTokens("margin", direction, size)
    : semanticSpacingTokens.margin[size];
};

export const getGapClasses = (size: SemanticSpacing): string => {
  return semanticSpacingTokens.gap[size];
};

export const getSpaceClasses = (size: SemanticSpacing): string => {
  return semanticSpacingTokens.space[size];
};

// Custom spacing utilities for specific patterns
export const customSpacingTokens = {
  // Icon spacing
  iconGap: "gap-1.5",
  iconPadding: "p-1.5",

  // Component spacing
  componentGap: "gap-4",
  componentPadding: "p-4",

  // Layout spacing
  layoutGap: "gap-6",
  layoutPadding: "p-8",

  // Content spacing
  contentGap: "gap-8",
  contentPadding: "p-12",

  // Navigation spacing
  navGap: "gap-2",
  navPadding: "p-3",
} as const;

export type CustomSpacingKey = keyof typeof customSpacingTokens;

export const getCustomSpacingClass = (key: CustomSpacingKey): string => {
  return customSpacingTokens[key];
};

// Responsive spacing (if needed in the future)
export const responsiveSpacingTokens = {
  mobile: {
    padding: { none: "p-0", sm: "p-3", normal: "p-4" },
    margin: { none: "m-0", sm: "m-3", normal: "m-4" },
    gap: { none: "gap-0", sm: "gap-3", normal: "gap-4" },
  },
  tablet: {
    padding: { none: "p-0", sm: "p-4", normal: "p-6" },
    margin: { none: "m-0", sm: "m-4", normal: "m-6" },
    gap: { none: "gap-0", sm: "gap-4", normal: "gap-6" },
  },
  desktop: {
    padding: { none: "p-0", sm: "p-6", normal: "p-8" },
    margin: { none: "m-0", sm: "m-6", normal: "m-8" },
    gap: { none: "gap-0", sm: "gap-6", normal: "gap-8" },
  },
} as const;

export type ResponsiveSpacing = keyof typeof responsiveSpacingTokens;
export type ResponsiveSpacingType = keyof typeof responsiveSpacingTokens.mobile;

export const getResponsiveSpacingClasses = (
  breakpoint: ResponsiveSpacing,
  type: ResponsiveSpacingType,
  size: SemanticSpacing
): string => {
  return responsiveSpacingTokens[breakpoint][type][size];
};