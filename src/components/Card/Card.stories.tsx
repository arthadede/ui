import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode of the card (dark, light, or auto for system detection)',
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'md',
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">This card automatically adapts to light/dark mode. Try different padding options (sm, md, lg) to see the spacing variations.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card component with adaptive theming. Defaults to auto-detect light/dark mode, or explicitly set mode="light"/"dark". Experiment with different padding sizes.',
      },
    },
  },
};