/**
 * Z-index layering system for @histweety/ui
 * Ensures proper layering of UI elements with consistent z-index values
 */

// Z-index level tokens
export type ZIndexLevel =
  | "base"           // Base layer (z-0) - Normal content flow
  | "dropdown"       // Dropdowns and menus (z-10)
  | "sticky"         // Sticky elements (z-20)
  | "fixed"          // Fixed elements (z-30)
  | "modal-backdrop" // Modal backdrops (z-40)
  | "modal"          // Modals and overlays (z-50)
  | "popover"        // Popovers and tooltips (z-50)
  | "notification"   // Toasts and notifications (z-50)
  | "max"            // Maximum z-index (z-50) - Highest priority
  | "auto"           // Auto z-index
  | "skip"           // Skip z-index for transparent overlays
  | "below"          // Below normal content (z-10)
  | "above"          // Above normal content (z-20)
  | "high"           // High priority (z-30)
  | "highest"        // Highest priority (z-50);

// Z-index tokens mapping
export const zIndexTokens: Record<ZIndexLevel, string> = {
  base: "z-0",
  dropdown: "z-10",
  sticky: "z-20",
  fixed: "z-30",
  "modal-backdrop": "z-40",
  modal: "z-50",
  popover: "z-50",
  notification: "z-50",
  max: "z-50",
  auto: "z-auto",
  skip: "",
  below: "z-10",
  above: "z-20",
  high: "z-30",
  highest: "z-50",
} as const;

// Semantic z-index groups
export type ZIndexGroup = "content" | "navigation" | "overlay" | "modal" | "notification";

export const zIndexGroups: Record<ZIndexGroup, ZIndexLevel> = {
  content: "base",
  navigation: "dropdown",
  overlay: "fixed",
  modal: "modal",
  notification: "notification",
} as const;

// Component-specific z-index tokens
export const componentZIndexTokens = {
  // Navigation
  navDropdown: "z-40", // Lower than modal but above content
  navMenu: "z-30",

  // Forms
  selectDropdown: "z-20",
  datePicker: "z-30",
  timePicker: "z-30",

  // Modals
  modal: "z-50",
  modalBackdrop: "z-40",
  modalHeader: "z-50",

  // Tooltips and Popovers
  tooltip: "z-50",
  popover: "z-50",
  tooltipTrigger: "z-auto",

  // Notifications
  toast: "z-50",
  notification: "z-50",
  alert: "z-40",

  // Overlays
  overlay: "z-40",
  loadingOverlay: "z-50",
  fullscreenOverlay: "z-50",

  // Interactive elements
  dragHandle: "z-30",
  resizeHandle: "z-30",

  // Content layers
  sidebar: "z-20",
  drawer: "z-30",
  panel: "z-10",
} as const;

// Z-index utility functions
export const getZIndexClass = (level: ZIndexLevel): string => {
  return zIndexTokens[level];
};

export const getGroupZIndex = (group: ZIndexGroup): string => {
  return getZIndexClass(zIndexGroups[group]);
};

export const getComponentZIndex = (component: keyof typeof componentZIndexTokens): string => {
  return componentZIndexTokens[component];
};

// Z-index ordering helpers
export const createZIndexStack = (...levels: ZIndexLevel[]): string[] => {
  return levels.map(level => getZIndexClass(level));
};

// Z-index validation helpers
export const isValidZIndex = (level: ZIndexLevel): boolean => {
  return level in zIndexTokens;
};

