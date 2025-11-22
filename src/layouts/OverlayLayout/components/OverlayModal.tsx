import { useOverlay } from '../context/OverlayContext';

export default function OverlayModal() {
  const { modal, closeModal } = useOverlay();

  if (!modal.isOpen || !modal.node) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={closeModal}
    >
      <div
        className="pointer-events-auto animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {modal.node}
      </div>
    </div>
  );
}
