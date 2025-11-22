import type { Meta, StoryObj } from '@storybook/react';
import ErrorPage from './ErrorPage';

const meta = {
  title: 'Pages/ErrorPage',
  component: ErrorPage,
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
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'light',
  },
};
