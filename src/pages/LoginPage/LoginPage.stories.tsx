import type { Meta, StoryObj } from '@storybook/react';
import LoginPage from './LoginPage';

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
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
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    step: 'email',
    variant: 'light',
  },
};
