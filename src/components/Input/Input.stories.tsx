import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
    leftIcon: {
      control: 'text',
      description: 'Name of the icon to display on the left (icon shows if value is provided)',
    },
    rightIcon: {
      control: 'text',
      description: 'Name of the icon to display on the right (icon shows if value is provided)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size variant',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: 'search',
    size: 'md',
    variant: 'primary',
  },
};