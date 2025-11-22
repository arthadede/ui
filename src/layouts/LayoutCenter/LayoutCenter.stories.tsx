import type { Meta, StoryObj } from '@storybook/react';
import LayoutCenter from './LayoutCenter';
import Button from '../../components/Button/Button';

const meta = {
  title: 'Layouts/LayoutCenter',
  component: LayoutCenter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'layout'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
    },
  },
} satisfies Meta<typeof LayoutCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Centered Content</h1>
        <p className="text-gray-600 mb-6">This content is centered both horizontally and vertically</p>
        <Button>Centered Button</Button>
      </div>
    ),
  },
};

export const WithCustomBackground: Story = {
  args: {
    className: 'bg-gray-100',
    children: (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Custom Background</h2>
        <p className="text-gray-500">The container has a custom background color</p>
      </div>
    ),
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>
        <div className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    ),
  },
};