import type { Meta, StoryObj } from '@storybook/react';
import InlineError from './InlineError';

const meta = {
  title: 'Components/InlineError',
  component: InlineError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
  },
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'InlineError component with adaptive theming. Defaults to auto-detect light/dark mode. Try different error messages and mode options to see the adaptive behavior. You can also pass complex children with icons.',
      },
    },
  },
};