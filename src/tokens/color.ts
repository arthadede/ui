export type ComponentVariant = "dark" | "light" | "transparent" | "success" | "error" | "warning" | "info" | "input-dark" | "input-light" | "surface-dark" | "surface-light";

// Backward compatibility aliases
export type LegacyVariant = "primary" | "secondary";

type ColorToken = {
  background: string;
  text: string;
  hover: string;
  focus: string;
  disabled: string;
  border: string;
};

export const colorTokens: Record<ComponentVariant, ColorToken> = {
  // Dark mode - pure black with white text for Vercel aesthetic
  dark: {
    background: "bg-black",
    text: "text-white",
    hover: "hover:bg-gray-800",
    focus: "focus:bg-gray-800",
    disabled: "disabled:bg-gray-900 disabled:text-gray-600",
    border: "border border-gray-700",
  },
  // Light mode - pure white with black text for Vercel aesthetic
  light: {
    background: "bg-white",
    text: "text-black",
    hover: "hover:bg-gray-100",
    focus: "focus:bg-gray-100",
    disabled: "disabled:bg-gray-100 disabled:text-gray-500",
    border: "border border-gray-300",
  },

  // Input-specific variants for better visibility
  "input-dark": {
    background: "bg-gray-900",
    text: "text-white",
    hover: "hover:bg-gray-800",
    focus: "focus:bg-gray-800",
    disabled: "disabled:bg-gray-900 disabled:text-gray-600",
    border: "border border-gray-700",
  },
  "input-light": {
    background: "bg-gray-50",
    text: "text-black",
    hover: "hover:bg-gray-100",
    focus: "focus:bg-gray-100",
    disabled: "disabled:bg-gray-100 disabled:text-gray-500",
    border: "border border-gray-300",
  },

  // Surface variants for cards and containers
  "surface-dark": {
    background: "bg-black",
    text: "text-white",
    hover: "",
    focus: "",
    disabled: "disabled:bg-gray-900 disabled:text-gray-600",
    border: "border border-gray-800",
  },
  "surface-light": {
    background: "bg-white",
    text: "text-black",
    hover: "",
    focus: "",
    disabled: "disabled:bg-gray-100 disabled:text-gray-500",
    border: "border border-gray-200",
  },
  transparent: {
    background: "",
    text: "text-white",
    hover: "hover:bg-white/8",
    focus: "focus:bg-white/12",
    disabled: "disabled:opacity-60",
    border: "",
  },
  success: {
    background: "bg-emerald-500/20",
    text: "text-emerald-400",
    hover: "hover:bg-emerald-500/30",
    focus: "focus:bg-emerald-500/30",
    disabled: "disabled:opacity-50",
    border: "border-emerald-400/50",
  },
  error: {
    background: "bg-red-500/20",
    text: "text-red-400",
    hover: "hover:bg-red-500/30",
    focus: "focus:bg-red-500/30",
    disabled: "disabled:opacity-50",
    border: "border-red-400/50",
  },
  warning: {
    background: "bg-amber-500/20",
    text: "text-amber-400",
    hover: "hover:bg-amber-500/30",
    focus: "focus:bg-amber-500/30",
    disabled: "disabled:opacity-50",
    border: "border-amber-400/50",
  },
  info: {
    background: "bg-cyan-500/20",
    text: "text-cyan-400",
    hover: "hover:bg-cyan-500/30",
    focus: "focus:bg-cyan-500/30",
    disabled: "disabled:opacity-50",
    border: "border-cyan-400/50",
  },
};

export const getComponentVariant = (variant: ComponentVariant): ColorToken => {
  return colorTokens[variant];
};

export const getVariantClasses = (variant: ComponentVariant): string => {
  const tokens = colorTokens[variant];
  return [
    tokens.background,
    tokens.text,
    tokens.hover,
    tokens.focus,
    tokens.disabled,
    tokens.border,
  ]
    .filter(Boolean)
    .join(" ");
};
