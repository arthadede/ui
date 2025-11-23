import type { Meta, StoryObj } from '@storybook/react';
import ErrorCard from './ErrorCard';

const meta = {
  title: 'Widgets/ErrorCard',
  component: ErrorCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Theme mode (light, dark, or auto for system detection)',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    homeButtonText: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ErrorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'ErrorCard with adaptive theming. Defaults to auto-detect light/dark mode. Try different mode options to see the adaptive behavior in action.',
      },
    },
  },
};
