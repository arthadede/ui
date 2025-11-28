import type { Meta, StoryObj } from '@storybook/react';
import InputMarkdown from './InputMarkdown';
import { defaultToolbarActions, minimalToolbarActions } from './config';

const meta = {
  title: 'Components/InputMarkdown',
  component: InputMarkdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs', 'component'],
  argTypes: {
    toolbar: {
      control: 'select',
      options: {
        'Default': defaultToolbarActions,
        'Minimal': minimalToolbarActions,
      },
      description: 'Toolbar configuration with formatting actions',
    },
    enablePreview: {
      control: 'boolean',
      description: 'Enable/disable preview toggle',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial markdown content',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the editor (CSS value)',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the editor (CSS value)',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Theme mode (dark, light, or auto for system detection)',
    },
    showWordCount: {
      control: 'boolean',
      description: 'Show word and character count',
    },
    autoSave: {
      control: 'boolean',
      description: 'Enable auto-save after 2 seconds of inactivity',
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

This is a **powerful** markdown editor with _live preview_.

## Features

- Rich text formatting
- Live preview
- Keyboard shortcuts
- Word count
- Auto-save support

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Task List

- [x] Create component
- [x] Add toolbar
- [ ] Add more features

> This is a blockquote. You can use it to highlight important information.

[Link to GitHub](https://github.com)

| Feature | Status |
|---------|--------|
| Preview | ✓ |
| Toolbar | ✓ |
| Shortcuts | ✓ |
`;

export const Default: Story = {
  args: {
    defaultValue: sampleMarkdown,
    enablePreview: true,
    showWordCount: true,
    mode: 'auto',
    toolbar: defaultToolbarActions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default InputMarkdown with full toolbar and preview. Try editing and switching to preview mode.',
      },
    },
  },
};

export const LightMode: Story = {
  args: {
    defaultValue: '# Light Mode\n\nThis editor is in **light mode**.',
    enablePreview: true,
    mode: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with light mode theme.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    defaultValue: '# Dark Mode\n\nThis editor is in **dark mode**.',
    enablePreview: true,
    mode: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with dark mode theme.',
      },
    },
  },
};

export const MinimalToolbar: Story = {
  args: {
    defaultValue: '# Minimal Editor\n\nThis editor has a minimal toolbar with just **bold**, _italic_, headings, and links.',
    toolbar: minimalToolbarActions,
    enablePreview: true,
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with a minimal toolbar containing only essential formatting options.',
      },
    },
  },
};

export const NoPreview: Story = {
  args: {
    defaultValue: '# Editor Only\n\nThis editor has no preview mode.',
    enablePreview: false,
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown without preview toggle - editor only mode.',
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    defaultValue: '# Custom Height\n\nThis editor has a custom height.',
    minHeight: '200px',
    maxHeight: '300px',
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with custom minimum and maximum height.',
      },
    },
  },
};

export const WithAutoSave: Story = {
  args: {
    defaultValue: '# Auto-save Enabled\n\nChanges will be auto-saved after 2 seconds of inactivity.',
    autoSave: true,
    onSave: (content: string) => {
      console.log('Auto-saved:', content);
    },
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with auto-save enabled. Check the console to see auto-save triggers.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    placeholder: 'Start writing your markdown here...',
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty InputMarkdown with placeholder text.',
      },
    },
  },
};

export const WithCallbacks: Story = {
  args: {
    defaultValue: '# Callbacks Demo\n\nTry editing and saving (Ctrl+S).',
    onChange: (content: string) => {
      console.log('Content changed:', content);
    },
    onSave: (content: string) => {
      console.log('Saved:', content);
    },
    mode: 'auto',
  },
  parameters: {
    docs: {
      description: {
        story: 'InputMarkdown with onChange and onSave callbacks. Open the console to see the callbacks in action.',
      },
    },
  },
};
