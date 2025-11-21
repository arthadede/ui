# Design Tokens

This directory contains the centralized design token system for the @histweety/ui component library.

## Overview

Design tokens provide a single source of truth for sizing, spacing, typography, and other design properties across all components. This ensures consistency and makes it easy to update designs system-wide.

## Size Tokens

The size token system (`size.ts`) defines three coordinated size scales: `sm`, `md`, and `lg`.

### Token Structure

Each size includes:
- `padding`: Component padding (Tailwind class)
- `gap`: Spacing between child elements (Tailwind class)
- `iconSize`: Icon dimensions in pixels
- `fontSize`: Text size (Tailwind class)
- `lineHeight`: Text line height (Tailwind class)
- `fontWeight`: Text font weight (Tailwind class)
- `height`: Component height (Tailwind class)
- `minWidth`: Minimum width for buttons (Tailwind class)

### Available Sizes

#### Small (`sm`)
- Padding: `p-2` (8px)
- Gap: `gap-2` (8px)
- Icon Size: 20px
- Font: text-sm, leading-5, font-medium
- Height: h-9 (36px)
- Min Width: 120px

#### Medium (`md`) - Default
- Padding: `p-2` (8px)
- Gap: `gap-2` (8px)
- Icon Size: 24px
- Font: text-base, leading-6, font-medium
- Height: h-10 (40px)
- Min Width: 150px

#### Large (`lg`)
- Padding: `p-3` (12px)
- Gap: `gap-3` (12px)
- Icon Size: 28px
- Font: text-base, leading-6, font-semibold
- Height: h-12 (48px)
- Min Width: 180px

## Color Tokens

The color token system (`color.ts`) defines appearance variants for interactive components with granular control over background, text, hover states, disabled states, and borders.

### Token Structure

Each variant includes:
- `background`: Background color (Tailwind class)
- `text`: Text color (Tailwind class)
- `hover`: Hover state styles (Tailwind class)
- `disabled`: Disabled state styles (Tailwind class)
- `border`: Border styles (Tailwind class, empty string if no border)

### Available Variants

#### Primary
- Background: `bg-white/96` (96% opacity white)
- Text: `text-black`
- Hover: `hover:bg-white`
- Disabled: `disabled:text-black/60`
- Border: None

**Use for:** Primary actions, call-to-action buttons, high-emphasis interactions.

#### Secondary
- Background: `bg-white/4` (4% opacity white)
- Text: `text-white`
- Hover: `hover:bg-white/8`
- Disabled: `disabled:text-white/30`
- Border: `border border-white/10`

**Use for:** Secondary actions, less emphasized but still important interactions.

#### Transparent
- Background: None
- Text: `text-white`
- Hover: `hover:bg-white/8`
- Disabled: `disabled:opacity-60`
- Border: None

**Use for:** Tertiary actions, icon buttons, minimal UI elements that shouldn't dominate the interface.

### Extending with New Variants

The color token system is designed to easily accommodate additional variants like `danger`, `success`, or `warning`. To add a new variant:

1. **Update the type definition** in `src/tokens/color.ts`:
```tsx
export type ComponentVariant = "primary" | "secondary" | "transparent" | "danger" | "success";
```

2. **Add the new variant to `colorTokens`**:
```tsx
export const colorTokens: Record<ComponentVariant, ColorToken> = {
  // ... existing variants
  danger: {
    background: "bg-red-500",
    text: "text-white",
    hover: "hover:bg-red-600",
    disabled: "disabled:bg-red-300 disabled:text-white/60",
    border: "",
  },
  success: {
    background: "bg-green-500",
    text: "text-white",
    hover: "hover:bg-green-600",
    disabled: "disabled:bg-green-300 disabled:text-white/60",
    border: "",
  },
};
```

3. **Update component prop types** if needed (some components may only use a subset of variants):
```tsx
// IconButton uses all variants
variant?: ComponentVariant;

// Button only uses primary and secondary
variant?: "primary" | "secondary";

// Or use Exclude utility type
variant?: Exclude<ComponentVariant, "transparent">;
```

4. **Test the new variants** in Storybook and update component stories.

## Usage

### For Component Developers

#### Using Size Tokens

Import the token utilities in your component:

