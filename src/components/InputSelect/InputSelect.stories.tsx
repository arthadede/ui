import type { Meta, StoryObj } from '@storybook/react';
import InputSelect from './InputSelect';

const meta = {
  title: 'Components/InputSelect',
  component: InputSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
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
      description: 'Name of the icon to display on the right (icon shows if value is provided, defaults to chevron-down)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'InputSelect size variant',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for empty selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input select',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    options: {
      control: 'object',
      description: 'Array of options with value, label, and optional disabled properties',
    },
  },
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '', label: 'Select an option', disabled: true },
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Disabled Option', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

export const Default: Story = {
  args: {
    placeholder: 'Choose an option...',
    leftIcon: 'search',
    size: 'md',
    mode: 'auto',
    options: defaultOptions,
  },
  parameters: {
    docs: {
      description: {
        story: 'InputSelect component with adaptive theming. Defaults to auto-detect light/dark mode. Includes custom styling for native select element with icon support. The chevron-down icon is shown by default when no rightIcon is provided.',
      },
    },
  },
};