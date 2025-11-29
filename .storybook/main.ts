import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  // Prevent Storybook from trying to open browser
  core: {
    disableTelemetry: true,
  },
  // Additional headless configuration
  server: {
    port: 6006,
    host: '0.0.0.0',
    hmr: false,
  },
  // Vite configuration to handle React 19 "use client" directives
  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    };

    // Add proper React 19 support
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: ['react', 'react-dom'],
    };

    return config;
  },
};

export default config;