export const getZIndexValue = (level: ZIndexLevel): number | string => {
  const token = zIndexTokens[level];
  if (token === "z-auto") return "auto";

  const match = token.match(/z-(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Z-index comparison helpers
export const isHigherZIndex = (level1: ZIndexLevel, level2: ZIndexLevel): boolean => {
  return getZIndexValue(level1) > getZIndexValue(level2);
};

export const isLowerZIndex = (level1: ZIndexLevel, level2: ZIndexLevel): boolean => {
  return getZIndexValue(level1) < getZIndexValue(level2);
};

// Z-index adjustment helpers
export const getZIndexAbove = (level: ZIndexLevel): ZIndexLevel => {
  const value = getZIndexValue(level);

  if (typeof value === "number") {
    if (value < 10) return "dropdown";
    if (value < 20) return "sticky";
    if (value < 30) return "fixed";
    if (value < 40) return "modal";
    return "highest";
  }

  return level;
};

export const getZIndexBelow = (level: ZIndexLevel): ZIndexLevel => {
  const value = getZIndexValue(level);

  if (typeof value === "number") {
    if (value > 50) return "modal";
    if (value > 40) return "modal-backdrop";
    if (value > 30) return "fixed";
    if (value > 20) return "sticky";
    return "base";
  }

  return level;
};

// Z-index composition helpers
export const getZIndexClasses = (
  baseLevel: ZIndexLevel = "auto",
  ...additionalLevels: ZIndexLevel[]
): string => {
  const classes = [getZIndexClass(baseLevel)];

  for (const level of additionalLevels) {
    if (level !== "auto") {
      classes.push(getZIndexClass(level));
    }
  }

  return classes.join(" ");
};

// Conditional z-index helpers
export const getConditionalZIndex = (
  condition: boolean,
  trueLevel: ZIndexLevel,
  falseLevel: ZIndexLevel = "auto"
): string => {
  return condition ? getZIndexClass(trueLevel) : getZIndexClass(falseLevel);
};

// Responsive z-index helpers
export const responsiveZIndexTokens = {
  mobile: {
    dropdown: "z-20",
    modal: "z-40",
    notification: "z-40",
  },
  tablet: {
    dropdown: "z-30",
    modal: "z-50",
    notification: "z-50",
  },
  desktop: {
    dropdown: "z-10",
    modal: "z-50",
    notification: "z-50",
  },
} as const;

export type ResponsiveBreakpoint = keyof typeof responsiveZIndexTokens;

export const getResponsiveZIndex = (
  breakpoint: ResponsiveBreakpoint,
  component: keyof typeof responsiveZIndexTokens.mobile
): string => {
  return getZIndexClass(responsiveZIndexTokens[breakpoint][component] as ZIndexLevel);
};

// Z-index patterns
export const zIndexPatterns = {
  // Modal stack
  modalStack: getZIndexClasses("modal-backdrop", "modal"),

  // Dropdown menu
  dropdownStack: getZIndexClasses("modal-backdrop", "dropdown"),

  // Notification stack
  notificationStack: getZIndexClasses("modal", "notification"),

  // Tooltip with trigger
  tooltipWithTrigger: getZIndexClasses("tooltip", "tooltipTrigger"),

  // Fullscreen overlay
  fullscreenOverlayStack: getZIndexClasses("fullscreenOverlay", "modal"),
} as const;

// Z-index validation and error helpers
export const validateZIndexLevel = (level: string): ZIndexLevel | null => {
  if (level in zIndexTokens) {
    return level as ZIndexLevel;
  }
  return null;
};

export const getZIndexError = (invalidLevel: string): string => {
  const validLevels = Object.keys(zIndexTokens).join(", ");
  return `Invalid z-index level: "${invalidLevel}". Valid levels are: ${validLevels}`;
};

// Z-index ordering for complex layouts
export const layoutZIndexOrder = [
  "base",           // Normal content
  "below",          // Below normal content
  "dropdown",       // Dropdowns and navigation
  "sticky",         // Sticky elements
  "fixed",          // Fixed elements
  "above",          // Above normal content
  "high",           // High priority fixed elements
  "modal-backdrop", // Modal backgrounds
  "modal",          // Modals and popovers
  "popover",        // Popovers and tooltips
  "notification",   // Toasts and notifications
  "max",            // Maximum level
  "auto",           // Auto z-index
  "skip",           // Skip z-index
] as const satisfies ZIndexLevel[];

// Z-index stack creation with validation
export const createValidatedZIndexStack = (...levels: (ZIndexLevel | string)[]): string[] => {
  return levels
    .map(level => {
      if (isValidZIndex(level as ZIndexLevel)) {
        return getZIndexClass(level as ZIndexLevel);
      }
      console.warn(`Invalid z-index level: ${level}`);
      return "";
    })
    .filter(Boolean);
};