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
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'light',
    children: 'This field is required',
  },
};

export const ValidationError: Story = {
  args: {
    variant: 'light',
    children: 'Please enter a valid email address',
  },
};

export const AuthenticationError: Story = {
  args: {
    variant: 'light',
    children: 'Invalid email or password. Please try again.',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'This field is required',
  },
};

export const DarkAuthenticationError: Story = {
  args: {
    variant: 'dark',
    children: 'Authentication failed. Please check your credentials.',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'light',
    children: (
      <div className="flex items-center gap-2">
        <span className="text-red-500">⚠</span>
        <span>Please enter a valid email address</span>
      </div>
    ),
  },
};