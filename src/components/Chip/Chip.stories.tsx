import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed on the chip',
    },
    state: {
      control: 'select',
      options: ['processing', 'success', 'error', 'info', 'default'],
      description: 'Visual state of the chip',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Processing',
    state: 'processing',
  },
};