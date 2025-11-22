import { useOverlay } from '../context/OverlayContext';

export default function OverlayRight() {
  const { right } = useOverlay();

  if (!right.isOpen || !right.node) {
    return null;
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto w-full md:w-auto animate-slide-in-right transition-all duration-300 ease-out"
      style={{ width: right.width }}
    >
      {right.node}
    </div>
  );
}
