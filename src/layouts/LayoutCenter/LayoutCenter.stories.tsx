import type { Meta, StoryObj } from '@storybook/react';
import LayoutCenter from './LayoutCenter';
import Button from '../../components/Button/Button';
import { Text } from '../../components/Text';

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
      <>
        <Text size="3xl" weight="bold" className="mb-4">
          Centered Content
        </Text>
        <Text size="base" className="mb-6">
          This content is centered both horizontally and vertically
        </Text>
        <Button>Centered Button</Button>
      </>
    ),
  },
};
