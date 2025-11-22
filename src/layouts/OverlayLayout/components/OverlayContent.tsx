import { ReactNode } from 'react';

type OverlayContentProps = {
  children: ReactNode;
};

export default function OverlayContent({ children }: OverlayContentProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto transition-all duration-300 ease-out animate-fade-in">
      {children}
    </div>
  );
}
