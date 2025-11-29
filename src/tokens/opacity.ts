/**
 * Opacity token system for @histweety/ui
 * Consistent transparency levels for various UI states and effects
 */

// Numeric opacity levels (matching Tailwind CSS scale)
export type OpacityLevel = "0" | "5" | "10" | "20" | "25" | "30" | "40" | "50" | "60" | "70" | "75" | "80" | "90" | "95" | "100";

export const opacityTokens: Record<OpacityLevel, string> = {
  "0": "opacity-0",
  "5": "opacity-5",
  "10": "opacity-10",
  "20": "opacity-20",
  "25": "opacity-25",
  "30": "opacity-30",
  "40": "opacity-40",
  "50": "opacity-50",
  "60": "opacity-60",
  "70": "opacity-70",
  "75": "opacity-75",
  "80": "opacity-80",
  "90": "opacity-90",
  "95": "opacity-95",
  "100": "opacity-100",
} as const;

// Semantic opacity levels for common UI patterns
export type SemanticOpacity =
  | "hidden"          // Completely hidden
  | "invisible"       // Invisible but still occupies space
  | "faded"           // Faded appearance (25%)
  | "subtle"          // Subtle transparency (60%)
  | "medium"          // Medium transparency (70%)
  | "strong"          // Strong transparency (80%)
  | "disabled"        // Disabled state (50%)
  | "placeholder"     // Placeholder text (40%)
  | "hover"           // Hover effect (75%)
  | "focus"           // Focus effect (80%)
  | "active"          // Active/pressed effect (90%)
  | "loading"         // Loading state (60%)
  | "success"         // Success state (70%)
  | "error"           // Error state (60%)
  | "warning"         // Warning state (70%)
  | "info"            // Info state (70%)
  | "critical"        // Critical/error state (60%)
  | "muted"           // Muted appearance (50%)
  | "dimmed"          // Dimmed appearance (25%)
  | "transparent"     // Fully transparent (0%)
  | "solid"           // Fully opaque (100%);

export const semanticOpacityTokens: Record<SemanticOpacity, string> = {
  hidden: "opacity-0",
  invisible: "opacity-0",
  faded: "opacity-25",
  subtle: "opacity-60",
  medium: "opacity-70",
  strong: "opacity-80",
  disabled: "opacity-50",
  placeholder: "opacity-40",
  hover: "opacity-75",
  focus: "opacity-80",
  active: "opacity-90",
  loading: "opacity-60",
  success: "opacity-70",
  error: "opacity-60",
  warning: "opacity-70",
  info: "opacity-70",
  critical: "opacity-60",
  muted: "opacity-50",
  dimmed: "opacity-25",
  transparent: "opacity-0",
  solid: "opacity-100",
} as const;

// State-based opacity tokens
export const stateOpacityTokens = {
  // Interactive states
  disabled: "opacity-50 cursor-not-allowed",
  hover: "opacity-75 transition-opacity",
  focus: "opacity-80 focus:outline-none focus:ring-2",
  active: "opacity-90 active:scale-95",

  // Loading states
  loading: "opacity-60 animate-pulse",
  skeleton: "opacity-40 animate-pulse",

  // Alert states
  success: "opacity-70",
  error: "opacity-60",
  warning: "opacity-70",
  info: "opacity-70",

  // Content states
  placeholder: "opacity-40",
  muted: "opacity-50",
  dimmed: "opacity-25",
  subtle: "opacity-60",

  // Visual effects
  overlay: "opacity-75 backdrop-blur-sm",
  glass: "opacity-25 backdrop-blur-lg",
  frosted: "opacity-10 backdrop-blur-xl",
} as const;

// Component-specific opacity tokens
export const componentOpacityTokens = {
  // Buttons
  button: {
    disabled: "opacity-50 cursor-not-allowed",
    hover: "opacity-90",
    active: "opacity-75",
    loading: "opacity-70",
  },

  // Inputs
  input: {
    disabled: "opacity-50 cursor-not-allowed",
    placeholder: "opacity-40",
    focus: "opacity-100",
    error: "opacity-60",
  },

  // Cards and Containers
  card: {
    hover: "opacity-90",
    active: "opacity-80",
    disabled: "opacity-50",
  },

  // Modals and Overlays
  modal: {
    backdrop: "opacity-75 backdrop-blur-sm",
    content: "opacity-100",
    loading: "opacity-60",
  },

  // Dropdowns and Menus
  dropdown: {
    hover: "opacity-90",
    active: "opacity-75",
    disabled: "opacity-50",
  },

  // Icons and Avatars
  icon: {
    disabled: "opacity-50",
    hover: "opacity-75",
    active: "opacity-60",
    muted: "opacity-50",
  },

  // Images and Media
  image: {
    hover: "opacity-90",
    loading: "opacity-40",
    error: "opacity-60",
  },

  // Badges and Chips
  badge: {
    disabled: "opacity-50",
    hover: "opacity-80",
    active: "opacity-70",
  },
} as const;

// Utility functions for opacity
export const getOpacityClass = (level: OpacityLevel | SemanticOpacity): string => {
  if (level in opacityTokens) {
    return opacityTokens[level as OpacityLevel];
  }
  return semanticOpacityTokens[level as SemanticOpacity];
};

export const getStateOpacityClass = (state: keyof typeof stateOpacityTokens): string => {
  return stateOpacityTokens[state];
};

export const getComponentOpacityClass = (
  component: keyof typeof componentOpacityTokens,
  state: keyof typeof componentOpacityTokens[keyof typeof componentOpacityTokens]
): string => {
  return componentOpacityTokens[component][state];
};

