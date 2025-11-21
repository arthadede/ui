/**
 * Typography tokens for @histweety/ui
 * Aligns with Tailwind CSS typography utilities
 */

// Atomic Typography Tokens
export type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type LineHeight = "3" | "4" | "5" | "6" | "7" | "8" | "9" | "none";
export type FontWeight = "normal" | "medium" | "semibold" | "bold";
export type LetterSpacing = "tight" | "normal" | "wide";

export interface TypographyToken {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
  className: string;
}

// Atomic Typography Tokens - Direct Tailwind Mappings
export const fontSizeTokens: Record<FontSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
} as const;

export const lineHeightTokens: Record<LineHeight, string> = {
  "3": "leading-3",
  "4": "leading-4",
  "5": "leading-5",
  "6": "leading-6",
  "7": "leading-7",
  "8": "leading-8",
  "9": "leading-9",
  none: "leading-none",
} as const;

export const fontWeightTokens: Record<FontWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export const letterSpacingTokens: Record<LetterSpacing, string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
} as const;

// Semantic Typography Tokens - UI Patterns
export type SemanticTypography = "caption" | "body" | "label" | "heading-6" | "heading-5" | "heading-4" | "heading-3" | "heading-2" | "heading-1";

export const semanticTypographyTokens: Record<SemanticTypography, TypographyToken> = {
  caption: {
    fontSize: "text-xs",
    lineHeight: "leading-4",
    fontWeight: "font-normal",
    className: "text-xs leading-4 font-normal",
  },
  body: {
    fontSize: "text-sm",
    lineHeight: "leading-5",
    fontWeight: "font-normal",
    className: "text-sm leading-5 font-normal",
  },
  label: {
    fontSize: "text-sm",
    lineHeight: "leading-5",
    fontWeight: "font-medium",
    className: "text-sm leading-5 font-medium",
  },
  "heading-6": {
    fontSize: "text-base",
    lineHeight: "leading-6",
    fontWeight: "font-semibold",
    className: "text-base leading-6 font-semibold",
  },
  "heading-5": {
    fontSize: "text-lg",
    lineHeight: "leading-7",
    fontWeight: "font-semibold",
    className: "text-lg leading-7 font-semibold",
  },
  "heading-4": {
    fontSize: "text-xl",
    lineHeight: "leading-7",
    fontWeight: "font-bold",
    className: "text-xl leading-7 font-bold",
  },
  "heading-3": {
    fontSize: "text-2xl",
    lineHeight: "leading-8",
    fontWeight: "font-bold",
    className: "text-2xl leading-8 font-bold",
  },
  "heading-2": {
    fontSize: "text-3xl",
    lineHeight: "leading-9",
    fontWeight: "font-bold",
    className: "text-3xl leading-9 font-bold",
  },
  "heading-1": {
    fontSize: "text-4xl",
    lineHeight: "leading-10",
    fontWeight: "font-bold",
    className: "text-4xl leading-10 font-bold",
  },
} as const;

// Component-Specific Typography Tokens
export type ComponentTypography = "button-text" | "input-text" | "chip-text" | "avatar-text";

export const componentTypographyTokens: Record<ComponentTypography, TypographyToken> = {
  "button-text": {
    fontSize: "text-base",
    lineHeight: "leading-6",
    fontWeight: "font-medium",
    className: "text-base leading-6 font-medium",
  },
  "input-text": {
    fontSize: "text-base",
    lineHeight: "leading-6",
    fontWeight: "font-normal",
    className: "text-base leading-6 font-normal",
  },
  "chip-text": {
    fontSize: "text-xs",
    lineHeight: "leading-3",
    fontWeight: "font-medium",
    className: "text-xs leading-3 font-medium",
  },
  "avatar-text": {
    fontSize: "text-base",
    lineHeight: "leading-6",
    fontWeight: "font-medium",
    className: "text-base leading-6 font-medium",
  },
} as const;

// Helper Functions
export const getTypographyToken = (type: SemanticTypography): TypographyToken => {
  return semanticTypographyTokens[type];
};

export const getComponentTypography = (type: ComponentTypography): TypographyToken => {
  return componentTypographyTokens[type];
};

export const getTypographyClasses = (
  fontSize: FontSize,
  lineHeight: LineHeight,
  fontWeight: FontWeight,
  letterSpacing?: LetterSpacing
): string => {
  const classes = [
    fontSizeTokens[fontSize],
    lineHeightTokens[lineHeight],
    fontWeightTokens[fontWeight],
  ];

  if (letterSpacing) {
    classes.push(letterSpacingTokens[letterSpacing]);
  }

  return classes.join(" ");
};

// Legacy Support - Maintain compatibility with existing size tokens
export const getTypographyForSize = (size: "sm" | "md" | "lg" | "xl"): TypographyToken => {
  const sizeToTypographyMap: Record<string, TypographyToken> = {
    sm: {
      fontSize: "text-sm",
      lineHeight: "leading-5",
      fontWeight: "font-medium",
      className: "text-sm leading-5 font-medium",
    },
    md: {
      fontSize: "text-base",
      lineHeight: "leading-6",
      fontWeight: "font-medium",
      className: "text-base leading-6 font-medium",
    },
    lg: {
      fontSize: "text-base",
      lineHeight: "leading-6",
      fontWeight: "font-semibold",
      className: "text-base leading-6 font-semibold",
    },
    xl: {
      fontSize: "text-lg",
      lineHeight: "leading-7",
      fontWeight: "font-medium",
      className: "text-lg leading-7 font-medium",
    },
  };

  return sizeToTypographyMap[size];
};