# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a reusable React component library (@histweety/ui) built with TypeScript, Tailwind CSS v4, and modern tooling. It's designed as a comprehensive design system with dual ESM/CJS module support and includes extensive documentation via Storybook.

## Development Commands

### Build & Development
- `npm run dev` - Build in watch mode using tsup
- `npm run build` - Production build using tsup
- `npm run prepubishOnly` - Build before publishing to NPM

### Code Quality
- `npm run lint` - Lint TypeScript/React code with ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without modifying files

### Documentation
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for deployment

## Comprehensive Styling Architecture

### Design Token System (`src/tokens/`)

The styling system is built around a sophisticated token architecture with separate modules:

#### **Size Tokens** (`src/tokens/size.ts`)
```typescript
type ComponentSize = "sm" | "md" | "lg" | "xl";

export const sizeTokens = {
  sm: { padding: "p-2", gap: "gap-2", iconSize: 20, size: "size-9" },
  md: { padding: "p-2", gap: "gap-2", iconSize: 24, size: "size-10" },
  lg: { padding: "p-3", gap: "gap-3", iconSize: 24, size: "size-12" },
  xl: { padding: "p-4", gap: "gap-4", iconSize: 28, size: "size-16" },
};
```

#### **Color Tokens** (`src/tokens/color.ts`)
- **Static variants**: `dark`, `light`, `transparent`, `success`, `error`, `warning`, `info`
- **Specialized variants**: `input-dark`, `input-light`, `surface-dark`, `surface-light`
- **Adaptive variants**: Automatic theme switching based on system preference
- **Utility functions**: `getVariantClasses()`, `getAdaptiveVariantClassesString()`

#### **New Token Systems** (Enhanced Architecture):
- **Spacing Tokens** (`src/tokens/spacing.ts`): Atomic 1-96 scale + semantic tokens (none, xs, sm, compact, normal, relaxed, xl, 2xl, 3xl) for padding, margin, gap
- **Layout Tokens** (`src/tokens/layout.ts`): Container utilities, grid systems, positioning helpers
- **Animation Tokens** (`src/tokens/animation.ts`): Durations (fast/normal/slow), easings, transition presets
- **Z-Index Tokens** (`src/tokens/zIndex.ts`): Semantic layering (base, dropdown, sticky, fixed, modal-backdrop, modal)
- **Opacity Tokens** (`src/tokens/opacity.ts`): Numeric (0-100) + semantic (disabled, faded, subtle, medium, strong)

#### **Typography Tokens** (`src/tokens/typography.ts`)
```typescript
// Atomic tokens (direct Tailwind mappings)
export const fontSizeTokens = { xs: "text-xs", base: "text-base", ... };
export const lineHeightTokens = { "6": "leading-6", ... };
export const fontWeightTokens = { normal: "font-normal", semibold: "font-semibold", ... };

// Semantic tokens for UI patterns
export const semanticTypographyTokens = {
  body: { fontSize: "text-sm", lineHeight: "leading-5", fontWeight: "font-normal", ... },
  "heading-1": { fontSize: "text-4xl", lineHeight: "leading-10", fontWeight: "font-bold", ... },
  // ... other semantic definitions
};
```

#### **Border & Shadow Tokens** (`src/tokens/border.ts`)
- Border radius: `none`, `sm`, `md`, `lg`, `xl`, `full`
- Shadow levels: `none`, `sm`, `md`, `lg`, `xl`

### Theme System (`src/contexts/ThemeContext.tsx`)

#### **Three-Mode Theme System**:
```typescript
type Theme = 'light' | 'dark' | 'system';

// Components can use:
const { theme, resolvedTheme, setTheme } = useTheme();
const resolvedTheme = useResolvedTheme(); // Just the actual theme
```

#### **Theme Switching Mechanism**:
- **Light/Dark**: Manual theme selection via `.dark` CSS class
- **System**: Automatic detection using `prefers-color-scheme`
- **Local Storage**: Persists user preference
- **CSS Variables**: `--background` and `--foreground` for root colors

### Global Styles (`src/styles/globals.css`)

