export { sizeTokens, getComponentSize, getSizeClasses } from "./size";
export type { ComponentSize } from "./size";

export { colorTokens, getComponentVariant, getVariantClasses, adaptiveColorTokens, getAdaptiveVariantClasses, getAdaptiveVariantClassesString } from "./color";
export type { ComponentVariant, AdaptiveVariant } from "./color";

export {
  borderRadiusTokens,
  shadowTokens,
  getBorderRadius,
  getShadow,
  getBorderRadiusClasses,
  getShadowClasses,
} from "./border";
export type { BorderRadiusSize, ShadowLevel, BorderRadiusToken, ShadowToken } from "./border";

export {
  fontSizeTokens,
  lineHeightTokens,
  fontWeightTokens,
  letterSpacingTokens,
  semanticTypographyTokens,
  componentTypographyTokens,
  getTypographyToken,
  getComponentTypography,
  getTypographyClasses,
  getTypographyForSize,
} from "./typography";
export type {
  FontSize,
  LineHeight,
  FontWeight,
  LetterSpacing,
  TypographyToken,
  SemanticTypography,
  ComponentTypography,
} from "./typography";

// New token system exports
export * from "./spacing";
export * from "./layout";
export * from "./animation";

// Explicit exports to avoid naming conflicts between zIndex and opacity
export {
  // Z-index exports
  zIndexTokens,
  zIndexGroups,
  componentZIndexTokens,
  getZIndexClass,
  getGroupZIndex,
  getComponentZIndex,
  createZIndexStack,
  isValidZIndex,
  getZIndexValue,
  isHigherZIndex,
  isLowerZIndex,
  getZIndexAbove,
  getZIndexBelow,
  getZIndexClasses,
  getConditionalZIndex,
  responsiveZIndexTokens,
  getResponsiveZIndex,
  zIndexPatterns,
  validateZIndexLevel,
  getZIndexError,
  layoutZIndexOrder,
  createValidatedZIndexStack,
  type ZIndexLevel,
  type ZIndexGroup,
} from "./zIndex";

export {
  // Opacity exports
  opacityTokens,
  semanticOpacityTokens,
  stateOpacityTokens,
  componentOpacityTokens,
  responsiveOpacityTokens,
  getOpacityClass,
  getStateOpacityClass,
  getComponentOpacityClass,
  getConditionalOpacity,
  getInteractiveOpacityClasses,
  getOpacityTransitionClasses,
  getSmoothOpacityClasses,
  getResponsiveOpacityClass,
  composeOpacityClasses,
  opacityPatterns,
  isValidOpacityLevel,
  getOpacityError,
  debugOpacityClasses,
  getDebugOpacityClass,
  type OpacityLevel,
  type SemanticOpacity,
  type ResponsiveBreakpoint as OpacityResponsiveBreakpoint,
} from "./opacity";

// Token helper functions
export * from "./helpers";
