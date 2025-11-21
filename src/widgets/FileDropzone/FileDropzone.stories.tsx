import type { Meta, StoryObj } from '@storybook/react';
import FileDropzone from './FileDropzone';

const meta = {
  title: 'Widgets/FileDropzone',
  component: FileDropzone,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'widget'],
  argTypes: {
    accepts: {
      control: 'object',
      description: 'Array of accepted MIME types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple files',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    title: {
      control: 'text',
      description: 'Dropzone title text',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Color variant (dark or light mode)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onError: {
      action: 'error',
      description: 'Error callback function',
    },
    onSuccess: {
      action: 'success',
      description: 'Success callback function',
    },
    onFilesAdded: {
      action: 'filesAdded',
      description: 'Files added callback function',
    },
  },
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accepts: ['image/jpeg', 'image/png', 'image/gif'],
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    title: 'Upload Image',
    variant: 'dark',
    onFilesAdded: (files) => console.log('Files added:', files),
  },
};