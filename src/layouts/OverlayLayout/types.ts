import { ReactNode } from 'react';

export type OverlayPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export type OverlayConfig = {
  render: () => ReactNode;
  width?: string;
  position?: OverlayPosition;
};

export type OverlayState = {
  header: {
    isOpen: boolean;
    key: string;
    node: ReactNode;
  };
  left: {
    isOpen: boolean;
    key: string;
    node: ReactNode;
    width: string;
  };
  right: {
    isOpen: boolean;
    key: string;
    node: ReactNode;
    width: string;
  };
  modal: {
    isOpen: boolean;
    key: string;
    node: ReactNode;
  };
  snackbar: {
    isOpen: boolean;
    key: string;
    node: ReactNode;
    position: OverlayPosition;
  };
};

export type OverlayActions = {
  openHeader: (key: string) => void;
  closeHeader: () => void;

  openLeft: (key: string, width?: string) => void;
  closeLeft: () => void;

  openRight: (key: string, width?: string) => void;
  closeRight: () => void;

  openModal: (key: string) => void;
  closeModal: () => void;

  openSnackbar: (key: string, position?: OverlayPosition) => void;
  closeSnackbar: () => void;

  registerOverlay: (key: string, config: OverlayConfig) => void;
  unregisterOverlay: (key: string) => void;
};

export type OverlayContextValue = OverlayState & OverlayActions;

export type OverlayProviderProps = {
  children: ReactNode;
  defaultHeader?: string;
  defaultLeft?: string;
  defaultRight?: string;
  defaultLeftWidth?: string;
  defaultRightWidth?: string;
};