#### **Font System**:
- **Inter Font**: Complete font-face declarations with weight-specific files (100-900)
- **Font Fallbacks**: System font stack with `-apple-system`, `BlinkMacSystemFont`, etc.
- **Performance**: `font-display: swap` for loading optimization

#### **CSS Animations**:
- Slide animations: `slideInFromLeft`, `slideInFromRight`, `slideInFromTop`, `slideInFromBottom`
- Transitions: `fadeIn`, `zoomIn`
- **Cubic Bezier**: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth motion

#### **MDX Editor Theme** (`src/styles/globals.css:200+`):
- **Typora-Inspired**: Clean, minimalist design for distraction-free writing
- **Three Mode Support**: `.mdx-editor-light`, `.mdx-editor-dark`, `.mdx-editor-auto`
- **Comprehensive Styling**: Full coverage of MDXEditor components including:
  - Toolbar buttons and dropdowns
  - Typography elements (headings, paragraphs, lists, blockquotes)
  - Code blocks and inline code with dark mode adaptations
  - Tables with hover states and striped rows
  - Links, images, horizontal rules
  - Dialogs and modals
  - Selection colors and focus states

### Tailwind CSS Configuration (`tailwind.config.ts`)

#### **Key Features**:
- **Content Sources**: `'./src/**/*.{js,ts,jsx,tsx,mdx}'`
- **Dark Mode**: `'class'` strategy for manual theme switching
- **Plugins**:
  - `tailwindcss-animate` for animation utilities
  - `@tailwindcss/typography` for text styling
- **Font Configuration**: Inter font with full system font fallbacks
- **CSS Variables**: `--background` and `--foreground` for theme colors

### Component Styling Patterns

#### **Standard Component Structure**:
```typescript
// 1. Import token utilities
import { getSizeClasses, getVariantClasses, getTypographyForSize } from '../../tokens';

// 2. Apply token classes
const baseClasses = "flex items-center rounded transition-colors";
const sizeClasses = getSizeClasses(size);
const variantClasses = getVariantClasses(mode);
const typographyClasses = getTypographyForSize(size);

// 3. Combine classes
className={[baseClasses, sizeClasses.container, variantClasses, typographyClasses.className].filter(Boolean).join(' ')}
```

#### **Enhanced Token Usage Patterns**:
```typescript
// Using helper functions for consistency
import { componentHelpers } from '../../tokens';

// For buttons:
const buttonClasses = componentHelpers.createButtonClasses({
  size, variant, mode, disabled, fullWidth
});

// For cards:
const cardClasses = componentHelpers.createCardClasses({
  mode, padding, shadow, borderRadius
});

// For inputs:
const inputClasses = componentHelpers.createInputClasses({
  size, mode, disabled, error
});

// Using spacing tokens consistently:
import { getSpacingClasses, getPaddingClasses } from '../../tokens';
const spacing = getSpacingClasses('normal');  // gap, margin, padding
const padding = getPaddingClasses('lg');      // specific padding
```

#### **Theme-Aware Components**:
- **Mode Prop**: Components accept `mode?: 'dark' | 'light' | 'auto'`
- **Adaptive Variants**: Use `getAdaptiveVariantClassesString()` for automatic theme switching
- **Static Variants**: Use `getVariantClasses()` for explicit theme control

#### **MDX Integration**:
- **Rich Text Editing**: Full MDXEditor support with custom theming
- **Typography Consistency**: Aligns with component typography tokens
- **Dark Mode Support**: Enhanced styling for dark theme with reduced contrast

### Architecture & Structure

### Component Organization
Components follow a consistent structure:
```
src/components/ComponentName/
├── ComponentName.tsx        # Main component implementation
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                 # Re-export component
```

### Key Architecture Patterns

