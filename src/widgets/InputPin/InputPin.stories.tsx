import type { Meta, StoryObj } from '@storybook/react';
import InputPin from './InputPin';

const meta = {
  title: 'Widgets/InputPin',
  component: InputPin,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'widget'],
  argTypes: {
    length: {
      control: 'number',
      min: 4,
      max: 8,
      description: 'Number of input fields',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of each input field',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Color variant (dark or light mode)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof InputPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 4,
    size: 'md',
    variant: 'dark',
    onChange: (values) => console.log('Input values:', values),
  },
};
