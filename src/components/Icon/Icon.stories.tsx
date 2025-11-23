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
      control: { type: 'select' },
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
        'cloud-upload',
        'email',
        'lock',
        'spinner',
        'chevron-right',
      ],
      description: 'Name of the icon to display',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size token for the icon (sm=20px, md=24px, lg=28px, xl=32px)',
    },
    mode: {
      control: { type: 'select' },
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode for the icon (dark, light, or auto for system detection)',
    }
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon component with adaptive theming. Defaults to auto-detect light/dark mode. Try different icons and mode options to see the behavior.',
      },
    },
  },
};
