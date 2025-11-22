import { useOverlay } from '../context/OverlayContext';
import type { OverlayPosition } from '../types';

const positionClasses: Record<OverlayPosition, string> = {
  top: 'top-4 left-1/2 -translate-x-1/2',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  left: 'top-1/2 left-4 -translate-y-1/2',
  right: 'top-1/2 right-4 -translate-y-1/2',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

const slideInClasses: Record<OverlayPosition, string> = {
  top: 'animate-slide-in-top',
  bottom: 'animate-slide-in-bottom',
  left: 'animate-slide-in-left',
  right: 'animate-slide-in-right',
  center: 'animate-zoom-in',
};

export default function OverlaySnackbar() {
  const { snackbar } = useOverlay();

  if (!snackbar.isOpen || !snackbar.node) {
    return null;
  }

  const position = snackbar.position || 'bottom';

  return (
    <div
      className={`fixed z-50 ${positionClasses[position]} ${slideInClasses[position]}`}
    >
      {snackbar.node}
    </div>
  );
}
