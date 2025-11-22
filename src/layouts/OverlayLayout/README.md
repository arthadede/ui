# OverlayLayout

A flexible, reusable React layout system with 6 dynamic sections: header, content, left sidebar, right sidebar, modal, and snackbar. Built with TypeScript, Tailwind CSS, and context-based state management.

## Features

- **6 Sections**: header, content, left, right, modal, snackbar
- **Context-based State Management**: `OverlayProvider` + `useOverlay` hook
- **Registry System**: Register overlay content with keys for easy reuse
- **Responsive Layout**: Automatic mobile (stack) and desktop (grid) layouts
- **Width Customization**: Configurable widths for left/right panels
- **Smooth Animations**: CSS transitions for all overlay operations
- **TypeScript**: Full type safety with exported types
- **Flexible API**: Controlled or uncontrolled usage patterns

## Installation

```bash
npm install @histweety/ui
```

## Basic Usage

```tsx
import {
  OverlayProvider,
  OverlayLayout,
  useOverlay,
} from '@histweety/ui';

function App() {
  return (
    <OverlayProvider>
      <OverlayLayout>
        <YourContent />
      </OverlayLayout>
    </OverlayProvider>
  );
}

function YourContent() {
  const { openLeft, registerOverlay } = useOverlay();

  useEffect(() => {
    registerOverlay('my-sidebar', {
      render: () => <MySidebarContent />,
      width: '300px',
    });
  }, [registerOverlay]);

  return (
    <div>
      <button onClick={() => openLeft('my-sidebar')}>
        Open Sidebar
      </button>
    </div>
  );
}
```

## API Reference

### OverlayProvider

Context provider that manages overlay state. Wrap your app with this.

**Props:**
- `children: ReactNode` - Your app content
- `defaultHeader?: string` - Key of default header overlay
- `defaultLeft?: string` - Key of default left overlay
- `defaultRight?: string` - Key of default right overlay
- `defaultLeftWidth?: string` - Default left panel width (default: `'300px'`)
- `defaultRightWidth?: string` - Default right panel width (default: `'300px'`)

**Example:**
```tsx
<OverlayProvider
  defaultLeft="sidebar"
  defaultLeftWidth="350px"
>
  {children}
</OverlayProvider>
```

### useOverlay Hook

Access overlay state and actions from any component within `OverlayProvider`.

**Returns:**
```tsx
{
  // State
  header: { isOpen: boolean; key: string; node: ReactNode }
  left: { isOpen: boolean; key: string; node: ReactNode; width: string }
  right: { isOpen: boolean; key: string; node: ReactNode; width: string }
  modal: { isOpen: boolean; key: string; node: ReactNode }
  snackbar: { isOpen: boolean; key: string; node: ReactNode; position: OverlayPosition }

  // Actions
  registerOverlay: (key: string, config: OverlayConfig) => void
  unregisterOverlay: (key: string) => void
  openHeader: (key: string) => void
  closeHeader: () => void
  openLeft: (key: string, width?: string) => void
  closeLeft: () => void
  openRight: (key: string, width?: string) => void
  closeRight: () => void
  openModal: (key: string) => void
  closeModal: () => void
  openSnackbar: (key: string, position?: OverlayPosition) => void
  closeSnackbar: () => void
}
```

### OverlayLayout

Main layout component that orchestrates all sections.

**Props:**
- `children: ReactNode` - Main content
- `className?: string` - Custom classes for container
- `headerClassName?: string` - Custom classes for header
- `contentClassName?: string` - Custom classes for content
- `leftClassName?: string` - Custom classes for left panel
- `rightClassName?: string` - Custom classes for right panel
- `modalClassName?: string` - Custom classes for modal
- `snackbarClassName?: string` - Custom classes for snackbar
- `enableAnimations?: boolean` - Enable animations (default: `true`)
- `responsive?: boolean` - Enable responsive layout (default: `true`)

**Example:**
```tsx
<OverlayLayout
  enableAnimations={true}
  responsive={true}
  leftClassName="bg-gray-50"
>
  <MyContent />
</OverlayLayout>
```

### OverlayConfig

Configuration object for registering overlays.

**Type:**
```tsx
{
  render: () => ReactNode  // Function that returns the overlay content
  width?: string          // Width for left/right panels (e.g., '300px')
  position?: OverlayPosition  // Position for snackbar ('top' | 'bottom' | 'left' | 'right' | 'center')
}
```

