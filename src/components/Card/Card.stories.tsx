import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    variant: 'light',
    padding: 'md',
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">This is a light variant card with medium padding.</p>
      </div>
    ),
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    padding: 'md',
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Card Title</h3>
        <p className="text-gray-300">This is a dark variant card with medium padding.</p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    variant: 'light',
    padding: 'lg',
    children: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Large Card</h3>
        <p className="text-gray-600">This card has large padding for more spacious content.</p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    variant: 'light',
    padding: 'sm',
    children: (
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Compact Card</h3>
        <p className="text-sm text-gray-600">This card has small padding for tight layouts.</p>
      </div>
    ),
  },
};