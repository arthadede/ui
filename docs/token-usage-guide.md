# Token Usage Guide

This guide provides comprehensive best practices for using tokens consistently across the @histweety/ui component library.

## Overview

The token system in @histweety/ui provides a centralized, maintainable way to define design tokens for styling. Using tokens ensures:

- **Consistency**: All components follow the same design system
- **Maintainability**: Style changes only need to be made in one place
- **Scalability**: Easy to add new variants and scales
- **Accessibility**: Semantic tokens support proper contrast and accessibility
- **Theming**: Seamless light/dark mode switching with adaptive tokens

## Token Categories

### 1. Color Tokens
- **Semantic Colors**: `text`, `background`, `border`, `hover`, `focus`
- **Adaptive Tokens**: Automatic light/dark mode switching
- **Component Types**: `card`, `button`, `input`, `icon`, etc.

### 2. Typography Tokens
- **Font Sizes**: `heading-1` through `heading-6`, `body`, `label`, `caption`, `code`
- **Font Weights**: `light`, `regular`, `medium`, `semibold`, `bold`
- **Line Heights**: `tight`, `normal`, `relaxed`, `loose`
- **Letter Spacing**: `tight`, `normal`, `relaxed`

### 3. Spacing Tokens
- **Atomic Spacing**: `1-96` scale for fine-grained control
- **Semantic Spacing**: `none`, `xs`, `sm`, `compact`, `normal`, `relaxed`, `xl`, `2xl`, `3xl`
- **Directional Spacing**: `padding`, `margin`, `gap`

### 4. Size Tokens
- **Component Sizes**: `sm`, `md`, `lg`, `xl`
- **Icon Sizes**: `16`, `24`, `32`, `48`
- **Button Sizes**: Corresponding width/height classes

### 5. Layout Tokens
- **Containers**: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- **Grid Systems**: Responsive grid utilities
- **Positioning**: Flexbox and grid alignment classes

### 6. Animation Tokens
- **Durations**: `fast` (150ms), `normal` (300ms), `slow` (500ms)
- **Easings**: `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `custom`
- **Types**: `colors`, `opacity`, `transform`, `all`
- **Presets**: Common animation combinations

### 7. Border Radius Tokens
- **Sizes**: `none`, `sm`, `md`, `lg`, `xl`, `full`
- **Rounded corners** for consistent styling

### 8. Shadow Tokens
- **Levels**: `none`, `sm`, `md`, `lg`, `xl`
- **Depth hierarchy** for elevation

### 9. Opacity Tokens
- **Numeric**: `0`, `25`, `50`, `75`, `100`
- **Semantic**: `disabled`, `faded`, `subtle`, `medium`, `strong`

### 10. Z-Index Tokens
- **Layers**: `base`, `dropdown`, `sticky`, `fixed`, `modal-backdrop`, `modal`
- **Stacking order** for proper layering

## Best Practices

### 1. Always Use Tokens for Styling

**✅ DO**: Use tokens for all styling
```tsx
import { getTypographyToken, getAdaptiveVariantClassesString } from '../../tokens';

const TypographyExample = () => {
  const typography = getTypographyToken('heading-3');
  const variantClasses = getAdaptiveVariantClassesString('card');

  return (
    <h3 className={`${typography.className} ${variantClasses.text}`}>
      Heading
    </h3>
  );
};
```

**❌ DON'T**: Use hardcoded classes
```tsx
// Bad: Hardcoded classes
<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
  Heading
</h3>
```

### 2. Use Helper Functions for Complex Components

**✅ DO**: Use component helpers
```tsx
import { componentHelpers } from '../../tokens';

const ButtonExample = (props) => {
  const buttonClasses = componentHelpers.createButtonClasses({
    size: 'md',
    variant: 'primary',
    mode: 'auto',
    disabled: props.disabled,
  });

  return (
    <button className={`${buttonClasses.base} ${buttonClasses.variant}`}>
      {props.children}
    </button>
  );
};
```

### 3. Prefer Adaptive Mode for Theming

**✅ DO**: Use `auto` mode for automatic theme switching
```tsx
import { getAdaptiveVariantClassesString } from '../../tokens';