**Tokens System** (`src/tokens/`):
- Comprehensive design token architecture across size, color, typography, border, shadow, spacing, layout, animation, z-index, and opacity
- Theme-aware color tokens with adaptive variants
- Utility functions for component styling (`getComponentSize`, `getVariantClasses`)
- Semantic typography tokens for consistent text styling
- **Enhanced Token Helpers** (`src/tokens/helpers.ts`):
  - `componentHelpers` with pre-built functions for common component patterns
  - `createButtonClasses()`, `createCardClasses()`, `createInputClasses()`, `createIconClasses()`
  - `tokenPresets` for commonly used token combinations
  - `useTokenHelpers()` React hook for functional components

**Theme System** (`src/contexts/ThemeContext.tsx`):
- React Context for theme management with three modes (light/dark/system)
- `useTheme` and `useResolvedTheme` hooks for component theming
- CSS-based theme switching with local storage persistence
- System preference detection with automatic updates

**Layout System** (`src/layouts/`):
- `OverlayLayout` for modal/drawer patterns with animations
- `LayoutCenter` for centered layouts
- Context-based overlay management

**Widget Components** (`src/widgets/`):
- Higher-level composite components
- `LoginCard`, `ErrorCard`, `InputPin`, `FileDropzone`

### Build Configuration
- **tsup**: Dual ESM/CJS builds with CSS injection and font copying
- **TypeScript**: Strict mode with ES2020 target, no unused vars
- **Tailwind CSS**: v4 with typography plugin, animate plugin, and CSS variables
- **PostCSS**: Tailwind v4 specific configuration (no autoprefixer needed)
- **Font handling**: Automatic copying of Inter font files to dist directory

### Entry Point Structure
Main entry point (`src/index.ts`) exports:
- Theme providers and hooks (`ThemeProvider`, `useTheme`, `useResolvedTheme`)
- Individual component exports with TypeScript types
- Complete token systems and utility functions
- Layout system exports

### Dependencies Note
- React 19 as peer dependency (not bundled)
- MDX editor integration for advanced markdown editing
- Tailwind CSS v4 specific configuration and features
- Storybook v8 for component documentation
- Comprehensive token system utilities

## Component Development Guidelines

When adding new components:
1. Create folder structure following existing patterns
2. Export both component and type from index.ts
3. Add Storybook stories for documentation
4. **Always use tokens** for styling - reference `/docs/token-usage-guide.md` for comprehensive best practices
5. Use helper functions from `componentHelpers` for common patterns (buttons, cards, inputs, icons)
6. Implement theme-aware styling with `mode` prop supporting 'dark' | 'light' | 'auto'
7. Use `getAdaptiveVariantClassesString()` for automatic theme switching
8. Use spacing tokens (`getSpacingClasses`, `getPaddingClasses`) instead of hardcoded spacing
9. Reference existing components like `Card`, `Button`, `Input` for patterns
10. Include in main entry point if it's a public API

## Token System Requirements

**MANDATORY**: All components must use tokens - no hardcoded Tailwind classes allowed:

### ✅ Required Token Usage:
- **Spacing**: Use `getSpacingClasses()` and `getPaddingClasses()` instead of `p-4`, `m-2`, `gap-3`
- **Typography**: Use `getTypographyToken()` or `getTypographyForSize()` instead of `text-sm`, `font-semibold`
- **Colors**: Use `getAdaptiveVariantClassesString()` or `getVariantClasses()` instead of `text-gray-900`
- **Sizes**: Use `getSizeClasses()` instead of `w-10`, `h-10`
- **Borders**: Use `getBorderRadiusClasses()` instead of `rounded-lg`
- **Shadows**: Use `getShadowClasses()` instead of `shadow-md`
- **Z-Index**: Use `getZIndexClass()` instead of `z-50`
- **Opacity**: Use `getOpacityClass()` instead of `opacity-75`
- **Animations**: Use `getTransitionClasses()` instead of `transition-colors duration-300`

### Helper Functions for Common Patterns:
```typescript
// Pre-built helpers for consistent styling:
componentHelpers.createButtonClasses()
componentHelpers.createCardClasses()
componentHelpers.createInputClasses()
componentHelpers.createIconClasses()
```

## Publishing

The library is configured for scoped NPM publishing:
- Version management via npm version commands
- Automatic build before publishing
- Dual ESM/CJS output with type definitions
- Font asset inclusion in build output