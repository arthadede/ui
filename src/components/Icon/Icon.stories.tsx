import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'logo',
        'circle',
        'rectangle',
        'rectangle-outline',
        'google',
        'search',
        'visible',
        'circle-success',
        'circle-error',
        'warning',
        'circle-info',
        'close',
        'notification',
        'progress',
        'upload',
      ],
      description: 'Name of the icon to display',
    },
    size: {
      control: { type: 'number', min: 12, max: 128, step: 4 },
      description: 'Size of the icon in pixels',
    }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    name: 'logo',
    size: 24,
  },
};
