import { useOverlay } from '../context/OverlayContext';

export default function OverlayLeft() {
  const { left } = useOverlay();

  if (!left.isOpen || !left.node) {
    return null;
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto w-full md:w-auto animate-slide-in-left"
      style={{ width: left.width }}
    >
      {left.node}
    </div>
  );
}
