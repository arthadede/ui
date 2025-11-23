import type { Meta, StoryObj } from '@storybook/react';
import ErrorCard from './ErrorCard';

const meta = {
  title: 'Widgets/ErrorCard',
  component: ErrorCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    homeButtonText: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ErrorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'light',
  },
};
