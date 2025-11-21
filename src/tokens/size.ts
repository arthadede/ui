export type ComponentSize = "sm" | "md" | "lg" | "xl";

export const sizeTokens = {
  sm: {
    padding: "p-2" as const,
    gap: "gap-2" as const,
    iconSize: 20, // text-sm (14px) + leading-5 (20px) = 20px
    size: "size-9" as const,
  },
  md: {
    padding: "p-2" as const,
    gap: "gap-2" as const,
    iconSize: 24, // text-base (16px) + leading-6 (24px) = 24px
    size: "size-10" as const,
  },
  lg: {
    padding: "p-3" as const,
    gap: "gap-3" as const,
    iconSize: 24, // text-base (16px) + leading-6 (24px) = 24px
    size: "size-12" as const,
  },
  xl: {
    padding: "p-4" as const,
    gap: "gap-4" as const,
    iconSize: 28, // text-lg (18px) + leading-7 (28px) = 28px
    size: "size-16" as const,
  },
} as const;

export const getComponentSize = (size: ComponentSize) => sizeTokens[size];

export const getSizeClasses = (size: ComponentSize) => {
  const tokens = sizeTokens[size];
  return {
    container: `${tokens.padding} ${tokens.gap}`,
    iconSize: tokens.iconSize,
    size: tokens.size,
    padding: tokens.padding,
    gap: tokens.gap,
  };
};
