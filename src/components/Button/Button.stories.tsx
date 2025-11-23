import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'component'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode of the button (dark, light, or auto for system detection)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
    },
    leftIcon: {
      control: 'select',
      options: [
        '',
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
      ],
      description: 'Name of the icon to display on the left (icon shows if value is provided)',
    },
    rightIcon: {
      control: 'select',
      options: [
        '',
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
      ],
      description: 'Name of the icon to display on the right (icon shows if value is provided)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button component with adaptive theming. Defaults to auto-detect light/dark mode. Try different mode options and icon combinations to see the behavior.',
      },
    },
  },
};
