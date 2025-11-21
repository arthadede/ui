# Architecture: Centralized Sizing Token System

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                    Design Token System                      │
│                  src/tokens/size.ts                         │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│  │   sm    │  │   md    │  │   lg    │                    │
│  ├─────────┤  ├─────────┤  ├─────────┤                    │
│  │ p-2     │  │ p-2     │  │ p-3     │  padding           │
│  │ gap-2   │  │ gap-2   │  │ gap-3   │  gap               │
│  │ 20px    │  │ 24px    │  │ 28px    │  iconSize          │
│  │ text-sm │  │ text-base│  │ text-base│ fontSize          │
│  │ h-9     │  │ h-10    │  │ h-12    │  height            │
│  └─────────┘  └─────────┘  └─────────┘                    │
│                                                             │
│  Exported: sizeTokens, getComponentSize, getSizeClasses    │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ imports
                          ▼
    ┌─────────────────────────────────────────────┐
    │            Component Layer                  │
    │                                             │
    │  ┌──────────┐  ┌────────────┐  ┌────────┐ │
    │  │  Button  │  │ IconButton │  │  Icon  │ │
    │  └──────────┘  └────────────┘  └────────┘ │
    │       │              │              │      │
    │       └──────────────┴──────────────┘      │
    │              consumes tokens               │
    └─────────────────────────────────────────────┘
                          │
                          │ exported via
                          ▼
              ┌─────────────────────────┐
              │    Library Consumers    │
              │    (npm package users)  │
              └─────────────────────────┘
```

## System Components

### 1. Token Definition (`src/tokens/size.ts`)

The single source of truth for all sizing values.

**Key Features:**
- Type-safe with `as const` assertions
- Coordinated values across all size scales
- Extensible for future additions

**Exports:**
- `ComponentSize` type: `"sm" | "md" | "lg"`
- `sizeTokens`: Raw token object
- `getComponentSize()`: Get tokens for a specific size
- `getSizeClasses()`: Get pre-combined class strings

### 2. Component Integration

Components import and consume tokens via helper functions:

```tsx
// Import token utilities
import { getSizeClasses, type ComponentSize } from "../../tokens";

// Use in component
export default function MyComponent({ size = "md" }: Props) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={sizeClasses.container}>
      <Icon name="..." size={sizeClasses.iconSize} />
      <span className={sizeClasses.text}>Text</span>
    </div>
  );
}
```

### 3. Public API (`src/index.ts`)

Tokens are exported alongside components for advanced use cases:

```tsx
// Consumers can import
import { Button, sizeTokens, ComponentSize } from "@histweety/ui";
```

## Data Flow

```
┌────────────────────────────────────────────────────────────────┐
│ 1. Developer specifies size prop                              │
│    <Button size="md" />                                       │
└────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────────┐
│ 2. Component calls getSizeClasses("md")                       │
│    const sizeClasses = getSizeClasses(size);                  │
└────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────────┐
│ 3. Token system returns coordinated values                    │
│    {                                                           │
│      container: "p-2 gap-2",                                   │
│      text: "text-base leading-6 font-medium",                  │
│      iconSize: 24,                                             │
│      height: "h-10",                                           │
│      minWidth: "min-w-[150px]",                                │
│      padding: "p-2",                                           │
│      gap: "gap-2"                                              │
│    }                                                           │
└────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────────┐
│ 4. Component applies classes and passes iconSize              │
│    <button className={sizeClasses.container}>                 │
│      <Icon size={sizeClasses.iconSize} />                     │
│      <span className={sizeClasses.text}>Text</span>           │
│    </button>                                                   │
└────────────────────────────────────────────────────────────────┘
```

## Benefits

### 1. Consistency
- All components using `size="md"` have 24px icons, 8px padding, 8px gaps
- No more "medium looks different in Button vs IconButton"
- Designer intent preserved across entire component library

### 2. Maintainability
- Single file to update when design system changes
- No hunting through multiple components
- Type system catches breaking changes immediately

### 3. Developer Experience
- IntelliSense shows available sizes
- TypeScript ensures correct usage
- Impossible to accidentally use `"medium"` instead of `"md"`

### 4. Scalability
- Easy to add new sizes (xs, xl) without touching components
- Simple to add new token properties (borderRadius, shadow)
- Component implementations remain clean and focused

### 5. Documentation
- Tokens self-document the design system
- Easy to generate design system documentation
- New developers see the full system in one place

## Comparison: Before vs After

### Before (Inconsistent, duplicated)

```tsx
// Button.tsx
const sizeConfig = {
  sm: { container: "gap-2 p-2", iconSize: 20 },
  md: { container: "gap-2 p-2", iconSize: 24 },
  lg: { container: "gap-3 p-3", iconSize: 24 }, // ← lg icon same as md!
};

