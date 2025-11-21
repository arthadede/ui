import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { type ComponentSize } from '../../tokens';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component'],
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
      control: { type: 'select', options: ['sm', 'md', 'lg'] as ComponentSize[] },
      description: 'Size token for the icon (sm=20px, md=24px, lg=28px)',
    },
    variant: {
      control: { type: 'select', options: ['dark', 'light'] },
      description: 'Color variant for the icon (dark=black text, light=white text)',
    }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 'md',
    variant: 'light',
  },
};
