import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
    name: {
      control: 'text',
      description: 'User name for initials and color bucketing',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size variant',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar component displays user initials with dynamic colors based on name. Try different names and sizes to see the adaptive behavior.',
      },
    },
  },
};