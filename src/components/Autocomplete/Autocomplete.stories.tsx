import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Autocomplete from './Autocomplete';

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
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
      description: 'Name of the icon to display on the right (icon shows if value is provided)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Autocomplete size variant',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable autocomplete',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
    },
    filterOptions: {
      control: 'boolean',
      description: 'Enable option filtering based on input',
    },
    showNoResults: {
      control: 'boolean',
      description: 'Show no results message when no options match',
    },
    noResultsText: {
      control: 'text',
      description: 'Text to display when no results are found',
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
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'watermelon', label: 'Watermelon', disabled: true },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'mango', label: 'Mango' },
  { value: 'kiwi', label: 'Kiwi' },
];

export const Default: Story = {
  args: {
    placeholder: 'Search for a fruit...',
    leftIcon: 'search',
    size: 'md',
    mode: 'auto',
    options: defaultOptions,
    filterOptions: true,
    showNoResults: true,
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = React.useState<{ value: string; label: string } | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (value: string) => {
      setInputValue(value);
    };

    const handleOptionSelect = (option: { value: string; label: string }) => {
      setSelectedOption(option);
      setInputValue(option.label);
    };

    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={inputValue}
          onInputChange={handleInputChange}
          onOptionSelect={handleOptionSelect}
        />
        {selectedOption && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Selected: {selectedOption.label} (value: {selectedOption.value})
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Autocomplete component with adaptive theming and keyboard navigation. Features include:• Option filtering as you type• Arrow key navigation• Enter to select, Escape to close• Loading state with spinner• Disabled options support• Click outside to close• Full accessibility support',
      },
    },
  },
};