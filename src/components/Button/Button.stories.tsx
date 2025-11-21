import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    label: {
      control: 'text',
      description: 'Text label for the button',
    },
    leftIcon: {
      control: 'text',
      description: 'Name of the icon to display on the left (icon shows if value is provided)',
    },
    rightIcon: {
      control: 'text',
      description: 'Name of the icon to display on the right (icon shows if value is provided)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