const CardExample = () => {
  const cardClasses = getAdaptiveVariantClassesString('card');

  return (
    <div className={`${cardClasses.background} ${cardClasses.border} ${cardClasses.text}`}>
      Adaptive card content
    </div>
  );
};
```

### 4. Use Semantic Tokens When Available

**✅ DO**: Use semantic token types
```tsx
import { getTypographyToken } from '../../tokens';

const TextExample = () => {
  // Use semantic typography token
  const typography = getTypographyToken('body');

  return (
    <p className={typography.className}>
      Body text with consistent typography
    </p>
  );
};
```

### 5. Use Consistent Spacing Tokens

**✅ DO**: Use spacing tokens for consistent spacing
```tsx
import { getSpacingClasses, getPaddingClasses } from '../../tokens';

const SpacingExample = () => {
  const spacing = getSpacingClasses('normal');
  const padding = getPaddingClasses('lg');

  return (
    <div className={`${spacing.gap.normal} ${padding.padding}`}>
      Consistent spacing
    </div>
  );
};
```

### 6. Use Size Tokens for Component Sizing

**✅ DO**: Use size tokens for consistent sizing
```tsx
import { getSizeClasses } from '../../tokens';

const SizeExample = () => {
  const sizeClasses = getSizeClasses('md');

  return (
    <div className={sizeClasses.size}>
      Consistent component sizing
    </div>
  );
};
```

### 7. Use Animation Tokens for Consistent Animations

**✅ DO**: Use animation tokens for consistent transitions
```tsx
import { getTransitionClasses } from '../../tokens';

const AnimationExample = () => {
  const transition = getTransitionClasses('normal', 'custom', 'colors');

  return (
    <button className={`${transition} hover:bg-gray-100`}>
      Animated button
    </button>
  );
};
```

### 8. Use Z-Index Tokens for Layering

**✅ DO**: Use z-index tokens for proper stacking
```tsx
import { getZIndexClass } from '../../tokens';

const ModalExample = () => {
  const modalZIndex = getZIndexClass('modal');
  const backdropZIndex = getZIndexClass('modal-backdrop');

  return (
    <>
      <div className={backdropZIndex}>Backdrop</div>
      <div className={modalZIndex}>Modal Content</div>
    </>
  );
};
```

## Common Patterns

### 1. Component with Adaptive Theming

```tsx
import {
  getAdaptiveVariantClassesString,
  getTypographyToken,
  getPaddingClasses,
  getBorderRadiusClasses,
  getShadowClasses
} from '../../tokens';

const AdaptiveCard = ({ mode = 'auto', children }) => {
  const variantClasses = getAdaptiveVariantClassesString('card');
  const typography = getTypographyToken('body');
  const padding = getPaddingClasses('md');
  const borderRadius = getBorderRadiusClasses('lg');
  const shadow = getShadowClasses('sm');

  return (
    <div className={`
      ${variantClasses.background}
      ${variantClasses.border}
      ${variantClasses.text}
      ${padding.padding}
      ${borderRadius}
      ${shadow}
      transition-colors
    `}>
      {children}
    </div>
  );
};
```

### 2. Form Component with Error States

```tsx
import {
  createInputClasses,
  getTypographyToken
} from '../../tokens';

