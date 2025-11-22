import type { Meta, StoryObj } from '@storybook/react';
import LoginCard from './LoginCard';

const meta = {
  title: 'Pages/LoginCard',
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
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: 'email',
    variant: 'light',
  },
};
