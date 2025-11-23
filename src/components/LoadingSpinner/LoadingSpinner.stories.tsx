import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from './LoadingSpinner';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode of the spinner (dark, light, or auto for system detection)',
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'LoadingSpinner component with adaptive theming. Defaults to auto-detect light/dark mode. Try different sizes and mode options to see the behavior.',
      },
    },
  },
};