import type { Meta, StoryObj } from '@storybook/react';
import LoginCard from './LoginCard';

const meta = {
  title: 'Widgets/LoginCard',
  component: LoginCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: 'select',
      options: ['email', 'pin'],
    },
    loading: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    mode: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Theme mode (light, dark, or auto for system detection)',
    },
  },
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: 'email',
  },
  parameters: {
    docs: {
      description: {
        story: 'LoginCard with adaptive theming. Defaults to auto-detect light/dark mode. Try different steps (email/pin) and mode options to see the adaptive behavior in action.',
      },
    },
  },
};
