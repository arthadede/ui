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
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode of the icon button (dark, light, or auto for system detection)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon button',
    },
    iconName: {
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
        'cloud-upload',
      ],
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
    iconName: 'search',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'IconButton component with adaptive theming. Defaults to auto-detect light/dark mode. Try different icons and mode options to see the behavior.',
      },
    },
  },
};
