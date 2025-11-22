import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'component'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['caption', 'body', 'label', 'heading-6', 'heading-5', 'heading-4', 'heading-3', 'heading-2', 'heading-1'],
      description: 'Semantic typography variant',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'line-through'],
      description: 'Text decoration',
    },
    truncate: {
      control: 'boolean',
      description: 'Enable text truncation',
    },
    clamp: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines to clamp to',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default body text using the Text component',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text, typically used for small metadata or辅助信息',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text, the standard text size for general content. It provides comfortable reading experience for longer passages of text.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'This is label text, used for form labels and UI elements',
  },
};

export const Heading6: Story = {
  args: {
    variant: 'heading-6',
    children: 'This is Heading 6',
  },
};

export const Heading5: Story = {
  args: {
    variant: 'heading-5',
    children: 'This is Heading 5',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'heading-4',
    children: 'This is Heading 4',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'heading-3',
    children: 'This is Heading 3',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'heading-2',
    children: 'This is Heading 2',
  },
};

export const Heading1: Story = {
  args: {
    variant: 'heading-1',
    children: 'This is Heading 1',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text variant="caption">Caption Text - Small metadata</Text>
      <Text variant="body">Body Text - Standard content</Text>
      <Text variant="label">Label Text - Form labels</Text>
      <Text variant="heading-6">Heading 6 - Small headings</Text>
      <Text variant="heading-5">Heading 5 - Section subheadings</Text>
      <Text variant="heading-4">Heading 4 - Subsection headings</Text>
      <Text variant="heading-3">Heading 3 - Section headings</Text>
      <Text variant="heading-2">Heading 2 - Page sections</Text>
      <Text variant="heading-1">Heading 1 - Main page title</Text>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text align="left">Left aligned text - the default alignment</Text>
      <Text align="center">Center aligned text - good for titles and callouts</Text>
      <Text align="right">Right aligned text - useful for certain layouts</Text>
      <Text align="justify">Justified text - spreads evenly across the container for a clean block appearance</Text>
    </div>
  ),
};

export const TextTransform: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text transform="none">No transformation - normal case</Text>
      <Text transform="uppercase">UPPERCASE TEXT - great for emphasis</Text>
      <Text transform="lowercase">lowercase text - subtle appearance</Text>
      <Text transform="capitalize">Capitalized Text - First Letter Of Each Word</Text>
    </div>
  ),
};

export const TextDecoration: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text decoration="none">No decoration - clean text</Text>
      <Text decoration="underline">Underlined text - links or emphasis</Text>
      <Text decoration="line-through">Line-through text - deleted content</Text>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text truncate>
        This text will be truncated with an ellipsis if it overflows the container width. It\'s useful for displaying long text in limited spaces.
      </Text>
      <Text clamp={3}>
        This text will be clamped to 3 lines. If the content exceeds this limit, it will be truncated with an ellipsis. This is perfect for card descriptions, previews, and other scenarios where you want to show a preview of longer content while maintaining a consistent layout. The text will flow naturally up to the specified number of lines before being cut off.
      </Text>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Text variant="body" className="text-blue-600">
        Blue body text using custom Tailwind color classes
      </Text>
      <Text variant="heading-3" className="text-purple-700 font-mono">
        Purple heading with monospace font family
      </Text>
      <Text variant="label" className="text-green-600 bg-green-50 px-2 py-1 rounded">
        Label with custom background color
      </Text>
    </div>
  ),
};

export const RealWorldUsage: Story = {
  render: () => (
    <div className="space-y-6 max-w-md p-6 bg-gray-50 rounded-lg">
      <div>
        <Text variant="heading-2" className="mb-4">User Profile</Text>
        <Text variant="caption" className="block mb-2">Last updated: 2 hours ago</Text>
      </div>

      <div>
        <Text variant="label" className="block mb-2">Email Address</Text>
        <Text variant="body">john.doe@example.com</Text>
      </div>

      <div>
        <Text variant="heading-4" className="mb-2">About Me</Text>
        <Text clamp={3}>
          I\'m a software developer passionate about creating user-friendly applications. I love working with modern technologies and solving complex problems. In my free time, I enjoy contributing to open source projects and learning about new development practices.
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text variant="body" decoration="underline" className="cursor-pointer">Edit Profile</Text>
        <Text variant="caption" align="right">Account Settings</Text>
      </div>
    </div>
  ),
};