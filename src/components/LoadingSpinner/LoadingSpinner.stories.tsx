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
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'light',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'light',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'light',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    size: 'md',
    variant: 'dark',
  },
};

export const InButton: Story = {
  args: {
    size: 'sm',
    variant: 'light',
    className: 'inline-flex items-center gap-2 p-2 bg-blue-600 text-white rounded',
  },
  render: (args) => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <LoadingSpinner {...args} variant="light" />
      Loading...
    </button>
  ),
};