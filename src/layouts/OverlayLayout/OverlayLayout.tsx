import { ReactNode } from 'react';
import { useOverlay } from './context/OverlayContext';
import OverlayHeader from './components/OverlayHeader';
import OverlayContent from './components/OverlayContent';
import OverlayLeft from './components/OverlayLeft';
import OverlayRight from './components/OverlayRight';
import OverlayModal from './components/OverlayModal';
import OverlaySnackbar from './components/OverlaySnackbar';

type OverlayLayoutProps = {
  children: ReactNode;
};

export default function OverlayLayout({ children }: OverlayLayoutProps) {
  const { left, right } = useOverlay();

  const getGridColumns = () => {
    if (left.isOpen && right.isOpen) return 'auto 1fr auto';
    if (left.isOpen) return 'auto 1fr';
    if (right.isOpen) return '1fr auto';
    return '1fr';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <OverlayHeader />

      {/* Mobile layout */}
      <div
        className="flex flex-col flex-1 gap-4 md:hidden overflow-hidden p-4 transition-all duration-300 ease-out"
        style={{
          animationDuration: '250ms',
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {left.isOpen ? (
          <OverlayLeft />
        ) : right.isOpen ? (
          <OverlayRight />
        ) : (
          <OverlayContent>{children}</OverlayContent>
        )}
      </div>

      {/* Desktop layout */}
      <div
        className="hidden md:grid flex-1 gap-4 overflow-hidden p-4 transition-all duration-300 ease-out"
        style={{
          gridTemplateColumns: getGridColumns(),
          animationDuration: '300ms',
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <OverlayLeft />
        <OverlayContent>{children}</OverlayContent>
        <OverlayRight />
      </div>

      <OverlayModal />
      <OverlaySnackbar />
    </div>
  );
}
