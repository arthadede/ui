export type ComponentSize = "sm" | "md" | "lg" | "xl";

export const sizeTokens = {
  sm: {
    padding: "p-2" as const,
    gap: "gap-2" as const,
    iconSize: 20,
    fontSize: "text-sm" as const,
    lineHeight: "leading-5" as const,
    fontWeight: "font-medium" as const,
    height: "h-9" as const,
    minWidth: "min-w-[120px]" as const,
  },
  md: {
    padding: "p-2" as const,
    gap: "gap-2" as const,
    iconSize: 24,
    fontSize: "text-base" as const,
    lineHeight: "leading-6" as const,
    fontWeight: "font-medium" as const,
    height: "h-10" as const,
    minWidth: "min-w-[150px]" as const,
  },
  lg: {
    padding: "p-3" as const,
    gap: "gap-3" as const,
    iconSize: 28,
    fontSize: "text-base" as const,
    lineHeight: "leading-6" as const,
    fontWeight: "font-semibold" as const,
    height: "h-12" as const,
    minWidth: "min-w-[180px]" as const,
  },
  xl: {
    padding: "p-4" as const,
    gap: "gap-4" as const,
    iconSize: 32,
    fontSize: "text-lg" as const,
    lineHeight: "leading-7" as const,
    fontWeight: "font-medium" as const,
    height: "h-16" as const,
    minWidth: "min-w-[200px]" as const,
  },
} as const;

export const getComponentSize = (size: ComponentSize) => sizeTokens[size];

export const getSizeClasses = (size: ComponentSize) => {
  const tokens = sizeTokens[size];
  return {
    container: `${tokens.padding} ${tokens.gap}`,
    text: `${tokens.fontSize} ${tokens.lineHeight} ${tokens.fontWeight}`,
    iconSize: tokens.iconSize,
    height: tokens.height,
    minWidth: tokens.minWidth,
    padding: tokens.padding,
    gap: tokens.gap,
  };
};
