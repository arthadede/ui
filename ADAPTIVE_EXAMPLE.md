# Adaptive Dark Mode Example

This file demonstrates how to use the new automatic dark mode detection in the component library.

## Usage Examples

### Basic Usage (Adaptive by Default)

```tsx
import { ThemeProvider, Button, Card, Input } from '@histweety/ui';

function App() {
  return (
    <ThemeProvider>
      {/* These components will automatically adapt to system theme */}
      <Button>Adaptive Button</Button>
      <Card>
        <Input placeholder="Adaptive Input" />
      </Card>
    </ThemeProvider>
  );
}
```

### Manual Variant Control

```tsx
import { Button, Card } from '@histweety/ui';

function ManualControl() {
  return (
    <div>
      {/* Force specific variants */}
      <Button variant="dark">Always Dark Button</Button>
      <Button variant="light">Always Light Button</Button>
      <Card variant="dark">Always Dark Card</Card>
    </div>
  );
}
```

### Theme Control with Manual Override

```tsx
import { ThemeProvider, Button, useTheme } from '@histweety/ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
      <Button onClick={() => setTheme('system')}>System Preference</Button>
      <p>Current: {theme}</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* Components below will follow the theme controlled above */}
      <Button>Themed Button</Button>
    </ThemeProvider>
  );
}
```

## How It Works

1. **Default Behavior**: When no `variant` prop is provided, components automatically use adaptive mode
2. **Manual Control**: When `variant` is provided, components use that specific variant
3. **Theme Detection**: Components respond to `prefers-color-scheme` media queries
4. **Manual Override**: Users can override system preference through the ThemeContext

## Components with Adaptive Support

- Button
- IconButton
- Card
- Input
- Icon

All components maintain full backward compatibility with existing `variant` props.