## Usage Examples

### Registering Overlays

```tsx
function MyComponent() {
  const { registerOverlay, openLeft, openModal } = useOverlay();

  useEffect(() => {
    // Register a sidebar
    registerOverlay('user-menu', {
      render: () => <UserMenu />,
      width: '280px',
    });

    // Register a modal
    registerOverlay('confirm-dialog', {
      render: () => <ConfirmDialog />,
    });

    // Register a snackbar
    registerOverlay('success-message', {
      render: () => <SuccessMessage />,
      position: 'bottom',
    });
  }, [registerOverlay]);

  return (
    <div>
      <button onClick={() => openLeft('user-menu')}>Profile</button>
      <button onClick={() => openModal('confirm-dialog')}>Delete</button>
    </div>
  );
}
```

### Multiple Sidebars

```tsx
function App() {
  const { openLeft, openRight } = useOverlay();

  useEffect(() => {
    registerOverlay('navigation', {
      render: () => <Navigation />,
      width: '250px',
    });

    registerOverlay('notifications', {
      render: () => <Notifications />,
      width: '350px',
    });
  }, []);

  return (
    <div>
      <button onClick={() => openLeft('navigation')}>Menu</button>
      <button onClick={() => openRight('notifications')}>Notifications</button>
    </div>
  );
}
```

### Custom Widths

```tsx
// Open with custom width
openLeft('sidebar', '400px');

// Or set default width in config
registerOverlay('wide-panel', {
  render: () => <WideContent />,
  width: '500px',
});
```

### Snackbar Positions

```tsx
// Bottom (default)
openSnackbar('message', 'bottom');

// Top
openSnackbar('alert', 'top');

// Left
openSnackbar('notification', 'left');

// Right
openSnackbar('toast', 'right');

// Center
openSnackbar('info', 'center');
```

### Modal with Backdrop

The modal automatically includes a backdrop. Click outside to close (configurable via `closeOnBackdropClick` prop on `OverlayModal` component).

```tsx
registerOverlay('delete-confirm', {
  render: () => (
    <Card className="p-6 w-96">
      <h2>Confirm Delete</h2>
      <p>Are you sure?</p>
      <div className="flex gap-2 mt-4">
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </Card>
  ),
});
```

### Responsive Behavior

By default, the layout is responsive:
- **Mobile**: Stacks sections vertically (only one visible at a time)
- **Desktop**: Grid layout with left, content, right side-by-side

Disable responsive mode:
```tsx
<OverlayLayout responsive={false}>
  {children}
</OverlayLayout>
```

### Disable Animations

```tsx
<OverlayLayout enableAnimations={false}>
  {children}
</OverlayLayout>
```

## TypeScript Types

All types are exported for your convenience:

```tsx
import type {
  OverlaySection,
  OverlayPosition,
  OverlayConfig,
  OverlayState,
  OverlayActions,
  OverlayContextValue,
  OverlayProviderProps,
  OverlayLayoutProps,
} from '@histweety/ui';
```

## Architecture

The overlay system uses:
1. **Context API**: Global state management
2. **Map-based Registry**: Efficient overlay lookup by key
3. **Dynamic Grid**: CSS Grid with dynamic columns based on open panels
4. **Conditional Rendering**: Sections only render when open
5. **Tailwind Animations**: Built-in animate-in utilities for smooth transitions

## Individual Components

You can also use individual overlay components if you need finer control:

```tsx
import {
  OverlayHeader,
  OverlayContent,
  OverlayLeft,
  OverlayRight,
  OverlayModal,
  OverlaySnackbar,
} from '@histweety/ui';
```

Each component consumes the `useOverlay` context and handles its own state.

## Best Practices

1. **Register overlays once**: Use `useEffect` to register overlays on mount
2. **Unregister on unmount**: Clean up with `unregisterOverlay` if needed
3. **Use semantic keys**: Name overlays descriptively (e.g., 'user-profile', 'notifications')
4. **Width consistency**: Use consistent widths for similar panel types
5. **Accessibility**: Ensure overlay content is keyboard navigable
6. **Performance**: Keep overlay renders lightweight for smooth animations

## Examples in Storybook

Run Storybook to see interactive examples:

```bash
npm run storybook
```

Navigate to `Layouts > OverlayLayout` to explore all features.
