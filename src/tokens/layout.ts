/**
 * Layout token system for @histweety/ui
 * Container widths, grid systems, and layout utilities
 */

// Container max-width tokens
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";

export const containerTokens: Record<ContainerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
} as const;

// Container padding tokens
export type ContainerPadding = "none" | "sm" | "normal" | "lg" | "xl" | "2xl";

export const containerPaddingTokens: Record<ContainerPadding, string> = {
  none: "p-0",
  sm: "px-4 py-2 sm:px-6 lg:px-8",
  normal: "px-4 py-6 sm:px-6 lg:px-8",
  lg: "px-4 py-8 sm:px-6 lg:px-8",
  xl: "px-4 py-12 sm:px-6 lg:px-8",
  "2xl": "px-4 py-16 sm:px-6 lg:px-8",
} as const;

// Grid system tokens
export type GridCols = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none";
export type GridRows = "1" | "2" | "3" | "4" | "5" | "6" | "none";

export const gridTokens: Record<GridCols, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "7": "grid-cols-7",
  "8": "grid-cols-8",
  "9": "grid-cols-9",
  "10": "grid-cols-10",
  "11": "grid-cols-11",
  "12": "grid-cols-12",
  none: "grid-cols-none",
} as const;

export const gridRowTokens: Record<GridRows, string> = {
  "1": "grid-rows-1",
  "2": "grid-rows-2",
  "3": "grid-rows-3",
  "4": "grid-rows-4",
  "5": "grid-rows-5",
  "6": "grid-rows-6",
  none: "grid-rows-none",
} as const;

// Flex layout tokens
export type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
export type FlexAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";

export const flexDirectionTokens: Record<FlexDirection, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
} as const;

export const flexAlignTokens: Record<FlexAlign, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

export const flexJustifyTokens: Record<FlexJustify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

// Container and wrapper tokens
export const containerTokensClasses = (size: ContainerSize = "xl", padding: ContainerPadding = "normal"): string => {
  return `container mx-auto ${containerTokens[size]} ${containerPaddingTokens[padding]}`;
};

// Layout spacing utilities
export type LayoutSpacing = "none" | "tight" | "compact" | "normal" | "relaxed" | "loose" | "extra-loose";

export const layoutSpacingTokens: Record<LayoutSpacing, string> = {
  none: "",
  tight: "space-y-1",
  compact: "space-y-2",
  normal: "space-y-4",
  relaxed: "space-y-6",
  loose: "space-y-8",
  "extra-loose": "space-y-12",
} as const;

// Responsive layout utilities
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export const responsiveBreakpoints: Record<Breakpoint, string> = {
  sm: "sm:min-w-[640px]",
  md: "md:min-w-[768px]",
  lg: "lg:min-w-[1024px]",
  xl: "xl:min-w-[1280px]",
  "2xl": "2xl:min-w-[1536px]",
} as const;

// Layout constraints
export type LayoutSize = "full" | "screen" | "min" | "max" | "fit";

export const layoutSizeTokens: Record<LayoutSize, string> = {
  full: "w-full",
  screen: "w-screen",
  min: "min-w-full",
  max: "max-w-full",
  fit: "w-fit",
} as const;

// Layout positioning
export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

export const positionTokens: Record<Position, string> = {
  static: "static",
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
} as const;

// Layout z-index integration (will use z-index tokens when created)
export type LayoutZIndex = "auto" | "base" | "dropdown" | "sticky" | "modal" | "tooltip";

export const layoutZIndexTokens: Record<LayoutZIndex, string> = {
  auto: "z-auto",
  base: "z-0",
  dropdown: "z-10",
  sticky: "z-20",
  modal: "z-50",
  tooltip: "z-50",
} as const;

// Layout overflow
export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

export const overflowTokens: Record<Overflow, string> = {
  visible: "overflow-visible",
  hidden: "overflow-hidden",
  clip: "overflow-clip",
  scroll: "overflow-scroll",
  auto: "overflow-auto",
} as const;

// Layout overflow direction
export type OverflowDirection = "x" | "y";

export const overflowDirectionTokens: Record<OverflowDirection, string> = {
  x: "overflow-x-auto",
  y: "overflow-y-auto",
} as const;

// Layout display
export type Display = "block" | "inline" | "inline-block" | "flex" | "inline-flex" | "grid" | "inline-grid" | "hidden";

export const displayTokens: Record<Display, string> = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  hidden: "hidden",
} as const;

// Layout helpers
export const getGridClasses = (cols: GridCols, rows?: GridRows): string => {
  const classes = [gridTokens[cols]];
  if (rows && rows !== "none") {
    classes.push(gridRowTokens[rows]);
  }
  return classes.join(" ");
};

export const getFlexClasses = (
  direction: FlexDirection = "row",
  align: FlexAlign = "stretch",
  justify: FlexJustify = "start"
): string => {
  return [
    flexDirectionTokens[direction],
    flexAlignTokens[align],
    flexJustifyTokens[justify],
  ].join(" ");
};

export const getLayoutSpacingClasses = (spacing: LayoutSpacing = "normal"): string => {
  return layoutSpacingTokens[spacing];
};

export const getPositionClasses = (position: Position = "relative", zIndex?: LayoutZIndex): string => {
  const classes = [positionTokens[position]];
  if (zIndex && zIndex !== "auto") {
    classes.push(layoutZIndexTokens[zIndex]);
  }
  return classes.join(" ");
};

export const getOverflowClasses = (
  overflow: Overflow = "visible",
  direction?: OverflowDirection
): string => {
  if (direction) {
    return overflowDirectionTokens[direction];
  }
  return overflowTokens[overflow];
};

export const getDisplayClasses = (display: Display = "block"): string => {
  return displayTokens[display];
};

// Container composition helpers
export const createContainer = (
  size: ContainerSize = "xl",
  padding: ContainerPadding = "normal",
  className = ""
): string => {
  return `${containerTokensClasses(size, padding)} ${className}`.trim();
};

// Layout composition patterns
export const layoutPatterns = {
  centered: "flex flex-col items-center justify-center min-h-screen",
  centeredContent: "flex items-center justify-center",
  fullWidth: "w-full",
  fullWidthMax: "w-full max-w-screen-xl mx-auto",
  sidebarLayout: "flex w-full",
  cardLayout: "w-full max-w-md mx-auto",
  pageLayout: "min-h-screen bg-background",
} as const;

export type LayoutPattern = keyof typeof layoutPatterns;

export const getLayoutPattern = (pattern: LayoutPattern): string => {
  return layoutPatterns[pattern];
};