// IconButton.tsx
const sizeConfig = {
  sm: { container: "size-9 p-2", iconSize: 20 },
  md: { container: "h-10 w-10 p-2", iconSize: 24 },
  lg: { container: "size-12 p-3", iconSize: 24 }, // ← duplicated logic
};
```

**Problems:**
- Duplication across files
- Inconsistent icon sizes (lg is 24px, not scaled up)
- No type safety between components
- Hard to update consistently

### After (Consistent, centralized)

```tsx
// src/tokens/size.ts
export const sizeTokens = {
  sm: { padding: "p-2", gap: "gap-2", iconSize: 20, ... },
  md: { padding: "p-2", gap: "gap-2", iconSize: 24, ... },
  lg: { padding: "p-3", gap: "gap-3", iconSize: 28, ... }, // ← properly scaled
};

// Button.tsx
import { getSizeClasses, type ComponentSize } from "../../tokens";
const sizeClasses = getSizeClasses(size);

// IconButton.tsx
import { getSizeClasses, type ComponentSize } from "../../tokens";
const sizeClasses = getSizeClasses(size);
```

**Benefits:**
- Single source of truth
- All components use identical values
- Type-safe imports
- One place to update

## Performance Considerations

### Bundle Size Impact

The token system adds minimal overhead:
- Token object: ~500 bytes (compressed)
- Helper functions: ~200 bytes (compressed)
- **Total impact: <1KB**

### Runtime Performance

Token lookups are O(1) constant time:
```tsx
const sizeClasses = getSizeClasses("md"); // Simple object access
```

No runtime computation needed - all values are pre-defined strings.

### Tree Shaking

Tokens are properly tree-shakeable:
- Importing only `ComponentSize` type doesn't include runtime code
- Only used helper functions are included in bundle
- Dead code elimination works correctly

## Testing Strategy

### Unit Tests

Test token integrity:
```tsx
describe("sizeTokens", () => {
  it("should have consistent properties across all sizes", () => {
    const requiredKeys = ["padding", "gap", "iconSize", ...];

    Object.values(sizeTokens).forEach(tokens => {
      requiredKeys.forEach(key => {
        expect(tokens).toHaveProperty(key);
      });
    });
  });
});
```

### Integration Tests

Test component consumption:
```tsx
describe("Button with size tokens", () => {
  it("should render with correct icon size for md", () => {
    render(<Button size="md" leftIcon="search" />);
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("width", "24");
  });
});
```

### Visual Regression Tests

Use Storybook + Chromatic for visual testing:
- All size variants rendered in stories
- Automatic screenshot comparison
- Catch unintended visual changes

## Migration Checklist

When migrating a component to use tokens:

- [ ] Import `getSizeClasses` and `ComponentSize` type
- [ ] Remove local `sizeConfig` object
- [ ] Update size prop type to use `ComponentSize`
- [ ] Replace local config with `getSizeClasses(size)`
- [ ] Update className composition to use token classes
- [ ] Pass `sizeClasses.iconSize` to Icon components
- [ ] Update Storybook stories if needed
- [ ] Test all size variants visually
- [ ] Verify TypeScript compilation
- [ ] Update component documentation

## Governance

### When to Add New Sizes

Add new sizes when:
- Design system requires it
- User research shows need for more granularity
- Accessibility requirements demand it

**Process:**
1. Propose size with full token values
2. Review impact on all components
3. Update token system
4. Update all component implementations
5. Update documentation and stories
6. Version bump (minor version)

### When to Add New Token Properties

Add new properties when:
- Multiple components need the same values
- Design system defines new standards
- Consistency issues arise

**Process:**
1. Add to all size variants in `sizeTokens`
2. Update `getSizeClasses()` if commonly used together
3. Update TypeScript types
4. Document in README
5. Migrate components incrementally

### Breaking Changes

Breaking changes to tokens require:
- Major version bump
- Migration guide
- Deprecation warnings (if possible)
- Codemods for automated migration

## Future Roadmap

### Phase 2: Color Tokens
```tsx
export const colorTokens = {
  primary: { bg: "...", text: "...", hover: "..." },
  secondary: { bg: "...", text: "...", hover: "..." },
};
```

### Phase 3: Motion Tokens
```tsx
export const motionTokens = {
  fast: { duration: "150ms", easing: "ease-out" },
  normal: { duration: "200ms", easing: "ease-in-out" },
  slow: { duration: "300ms", easing: "ease-in" },
};
```

### Phase 4: Spacing Tokens
```tsx
export const spacingTokens = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};
```

### Phase 5: Responsive Tokens
```tsx
export const breakpointTokens = {
  mobile: { maxWidth: "640px", cols: 1 },
  tablet: { maxWidth: "1024px", cols: 2 },
  desktop: { maxWidth: "1280px", cols: 3 },
};
```

## Resources

- Token System Implementation: `/home/arthadede/InstructionLabs/experimental-next/ui/src/tokens/size.ts`
- Token Documentation: `/home/arthadede/InstructionLabs/experimental-next/ui/src/tokens/README.md`
- Usage Guide: `/home/arthadede/InstructionLabs/experimental-next/ui/SIZING_GUIDE.md`
- Example: Button Component: `/home/arthadede/InstructionLabs/experimental-next/ui/src/components/Button/Button.tsx`
- Example: IconButton Component: `/home/arthadede/InstructionLabs/experimental-next/ui/src/components/IconButton/IconButton.tsx`
