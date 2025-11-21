export type BorderRadiusSize = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type ShadowLevel = "none" | "sm" | "md" | "lg" | "xl";

export type BorderRadiusToken = {
  className: string;
  value: string;
};

export type ShadowToken = {
  className: string;
  value: string;
};

export const borderRadiusTokens: Record<BorderRadiusSize, BorderRadiusToken> = {
  none: { className: "", value: "0" },
  sm: { className: "rounded-sm", value: "0.125rem" },
  md: { className: "rounded-md", value: "0.375rem" },
  lg: { className: "rounded-lg", value: "0.5rem" },
  xl: { className: "rounded-xl", value: "0.75rem" },
  full: { className: "rounded-full", value: "9999px" },
};

export const shadowTokens: Record<ShadowLevel, ShadowToken> = {
  none: { className: "", value: "none" },
  sm: {
    className: "shadow-sm",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  },
  md: {
    className: "shadow-md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  lg: {
    className: "shadow-lg",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  xl: {
    className: "shadow-xl",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
};

export const getBorderRadius = (size: BorderRadiusSize): BorderRadiusToken => {
  return borderRadiusTokens[size];
};

export const getShadow = (level: ShadowLevel): ShadowToken => {
  return shadowTokens[level];
};

export const getBorderRadiusClasses = (size: BorderRadiusSize): string => {
  return borderRadiusTokens[size].className;
};

export const getShadowClasses = (level: ShadowLevel): string => {
  return shadowTokens[level].className;
};