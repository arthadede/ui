export type ComponentVariant = "primary" | "secondary" | "transparent" | "success" | "error" | "warning" | "info";

type ColorToken = {
  background: string;
  text: string;
  hover: string;
  disabled: string;
  border: string;
};

export const colorTokens: Record<ComponentVariant, ColorToken> = {
  primary: {
    background: "bg-white/96",
    text: "text-black",
    hover: "hover:bg-white",
    disabled: "disabled:text-black/60",
    border: "",
  },
  secondary: {
    background: "bg-white/4",
    text: "text-white",
    hover: "hover:bg-white/8",
    disabled: "disabled:text-white/30",
    border: "border border-white/10",
  },
  transparent: {
    background: "",
    text: "text-white",
    hover: "hover:bg-white/8",
    disabled: "disabled:opacity-60",
    border: "",
  },
  success: {
    background: "bg-emerald-500/20",
    text: "text-emerald-400",
    hover: "hover:bg-emerald-500/30",
    disabled: "disabled:opacity-50",
    border: "border-emerald-400/50",
  },
  error: {
    background: "bg-red-500/20",
    text: "text-red-400",
    hover: "hover:bg-red-500/30",
    disabled: "disabled:opacity-50",
    border: "border-red-400/50",
  },
  warning: {
    background: "bg-amber-500/20",
    text: "text-amber-400",
    hover: "hover:bg-amber-500/30",
    disabled: "disabled:opacity-50",
    border: "border-amber-400/50",
  },
  info: {
    background: "bg-cyan-500/20",
    text: "text-cyan-400",
    hover: "hover:bg-cyan-500/30",
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
    tokens.disabled,
    tokens.border,
  ]
    .filter(Boolean)
    .join(" ");
};