const InputField = ({
  label,
  error,
  disabled,
  value,
  onChange
}) => {
  const inputClasses = createInputClasses({
    size: 'md',
    mode: 'auto',
    disabled,
    error: !!error,
  });

  const labelTypography = getTypographyToken('label');

  return (
    <div className="flex flex-col gap-2">
      <label className={labelTypography.className}>
        {label}
      </label>
      <input
        className={`${inputClasses.base} ${error ? inputClasses.error : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
```

### 3. Icon Component with Variants

```tsx
import { createIconClasses } from '../../tokens';

const StatusIcon = ({ type, size = 'md' }) => {
  const iconClasses = createIconClasses({
    size,
    mode: 'auto',
    variant: type,
  });

  return (
    <div className={iconClasses}>
      {/* Icon SVG */}
    </div>
  );
};
```

## Token Helper Functions

### componentHelpers
- `getVariantClasses()`: Get variant classes with adaptive support
- `getTypographyClasses()`: Get typography classes by semantic type
- `getTypographyClassesBySize()`: Get typography classes by size
- `getSpacingClasses()`: Get complete spacing classes
- `getPaddingClasses()`: Get padding classes
- `getSizeClasses()`: Get size classes
- `getBorderRadiusClasses()`: Get border radius classes
- `getShadowClasses()`: Get shadow classes
- `getOpacityClass()`: Get opacity classes
- `getTransitionClasses()`: Get transition classes
- `getZIndexClass()`: Get z-index classes
- `createButtonClasses()`: Create complete button styling
- `createCardClasses()`: Create complete card styling
- `createInputClasses()`: Create complete input styling
- `createIconClasses()`: Create complete icon styling

### tokenPresets
Pre-configured presets for common use cases:
- `spacing`: Common spacing combinations
- `typography`: Common typography tokens
- `animations`: Common animation combinations
- `shadows`: Common shadow levels
- `borders`: Common border radius sizes
- `zIndex`: Common z-index levels

## Migration from Hardcoded Classes

### Before (Hardcoded)
```tsx
<div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-6">
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Title
  </h3>
  <p className="text-gray-600 dark:text-gray-400">
    Content
  </p>
</div>
```

### After (Token-based)
```tsx
import {
  getAdaptiveVariantClassesString,
  getTypographyToken,
  getPaddingClasses,
  getBorderRadiusClasses,
  getShadowClasses
} from '../../tokens';

const CardExample = () => {
  const variantClasses = getAdaptiveVariantClassesString('card');
  const titleTypography = getTypographyToken('heading-3');
  const bodyTypography = getTypographyToken('body');
  const padding = getPaddingClasses('md');
  const borderRadius = getBorderRadiusClasses('lg');
  const shadow = getShadowClasses('md');

  return (
    <div className={`
      ${variantClasses.background}
      ${variantClasses.border}
      ${borderRadius}
      ${shadow}
      ${padding.padding}
    `}>
      <h3 className={`${titleTypography.className} mb-4`}>
        Title
      </h3>
      <p className={bodyTypography.className}>
        Content
      </p>
    </div>
  );
};
```

## Performance Considerations

1. **Memoization**: Use `useMemo` for complex token calculations
2. **Lazy Loading**: Import tokens only when needed
3. **Bundle Size**: Tokens are tree-shakeable, only what's used is included
4. **Caching**: Token classes are deterministic and can be cached

## Troubleshooting

### Common Issues

1. **Missing Exports**: Check that tokens are properly exported from `src/tokens/index.ts`
2. **Incorrect Types**: Ensure TypeScript types are imported correctly
3. **Class Conflicts**: Token classes should not conflict with existing styles
4. **Theme Switching**: Ensure `auto` mode is used for proper adaptive theming

### Debugging Tips

1. **Inspect Classes**: Use browser dev tools to verify token classes are applied
2. **Check Tokens**: Log token values to understand what's being generated
3. **Test Themes**: Test both light and dark modes thoroughly
4. **Accessibility**: Ensure color contrast meets accessibility standards

## Conclusion

Using tokens consistently across the codebase ensures a maintainable and scalable design system. Follow these best practices to leverage the full power of the token system in @histweety/ui.

Remember: **When in doubt, use tokens!** They provide the foundation for a consistent and maintainable design system.