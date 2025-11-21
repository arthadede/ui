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
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    text: 'OR',
    variant: 'light',
    className: 'w-64',
  },
};

export const CustomText: Story = {
  args: {
    text: 'Continue with',
    variant: 'light',
    className: 'w-64',
  },
};

export const Dark: Story = {
  args: {
    text: 'OR',
    variant: 'dark',
    className: 'w-64',
  },
};

export const WithoutText: Story = {
  args: {
    text: undefined,
    variant: 'light',
    className: 'w-64',
  },
};

export const DarkWithoutText: Story = {
  args: {
    text: undefined,
    variant: 'dark',
    className: 'w-64',
  },
};