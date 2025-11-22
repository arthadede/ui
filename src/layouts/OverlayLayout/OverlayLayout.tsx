import { ReactNode } from 'react';
import { useOverlay } from './context/OverlayContext';
import { getAdaptiveVariantClassesString } from '../../tokens';
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

  const adaptiveBackground = getAdaptiveVariantClassesString('card');

  const getGridColumns = () => {
    if (left.isOpen && right.isOpen) return 'auto 1fr auto';
    if (left.isOpen) return 'auto 1fr';
    if (right.isOpen) return '1fr auto';
    return '1fr';
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 ${adaptiveBackground}`}>
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
          transition: 'grid-template-columns 300ms cubic-bezier(0.16, 1, 0.3, 1)',
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
