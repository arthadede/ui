/**
 * Animation and transition token system for @histweety/ui
 * Consistent animation durations, easings, and transitions
 */

// Animation duration tokens
export type AnimationDuration = "fast" | "normal" | "slow" | "slower";

export const animationDurationTokens: Record<AnimationDuration, string> = {
  fast: "duration-75",
  normal: "duration-200",
  slow: "duration-300",
  slower: "duration-500",
} as const;

// Animation easing tokens
export type AnimationEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "ease" | "custom";

export const animationEasingTokens: Record<AnimationEasing, string> = {
  linear: "linear",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  ease: "ease",
  custom: "cubic-bezier(0.16, 1, 0.3, 1)", // Custom curve for smooth animations
} as const;

// Transition property tokens
export type TransitionProperty = "none" | "all" | "colors" | "opacity" | "transform" | "shadow" | "background" | "border";

export const transitionPropertyTokens: Record<TransitionProperty, string> = {
  none: "",
  all: "transition-all",
  colors: "transition-colors",
  opacity: "transition-opacity",
  transform: "transition-transform",
  shadow: "transition-shadow",
  background: "transition-background",
  border: "transition-border",
} as const;

// Transition timing function tokens
export const transitionTimingFunctions: Record<AnimationEasing, string> = {
  linear: "linear",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  custom: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

// Animation composition helpers
export const getTransitionClasses = (
  duration: AnimationDuration = "normal",
  easing: AnimationEasing = "custom",
  property: TransitionProperty = "colors"
): string => {
  const durationClass = animationDurationTokens[duration];
  const easingClass = transitionTimingFunctions[easing];
  const propertyClass = transitionPropertyTokens[property];

  return [durationClass, easingClass, propertyClass].filter(Boolean).join(" ");
};

// Common animation presets
export const animationPresets = {
  // Fast interactions
  fastColorTransition: getTransitionClasses("fast", "custom", "colors"),
  fastOpacityTransition: getTransitionClasses("fast", "custom", "opacity"),
  fastTransformTransition: getTransitionClasses("fast", "custom", "transform"),

  // Normal interactions
  normalColorTransition: getTransitionClasses("normal", "custom", "colors"),
  normalOpacityTransition: getTransitionClasses("normal", "custom", "opacity"),
  normalTransformTransition: getTransitionClasses("normal", "custom", "transform"),
  normalShadowTransition: getTransitionClasses("normal", "custom", "shadow"),

  // Slow animations
  slowColorTransition: getTransitionClasses("slow", "custom", "colors"),
  slowOpacityTransition: getTransitionClasses("slow", "custom", "opacity"),
  slowTransformTransition: getTransitionClasses("slow", "custom", "transform"),
} as const;

// Hover animation tokens
export type HoverAnimation = "scale" | "lift" | "glow" | "pulse" | "bounce";

export const hoverAnimationTokens: Record<HoverAnimation, string> = {
  scale: "hover:scale-105 active:scale-95",
  lift: "hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
  glow: "hover:shadow-lg hover:shadow-current/25",
  pulse: "hover:animate-pulse",
  bounce: "hover:animate-bounce",
} as const;

// Focus animation tokens
export const focusAnimationTokens = {
  ring: "focus:outline-none focus:ring-2 focus:ring-offset-2",
  scale: "focus:scale-105",
  glow: "focus:shadow-lg focus:shadow-current/25",
} as const;

// Active animation tokens
export const activeAnimationTokens = {
  scale: "active:scale-95",
  press: "active:scale-97 active:opacity-80",
  lift: "active:translate-y-0",
} as const;

// Animation keyframes (already defined in globals.css, but referenced here)
export const animationKeyframes = {
  slideInFromLeft: "slideInFromLeft",
  slideInFromRight: "slideInFromRight",
  slideInFromTop: "slideInFromTop",
  slideInFromBottom: "slideInFromBottom",
  fadeIn: "fadeIn",
  zoomIn: "zoomIn",
} as const;

// Animation utility classes
export const animationUtilities = {
  // Entry animations
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  slideInTop: "animate-slide-in-top",
  slideInBottom: "animate-slide-in-bottom",
  fadeIn: "animate-fade-in",
  zoomIn: "animate-zoom-in",

  // Continuous animations
  spin: "animate-spin",
  ping: "animate-ping",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
} as const;

// Animation delay tokens
export type AnimationDelay = "0" | "75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000";

export const animationDelayTokens: Record<AnimationDelay, string> = {
  "0": "delay-0",
  "75": "delay-75",
  "100": "delay-100",
  "150": "delay-150",
  "200": "delay-200",
  "300": "delay-300",
  "500": "delay-500",
  "700": "delay-700",
  "1000": "delay-1000",
} as const;

// Animation iteration tokens
export type AnimationIteration = "once" | "infinite" | "reverse";

export const animationIterationTokens: Record<AnimationIteration, string> = {
  once: "animate-once",
  infinite: "animate-infinite",
  reverse: "animate-reverse",
} as const;

// Compound animation helpers
export const getAnimationClasses = (
  animation: keyof typeof animationUtilities,
  duration: AnimationDuration = "normal",
  delay?: AnimationDelay,
  iteration?: AnimationIteration
): string => {
  const baseAnimation = animationUtilities[animation];
  const durationClass = animationDurationTokens[duration];
  const delayClass = delay ? animationDelayTokens[delay] : "";
  const iterationClass = iteration ? animationIterationTokens[iteration] : "";

  return [baseAnimation, durationClass, delayClass, iterationClass].filter(Boolean).join(" ");
};

// Animation composition patterns
export const animationPatterns = {
  // Button animations
  buttonHover: `${hoverAnimationTokens.scale} ${animationPresets.fastColorTransition}`,
  buttonFocus: `${focusAnimationTokens.ring} ${animationPresets.normalColorTransition}`,
  buttonActive: `${activeAnimationTokens.scale} ${animationPresets.fastColorTransition}`,

  // Card animations
  cardHover: `${hoverAnimationTokens.lift} ${animationPresets.normalShadowTransition}`,
  cardFocus: `${focusAnimationTokens.ring} ${animationPresets.normalColorTransition}`,

  // Modal animations
  modalEnter: getAnimationClasses("zoomIn", "normal", "200"),
  modalExit: getAnimationClasses("zoomIn", "fast", "0", "reverse"),

  // Dropdown animations
  dropdownEnter: getAnimationClasses("slideInBottom", "fast"),
  dropdownExit: getAnimationClasses("slideInBottom", "fast", "0", "reverse"),

  // Toast notifications
  toastEnter: getAnimationClasses("slideInTop", "normal", "300"),
  toastExit: getAnimationClasses("slideInTop", "fast", "0", "reverse"),
} as const;

// Custom cubic bezier functions for specific use cases
export const cubicBezierPresets = {
  // Smooth entrance
  smoothIn: "cubic-bezier(0, 0, 0.2, 1)",
  // Smooth exit
  smoothOut: "cubic-bezier(0.4, 0, 0.6, 1)",
  // Bounce
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  // Elastic
  elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  // Back
  backIn: "cubic-bezier(0.36, 0, 0.66, -0.56)",
  backOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// Animation state helpers
export const getAnimationStateClasses = (state: "idle" | "hover" | "focus" | "active"): string => {
  switch (state) {
    case "hover":
      return "hover:scale-105 hover:shadow-lg";
    case "focus":
      return "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current";
    case "active":
      return "active:scale-95 active:opacity-80";
    default:
      return "";
  }
};

// Transition utility for hover states
export const getHoverTransition = (
  property: TransitionProperty = "colors",
  duration: AnimationDuration = "fast"
): string => {
  return getTransitionClasses(duration, "custom", property);
};

// Staggered animation helpers
export const getStaggerDelay = (index: number, baseDelay: AnimationDelay = "100"): string => {
  const delayValue = parseInt(baseDelay) + (index * 50);
  if (delayValue <= 1000) {
    return animationDelayTokens[delayValue as AnimationDelay] || "";
  }
  return animationDelayTokens["1000"];
};