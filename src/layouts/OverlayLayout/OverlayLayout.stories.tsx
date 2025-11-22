import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { OverlayProvider, useOverlay } from './context/OverlayContext';
import OverlayLayout from './OverlayLayout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const DemoContent = () => {
  const {
    openHeader,
    closeHeader,
    openLeft,
    closeLeft,
    openRight,
    closeRight,
    openModal,
    closeModal,
    openSnackbar,
    closeSnackbar,
    registerOverlay,
    header,
    left,
    right,
    modal,
    snackbar,
  } = useOverlay();

  useEffect(() => {
    registerOverlay('demo-header', {
      render: () => (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Demo Header</h1>
          <Button onClick={closeHeader} size="sm">
            Close
          </Button>
        </div>
      ),
    });

    registerOverlay('demo-left', {
      render: () => (
        <Card className="h-full">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Left Panel</h2>
            <p className="text-sm text-gray-600">This is the left sidebar content.</p>
            <Button onClick={closeLeft} size="sm" variant="light">
              Close Left
            </Button>
          </div>
        </Card>
      ),
      width: '300px',
    });

    registerOverlay('demo-left-wide', {
      render: () => (
        <Card className="h-full">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Wide Left Panel</h2>
            <p className="text-sm text-gray-600">This is a wider left sidebar.</p>
            <Button onClick={closeLeft} size="sm" variant="light">
              Close Left
            </Button>
          </div>
        </Card>
      ),
      width: '400px',
    });

    registerOverlay('demo-right', {
      render: () => (
        <Card className="h-full">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Right Panel</h2>
            <p className="text-sm text-gray-600">This is the right sidebar content.</p>
            <Button onClick={closeRight} size="sm" variant="light">
              Close Right
            </Button>
          </div>
        </Card>
      ),
      width: '300px',
    });

    registerOverlay('demo-modal', {
      render: () => (
        <Card className="w-96 max-w-full">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Modal Dialog</h2>
            <p className="text-sm text-gray-600">
              This is a modal dialog. Click the backdrop or close button to dismiss.
            </p>
            <Button onClick={closeModal} variant="dark" className="w-full">
              Close Modal
            </Button>
          </div>
        </Card>
      ),
    });

    registerOverlay('demo-snackbar-bottom', {
      render: () => (
        <Card className="bg-gray-900 text-white">
          <div className="px-6 py-3 flex items-center gap-4">
            <span className="text-sm">This is a snackbar notification!</span>
            <Button onClick={closeSnackbar} size="sm" variant="light">
              Dismiss
            </Button>
          </div>
        </Card>
      ),
    });

    registerOverlay('demo-snackbar-top', {
      render: () => (
        <Card className="bg-blue-600 text-white">
          <div className="px-6 py-3 flex items-center gap-4">
            <span className="text-sm">Top snackbar notification!</span>
            <Button onClick={closeSnackbar} size="sm" variant="light">
              Dismiss
            </Button>
          </div>
        </Card>
      ),
    });
  }, [
    registerOverlay,
    closeHeader,
    closeLeft,
    closeRight,
    closeModal,
    closeSnackbar,
  ]);

  return (
    <div className="p-8 space-y-6 h-full overflow-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Overlay Layout Demo</h1>
        <p className="text-gray-600">
          Try opening different sections to see the responsive layout in action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-3">Header Controls</h2>
            <div className="flex gap-2">
              <Button onClick={() => openHeader('demo-header')} disabled={header.isOpen}>
                Open Header
              </Button>
              <Button onClick={closeHeader} variant="light" disabled={!header.isOpen}>
                Close Header
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Left Sidebar Controls</h2>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => openLeft('demo-left')} disabled={left.isOpen}>
                Open Left (300px)
              </Button>
              <Button onClick={() => openLeft('demo-left-wide')} disabled={left.isOpen}>
                Open Left (400px)
              </Button>
              <Button onClick={closeLeft} variant="light" disabled={!left.isOpen}>
                Close Left
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-3">Right Sidebar Controls</h2>
            <div className="flex gap-2">
              <Button onClick={() => openRight('demo-right')} disabled={right.isOpen}>
                Open Right
              </Button>
              <Button onClick={closeRight} variant="light" disabled={!right.isOpen}>
                Close Right
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Modal Controls</h2>
            <div className="flex gap-2">
              <Button onClick={() => openModal('demo-modal')} disabled={modal.isOpen}>
                Open Modal
              </Button>
              <Button onClick={closeModal} variant="light" disabled={!modal.isOpen}>
                Close Modal
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Snackbar Controls</h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => openSnackbar('demo-snackbar-bottom', 'bottom')} disabled={snackbar.isOpen}>
            Show Bottom Snackbar
          </Button>
          <Button onClick={() => openSnackbar('demo-snackbar-top', 'top')} disabled={snackbar.isOpen}>
            Show Top Snackbar
          </Button>
          <Button onClick={() => openSnackbar('demo-snackbar-bottom', 'left')} disabled={snackbar.isOpen}>
            Show Left Snackbar
          </Button>
          <Button onClick={() => openSnackbar('demo-snackbar-bottom', 'right')} disabled={snackbar.isOpen}>
            Show Right Snackbar
          </Button>
          <Button onClick={() => openSnackbar('demo-snackbar-bottom', 'center')} disabled={snackbar.isOpen}>
            Show Center Snackbar
          </Button>
          <Button onClick={closeSnackbar} variant="light" disabled={!snackbar.isOpen}>
            Close Snackbar
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Current State:</h3>
        <ul className="text-sm space-y-1">
          <li>Header: {header.isOpen ? '✅ Open' : '❌ Closed'}</li>
          <li>Left: {left.isOpen ? `✅ Open (${left.width})` : '❌ Closed'}</li>
          <li>Right: {right.isOpen ? `✅ Open (${right.width})` : '❌ Closed'}</li>
          <li>Modal: {modal.isOpen ? '✅ Open' : '❌ Closed'}</li>
          <li>Snackbar: {snackbar.isOpen ? `✅ Open (${snackbar.position})` : '❌ Closed'}</li>
        </ul>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• 6 Overlay Sections: Header, Content, Left, Right, Modal, Snackbar</li>
          <li>• Responsive Design: Mobile stack ↔ Desktop grid</li>
          <li>• Smooth Animations: All transitions with custom timing</li>
          <li>• Configurable Widths: Dynamic panel sizing</li>
          <li>• 5 Snackbar Positions: Top, Bottom, Left, Right, Center</li>
          <li>• Context State Management: React hooks & registry</li>
        </ul>
      </div>
    </div>
  );
};

const meta = {
  title: 'Layouts/OverlayLayout',
  component: OverlayLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
} satisfies Meta<typeof OverlayLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <OverlayLayout>
      <DemoContent />
    </OverlayLayout>
  ),
};

