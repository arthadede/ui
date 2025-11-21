# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@histweety/ui`, a reusable React component library built with TypeScript, Tailwind CSS v4, and modern tooling. The library is designed for distribution via NPM with dual module format support (ESM and CJS).

**Tech Stack:**
- React 19
- TypeScript 5.7+
- Tailwind CSS 4.0
- tsup (build tool)
- Storybook 8.4+ (component documentation)
- ESLint + Prettier

## Essential Commands

### Development
```bash
npm run dev              # Build in watch mode (uses tsup)
npm run storybook        # Start Storybook dev server on port 6006
```

### Build & Quality
```bash
npm run build            # Production build (outputs to dist/)
npm run lint             # Lint with ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changing files
npm run build-storybook  # Build Storybook for deployment
```

### Publishing
```bash
npm version patch        # Bump version (0.1.0 -> 0.1.1)
npm run build            # Must build before publishing
npm publish --access public
```

## Architecture & Patterns

### Component Structure

All components follow a consistent directory structure:

```
src/components/ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Re-exports component and types
```

**Key Conventions:**
- Components use **default exports** in their implementation files
- Index files use **named exports** for the component and its types
- All components must be exported from `src/index.ts` for library consumers

### Styling Approach

**Tailwind CSS with Inline Classes:**
- Components use Tailwind utility classes directly in className props
- **DO NOT use JSDoc comments** - this is explicitly forbidden in this codebase
- No CSS modules or separate CSS files per component
- Configuration objects define variants (e.g., size, variant) that map to Tailwind classes
- Global styles are in `src/styles/globals.css` (imported in src/index.ts)

Example pattern from Button component:
```tsx
const sizeConfig: Record<"sm" | "md" | "lg", { container: string; text: string }> = {
  sm: { container: "gap-2 p-2", text: "text-sm leading-5 font-medium" },
  md: { container: "gap-2 p-2", text: "text-base leading-6 font-medium" },
  lg: { container: "gap-3 p-3", text: "text-base leading-6 font-semibold" },
};
```

### Icon System

Icons are SVG components stored in `src/components/Icon/svgs/` and registered in an `iconMap` object within `Icon.tsx`. The Icon component uses a string-based lookup system:

```tsx
<Icon name="search" size={24} />
```

**Adding new icons:**
1. Create SVG component in `src/components/Icon/svgs/icon-name.tsx`
2. Import in `Icon.tsx`
3. Add to `iconMap` object with kebab-case key

### Build System

**tsup configuration** (`tsup.config.ts`):
- Entry point: `src/index.ts`
- Outputs: CJS (`dist/index.js`) and ESM (`dist/index.mjs`)
- TypeScript declarations generated with sourcemaps
- Styles injected automatically via `injectStyle: true`
- React/React-DOM are external peer dependencies

### Component Export Pattern

Every new component must be added to `src/index.ts`:

```tsx
export { ComponentName } from './components/ComponentName';
export type { ComponentNameProps } from './components/ComponentName';
```

This ensures the component is available when consumers import from `@histweety/ui`.

### Storybook Integration

Stories follow the CSF3 (Component Story Format 3) pattern:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Component from './Component';

const meta = {
  title: 'Components/Component',
  component: Component,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { /* ... */ },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* ... */ },
};
```

Stories are automatically discovered via the pattern in `.storybook/main.ts`.

## Component Development Workflow

1. **Create component structure** in `src/components/YourComponent/`
2. **Implement component** with TypeScript types, using Tailwind classes
3. **Create Storybook stories** showing all variants and states
4. **Export from index.ts** in component folder (named exports)
5. **Add to src/index.ts** for library consumers
6. **Test in Storybook**: Run `npm run storybook` to verify visually
7. **Build**: Run `npm run build` to ensure it compiles correctly

## Important Constraints

- **Never add JSDoc comments** - the codebase explicitly avoids them
- **Always use named exports** in index files, default exports in component files
- **Tailwind-only styling** - no CSS-in-JS, no separate CSS files per component
- **React 19 compatibility** - ensure hooks and patterns work with React 19
- **Peer dependencies** - React and React-DOM must remain external
- **Type safety** - all components must have proper TypeScript types exported

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- Stories and tests excluded from build (`**/*.stories.tsx`, `**/*.test.tsx`)
