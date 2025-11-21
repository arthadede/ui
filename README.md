# @histweety/ui

A reusable React component library built with TypeScript, Tailwind CSS, and modern tooling.

## Features

- **TypeScript**: Full type safety with TypeScript
- **Tailwind CSS**: Utility-first styling
- **Storybook**: Component documentation and development playground
- **ESM & CJS**: Dual module format support
- **Tree-shakeable**: Import only what you need
- **React 19**: Built for the latest React

## Installation

```bash
npm install @histweety/ui
# or
yarn add @histweety/ui
# or
pnpm add @histweety/ui
```

### Prerequisites

This library requires the following peer dependencies:

- React >= 19.0.0
- React DOM >= 19.0.0
- Tailwind CSS >= 4.0.0 (for styling)

## Usage

### Import Components

```tsx
import { Button } from '@histweety/ui';

function App() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

### Import Styles

Make sure to import the styles in your app:

```tsx
import '@histweety/ui/styles';
```

Or if using the component library's CSS:

```css
@import '@histweety/ui/dist/index.css';
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- All standard HTML button attributes

**Example:**

```tsx
<Button variant="outline" size="lg">
  Large Outline Button
</Button>
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

- `npm run dev` - Build in watch mode
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook for deployment

### Adding New Components

1. Create component folder in `src/components/`:

```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.stories.tsx
└── index.ts
```

2. Export from `src/index.ts`:

```ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent';
```

3. Build and test:

```bash
npm run build
npm run storybook
```

## Publishing to NPM

### First Time Setup

1. Create an NPM account at [npmjs.com](https://www.npmjs.com)
2. Login via CLI:

```bash
npm login
```

3. (Optional) Create the `@histweety` organization on NPM if it doesn't exist

### Publishing Process

1. Update version in `package.json`:

```bash
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0
```

2. Build the library:

```bash
npm run build
```

3. Publish to NPM:

```bash
npm publish --access public
```

For scoped packages like `@histweety/ui`, you need to use `--access public` for the first publish.

### Pre-release Versions

For beta or alpha releases:

```bash
npm version prerelease --preid=beta  # 0.1.0 -> 0.1.1-beta.0
npm publish --tag beta
```

## Project Structure

```
ui/
├── .storybook/           # Storybook configuration
├── src/
│   ├── components/       # Component source files
│   │   └── Button/
│   ├── styles/          # Global styles
│   └── index.ts         # Main entry point
├── dist/                # Build output
├── package.json
├── tsconfig.json        # TypeScript configuration
├── tsup.config.ts       # Build configuration
├── tailwind.config.ts   # Tailwind configuration
└── README.md
```

## License

MIT
