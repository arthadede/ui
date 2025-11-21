import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text displayed on the chip',
    },
    state: {
      control: 'select',
      options: ['processing', 'success', 'error', 'info', 'default'],
      description: 'Visual state of the chip',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the chip',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Processing',
    state: 'processing',
    size: 'sm',
  },
};