```tsx
import { getSizeClasses, type ComponentSize } from "../../tokens";

export type MyComponentProps = {
  size?: ComponentSize;
};

export default function MyComponent({ size = "md" }: MyComponentProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses.container} ${sizeClasses.text}`}>
      <Icon name="example" size={sizeClasses.iconSize} />
      <span>Content</span>
    </div>
  );
}
```

#### Using Color Tokens

Import color utilities for variant styling:

```tsx
import { getVariantClasses, type ComponentVariant } from "../../tokens";

export type MyComponentProps = {
  variant?: ComponentVariant;
};

export default function MyComponent({ variant = "primary" }: MyComponentProps) {
  const variantClasses = getVariantClasses(variant);

  return (
    <button className={`rounded px-4 py-2 ${variantClasses}`}>
      Click me
    </button>
  );
}
```

#### Using Both Size and Color Tokens

Combine both token systems for full consistency:

```tsx
import {
  getSizeClasses,
  getVariantClasses,
  type ComponentSize,
  type ComponentVariant
} from "../../tokens";

export type MyComponentProps = {
  size?: ComponentSize;
  variant?: ComponentVariant;
};

export default function MyComponent({
  size = "md",
  variant = "primary"
}: MyComponentProps) {
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);

  return (
    <button className={[
      "rounded transition-colors", // Base styles
      sizeClasses.container,
      sizeClasses.text,
      variantClasses,
    ].filter(Boolean).join(" ")}>
      <Icon name="check" size={sizeClasses.iconSize} />
      <span>Button</span>
    </button>
  );
}
```

### For Library Consumers

Consumers can access tokens directly if needed for custom implementations:

#### Size Tokens

```tsx
import { sizeTokens, getComponentSize, getSizeClasses } from "@histweety/ui";

// Get all tokens for a specific size
const mediumTokens = getComponentSize("md");
console.log(mediumTokens.iconSize); // 24

// Access raw token values
console.log(sizeTokens.lg.padding); // "p-3"

// Get composed classes
const classes = getSizeClasses("sm");
console.log(classes.container); // "p-2 gap-2"
```

#### Color Tokens

```tsx
import { colorTokens, getComponentVariant, getVariantClasses } from "@histweety/ui";

// Get all tokens for a specific variant
const primaryTokens = getComponentVariant("primary");
console.log(primaryTokens.background); // "bg-white/96"
console.log(primaryTokens.text); // "text-black"

// Access raw token values
console.log(colorTokens.secondary.border); // "border border-white/10"