// Conditional opacity helpers
export const getConditionalOpacity = (
  condition: boolean,
  trueOpacity: OpacityLevel | SemanticOpacity,
  falseOpacity: OpacityLevel | SemanticOpacity = "100"
): string => {
  const opacityClass = condition
    ? getOpacityClass(trueOpacity)
    : getOpacityClass(falseOpacity);

  return opacityClass;
};

// Hover and focus opacity helpers
export const getInteractiveOpacityClasses = (
  disabled = false,
  hoverOpacity: OpacityLevel | SemanticOpacity = "hover",
  focusOpacity: OpacityLevel | SemanticOpacity = "focus",
  activeOpacity: OpacityLevel | SemanticOpacity = "active"
): string => {
  const classes: string[] = [];

  if (!disabled) {
    classes.push(getOpacityClass(hoverOpacity));
    classes.push(getOpacityClass(focusOpacity));
    classes.push(getOpacityClass(activeOpacity));
  }

  return classes.join(" ");
};

// Transition-based opacity helpers
export const getOpacityTransitionClasses = (
  duration: "fast" | "normal" | "slow" = "normal",
  property: "opacity" | "all" = "opacity"
): string => {
  const durationMap = {
    fast: "transition-opacity duration-75",
    normal: "transition-opacity duration-200",
    slow: "transition-opacity duration-300",
  };

  return durationMap[duration];
};

// Combined opacity and transition helpers
export const getSmoothOpacityClasses = (
  opacityLevel: OpacityLevel | SemanticOpacity,
  duration: "fast" | "normal" | "slow" = "normal"
): string => {
  return `${getOpacityClass(opacityLevel)} ${getOpacityTransitionClasses(duration)}`;
};

// Responsive opacity helpers
export const responsiveOpacityTokens = {
  mobile: {
    hover: "opacity-80",
    focus: "opacity-90",
    active: "opacity-70",
  },
  tablet: {
    hover: "opacity-75",
    focus: "opacity-80",
    active: "opacity-90",
  },
  desktop: {
    hover: "opacity-75",
    focus: "opacity-80",
    active: "opacity-90",
  },
} as const;

export type ResponsiveBreakpoint = keyof typeof responsiveOpacityTokens;

export const getResponsiveOpacityClass = (
  breakpoint: ResponsiveBreakpoint,
  state: keyof typeof responsiveOpacityTokens[keyof typeof responsiveOpacityTokens]
): string => {
  const opacity = responsiveOpacityTokens[breakpoint][state];
  return getOpacityClass(opacity as OpacityLevel | SemanticOpacity);
};

// Advanced opacity composition helpers
export const composeOpacityClasses = (
  baseOpacity: OpacityLevel | SemanticOpacity,
  states: Array<{
    condition: boolean;
    opacity: OpacityLevel | SemanticOpacity;
    duration?: "fast" | "normal" | "slow";
  }>
): string => {
  const classes = [getOpacityClass(baseOpacity)];

  for (const state of states) {
    if (state.condition) {
      const opacityClass = getOpacityClass(state.opacity);
      const transitionClass = state.duration
        ? getOpacityTransitionClasses(state.duration)
        : "transition-opacity";

      classes.push(`${opacityClass} ${transitionClass}`);
    }
  }

  return classes.join(" ");
};

// Opacity patterns for common use cases
export const opacityPatterns = {
  // Button interactions
  button: (disabled = false) => `
    ${getOpacityClass(disabled ? "disabled" : "100")}
    ${!disabled ? getInteractiveOpacityClasses(disabled) : ""}
    transition-colors duration-200
  `,

  // Input states
  input: (disabled = false, error = false) => `
    ${getOpacityClass(disabled ? "disabled" : "100")}
    ${error ? getOpacityClass("error") : ""}
    ${getOpacityTransitionClasses("normal")}
  `,

  // Card hover effects
  card: (disabled = false) => `
    ${getOpacityClass(disabled ? "disabled" : "100")}
    ${!disabled ? getComponentOpacityClass("card", "hover") : ""}
    transition-all duration-200
  `,

  // Modal backdrop
  modalBackdrop: `
    ${getOpacityClass("overlay")}
    ${getOpacityTransitionClasses("normal")}
  `,

  // Loading states
  loading: `
    ${getOpacityClass("loading")}
    ${getOpacityTransitionClasses("slow")}
    animate-pulse
  `,

  // Placeholder text
  placeholder: `
    ${getOpacityClass("placeholder")}
    ${getOpacityTransitionClasses("fast")}
  `,
} as const;

// Opacity validation helpers
export const isValidOpacityLevel = (level: string): level is OpacityLevel | SemanticOpacity => {
  return level in opacityTokens || level in semanticOpacityTokens;
};

export const getOpacityError = (invalidLevel: string): string => {
  const validLevels = [
    ...Object.keys(opacityTokens),
    ...Object.keys(semanticOpacityTokens),
  ].join(", ");

  return `Invalid opacity level: "${invalidLevel}". Valid levels are: ${validLevels}`;
};

// Debug opacity utilities
export const debugOpacityClasses = {
  debug: "ring-2 ring-red-500 ring-opacity-50",
  debugHover: "hover:ring-opacity-100",
  debugActive: "active:ring-opacity-75",
} as const;

export const getDebugOpacityClass = (enabled = false): string => {
  return enabled ? debugOpacityClasses.debug : "";
};