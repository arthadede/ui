export type ComponentVariant = "primary" | "secondary" | "transparent";

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
