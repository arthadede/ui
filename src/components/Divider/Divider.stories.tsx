import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'OR',
    className: 'w-64',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider component with adaptive theming. Defaults to auto-detect light/dark mode. Try removing text or changing mode options to see the adaptive behavior.',
      },
    },
  },
};