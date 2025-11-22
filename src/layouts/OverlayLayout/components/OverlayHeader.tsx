import { useOverlay } from '../context/OverlayContext';

export default function OverlayHeader() {
  const { header } = useOverlay();

  if (!header.isOpen || !header.node) {
    return null;
  }

  return (
    <div className="w-full animate-slide-in-top">
      {header.node}
    </div>
  );
}