// Get composed class string (most common use case)
const variantClasses = getVariantClasses("primary");
console.log(variantClasses); // "bg-white/96 text-black hover:bg-white disabled:text-black/60"
```

## API Reference

### `ComponentSize`

Type definition for valid component sizes.

```tsx
type ComponentSize = "sm" | "md" | "lg";
```

### `sizeTokens`

Raw token object containing all size definitions.

```tsx
const sizeTokens: {
  sm: { padding: string; gap: string; iconSize: number; ... };
  md: { padding: string; gap: string; iconSize: number; ... };
  lg: { padding: string; gap: string; iconSize: number; ... };
};
```

### `getComponentSize(size: ComponentSize)`

Returns the complete token set for a given size.

```tsx
const tokens = getComponentSize("md");
// Returns: { padding: "p-2", gap: "gap-2", iconSize: 24, ... }
```

### `getSizeClasses(size: ComponentSize)`

Returns commonly-used class combinations for convenience.

```tsx
const classes = getSizeClasses("lg");
// Returns:
// {
//   container: "p-3 gap-3",        // Combined padding and gap
//   text: "text-base leading-6 font-semibold",  // Combined typography
//   iconSize: 28,                  // Icon pixel size
//   height: "h-12",                // Component height
//   minWidth: "min-w-[180px]",     // Minimum width
//   padding: "p-3",                // Individual padding
//   gap: "gap-3"                   // Individual gap
// }
```

### `ComponentVariant`

Type definition for valid color variants.

```tsx
type ComponentVariant = "primary" | "secondary" | "transparent";
```

### `colorTokens`

Raw token object containing all color variant definitions.

```tsx
const colorTokens: {
  primary: {
    background: string;
    text: string;
    hover: string;
    disabled: string;
    border: string;
  };
  secondary: { ... };
  transparent: { ... };
};
```

### `getComponentVariant(variant: ComponentVariant)`

Returns the complete color token set for a given variant.

```tsx
const tokens = getComponentVariant("primary");
// Returns:
// {
//   background: "bg-white/96",
//   text: "text-black",
//   hover: "hover:bg-white",
//   disabled: "disabled:text-black/60",
//   border: ""
// }
```

### `getVariantClasses(variant: ComponentVariant)`

Returns a pre-composed string of all variant classes. This is the most commonly used function.

```tsx
const classes = getVariantClasses("secondary");
// Returns: "bg-white/4 text-white hover:bg-white/8 disabled:text-white/30 border border-white/10"
```

## Best Practices

### Do's

**Size Tokens:**
- Always use `getSizeClasses()` for consistent sizing across components
- Import `ComponentSize` type for prop definitions
- Use the `iconSize` value when passing size to Icon component
- Apply `container` classes for padding and gap together
- Apply `text` classes for coordinated typography

**Color Tokens:**
- Always use `getVariantClasses()` for consistent variant styling
- Import `ComponentVariant` type for prop definitions
- Use semantic variant names (primary, secondary, etc.) instead of color names
- Constrain variant types when components don't support all variants
- Combine size and color tokens for complete component consistency

### Don'ts

**Size Tokens:**
- Don't hard-code pixel values or Tailwind classes for sizing
- Don't create custom size scales without updating the token system
- Don't mix token-based sizing with arbitrary values

**Color Tokens:**
- Don't hard-code color classes or variant styles in components
- Don't create custom variants without updating the token system
- Don't mix token-based colors with inline style variants

**General:**
- Don't modify token values without considering all consuming components
- Don't bypass the token system for one-off customizations

## Extending the System

To add new size scales or modify existing ones:

1. Update `sizeTokens` in `src/tokens/size.ts`
2. Update the `ComponentSize` type if adding new sizes
3. Test all components to ensure they work with the new values
4. Update this documentation
5. Update component Storybook stories to showcase new sizes

## Migration Guide

### Migrating Size Tokens

If you have existing components with hard-coded sizes:

**Before (Hard-coded):**

```tsx
const sizeConfig = {
  sm: { container: "gap-2 p-2", iconSize: 20 },
  md: { container: "gap-2 p-2", iconSize: 24 },
  lg: { container: "gap-3 p-3", iconSize: 24 },
};

const sizeClasses = sizeConfig[size];
```

**After (Token-based):**

```tsx
import { getSizeClasses, type ComponentSize } from "../../tokens";

export type MyComponentProps = {
  size?: ComponentSize;
};

export default function MyComponent({ size = "md" }: MyComponentProps) {
  const sizeClasses = getSizeClasses(size);
  // Use sizeClasses.container, sizeClasses.iconSize, etc.
}
```

### Migrating Color Tokens

If you have existing components with hard-coded variant styles:

**Before (Hard-coded):**

```tsx
const variantConfig: Record<"primary" | "secondary", string> = {
  primary: "bg-white/96 text-black hover:bg-white disabled:text-black/60",
  secondary: "bg-white/4 border border-white/10 text-white hover:bg-white/8 disabled:text-white/30",
};

const currentVariant = variantConfig[variant];

return (
  <button className={`${baseClasses} ${currentVariant}`}>
    Click me
  </button>
);
```

**After (Token-based):**

```tsx
import { getVariantClasses, type ComponentVariant } from "../../tokens";

export type MyComponentProps = {
  variant?: ComponentVariant; // Or constrain to specific variants
};

export default function MyComponent({ variant = "primary" }: MyComponentProps) {
  const variantClasses = getVariantClasses(variant);

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      Click me
    </button>
  );
}
```

### Migration Checklist

- [ ] Import token utilities (`getSizeClasses`, `getVariantClasses`)
- [ ] Import types (`ComponentSize`, `ComponentVariant`)
- [ ] Remove local `sizeConfig` or `variantConfig` objects
- [ ] Replace hard-coded classes with token-based helpers
- [ ] Update component prop types to use token types
- [ ] Test all size/variant combinations in Storybook
- [ ] Verify TypeScript types are correct
- [ ] Run build to ensure no errors

## Future Additions

Planned token categories:
- **Border radius tokens** - Rounded corners, component-specific rounding
- **Shadow tokens** - Elevation system, depth hierarchy
- **Animation tokens** - Transition durations, easing functions
- **Spacing tokens** - Margins, gutters, layout spacing
- **Breakpoint tokens** - Responsive design breakpoints
- **Z-index tokens** - Stacking order, layering system
