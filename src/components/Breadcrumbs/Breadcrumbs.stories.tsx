import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode of the breadcrumbs (dark, light, or auto for system detection)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the breadcrumbs text and icons',
    },
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label and optional href',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for the breadcrumb navigation',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', href: '/products/electronics/smartphones' },
      { label: 'iPhone 15', href: '/products/electronics/smartphones/iphone-15' },
      { label: 'Specifications' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs component with adaptive theming and automatic navigation structure. The last item is displayed as plain text (current page), while items with href are clickable links. Chevrons separate items automatically. Try different mode options and sizes to see the behavior.',
      },
    },
  },
};