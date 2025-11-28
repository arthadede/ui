import type { Meta, StoryObj } from '@storybook/react';
import InputMarkdown from './InputMarkdown';

const meta = {
  title: 'Components/InputMarkdown',
  component: InputMarkdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs', 'component'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Initial markdown content',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the editor read-only',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof InputMarkdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMarkdown = `# Welcome to InputMarkdown

This is a **powerful** WYSIWYG markdown editor with _Typora-like_ experience.

## Perfect Newline Handling
Line 1
Line 2
Line 3

All newlines and blank lines are preserved exactly as you type!

Test 1


Test 2

## Features

- ✅ WYSIWYG editing (no separate preview mode)
- ✅ Perfect newline and blank line preservation
- ✅ Rich text formatting toolbar
- ✅ Tables, images, links support
- ✅ Code blocks with syntax highlighting
- ✅ Keyboard shortcuts (Cmd/Ctrl+B, Cmd/Ctrl+I, etc.)
- ✅ Dark mode support

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

greet("World");
\`\`\`

### Task List

- [x] Implement WYSIWYG editor
- [x] Add toolbar
- [x] Support all markdown features
- [ ] Customize theme

> This is a blockquote. The editor handles all markdown features natively!

[Link to GitHub](https://github.com)

| Feature | Status |
|---------|--------|
| WYSIWYG | ✓ |
| Newlines | ✓ |
| Toolbar | ✓ |
`;

export const Default: Story = {
  args: {
    defaultValue: sampleMarkdown,
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default InputMarkdown with WYSIWYG editing powered by MDXEditor. No preview mode needed - what you see is what you get!',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Start typing your markdown here...',
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty editor with placeholder text.',
      },
    },
  },
};

export const LightMode: Story = {
  args: {
    defaultValue: '# Light Mode\n\nThis editor is in **light mode**.',
    mode: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with light mode theme.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    defaultValue: '# Dark Mode\n\nThis editor is in **dark mode**.',
    mode: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with dark mode theme.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: '# Read-Only Mode\n\nThis editor is **read-only**. You cannot edit the content.',
    readOnly: true,
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode - useful for displaying markdown content.',
      },
    },
  },
};

export const WithCallback: Story = {
  args: {
    defaultValue: '# Callbacks Demo\n\nTry editing this content and check the console.',
    onChange: (content: string) => {
      console.log('Content changed:', content);
    },
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with onChange callback. Open the console to see content changes.',
      },
    },
  },
};
