import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'transparent'],
      description: 'Visual style variant of the icon button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon button',
    },
    iconName: {
      control: 'text',
      description: 'Name of the icon to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'secondary',
    iconName: 'search',
  },
};
