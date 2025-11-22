import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type {
  OverlayConfig,
  OverlayContextValue,
  OverlayProviderProps,
  OverlayPosition,
} from '../types';

const overlayRegistry = new Map<string, OverlayConfig>();

const OverlayContext = createContext<OverlayContextValue | undefined>(undefined);

export function OverlayProvider({
  children,
  defaultHeader,
  defaultLeft,
  defaultRight,
  defaultLeftWidth = '300px',
  defaultRightWidth = '300px',
}: OverlayProviderProps) {
  const [headerState, setHeaderState] = useState<{
    isOpen: boolean;
    key: string;
    node: ReactNode;
  }>({
    isOpen: !!defaultHeader,
    key: defaultHeader || '',
    node: defaultHeader ? overlayRegistry.get(defaultHeader)?.render() : null,
  });

  const [leftState, setLeftState] = useState<{
    isOpen: boolean;
    key: string;
    node: ReactNode;
    width: string;
  }>({
    isOpen: !!defaultLeft,
    key: defaultLeft || '',
    node: defaultLeft ? overlayRegistry.get(defaultLeft)?.render() : null,
    width: defaultLeftWidth,
  });

  const [rightState, setRightState] = useState<{
    isOpen: boolean;
    key: string;
    node: ReactNode;
    width: string;
  }>({
    isOpen: !!defaultRight,
    key: defaultRight || '',
    node: defaultRight ? overlayRegistry.get(defaultRight)?.render() : null,
    width: defaultRightWidth,
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    key: string;
    node: ReactNode;
  }>({
    isOpen: false,
    key: '',
    node: null,
  });

  const [snackbarState, setSnackbarState] = useState<{
    isOpen: boolean;
    key: string;
    node: ReactNode;
    position: OverlayPosition;
  }>({
    isOpen: false,
    key: '',
    node: null,
    position: 'bottom',
  });

  const registerOverlay = useCallback((key: string, config: OverlayConfig) => {
    overlayRegistry.set(key, config);
  }, []);

  const unregisterOverlay = useCallback((key: string) => {
    overlayRegistry.delete(key);
  }, []);

  const openHeader = useCallback((key: string) => {
    const config = overlayRegistry.get(key);
    if (!config) {
      console.warn(`Overlay with key "${key}" is not registered`);
      return;
    }
    setHeaderState({
      isOpen: true,
      key,
      node: config.render(),
    });
  }, []);

  const closeHeader = useCallback(() => {
    setHeaderState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const openLeft = useCallback((key: string, width?: string) => {
    const config = overlayRegistry.get(key);
    if (!config) {
      console.warn(`Overlay with key "${key}" is not registered`);
      return;
    }
    setLeftState({
      isOpen: true,
      key,
      node: config.render(),
      width: width || config.width || defaultLeftWidth,
    });
  }, [defaultLeftWidth]);

  const closeLeft = useCallback(() => {
    setLeftState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const openRight = useCallback((key: string, width?: string) => {
    const config = overlayRegistry.get(key);
    if (!config) {
      console.warn(`Overlay with key "${key}" is not registered`);
      return;
    }
    setRightState({
      isOpen: true,
      key,
      node: config.render(),
      width: width || config.width || defaultRightWidth,
    });
  }, [defaultRightWidth]);

  const closeRight = useCallback(() => {
    setRightState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const openModal = useCallback((key: string) => {
    const config = overlayRegistry.get(key);
    if (!config) {
      console.warn(`Overlay with key "${key}" is not registered`);
      return;
    }
    setModalState({
      isOpen: true,
      key,
      node: config.render(),
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const openSnackbar = useCallback((key: string, position: OverlayPosition = 'bottom') => {
    const config = overlayRegistry.get(key);
    if (!config) {
      console.warn(`Overlay with key "${key}" is not registered`);
      return;
    }
    setSnackbarState({
      isOpen: true,
      key,
      node: config.render(),
      position: position || config.position || 'bottom',
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const value = useMemo<OverlayContextValue>(
    () => ({
      header: headerState,
      left: leftState,
      right: rightState,
      modal: modalState,
      snackbar: snackbarState,
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
      unregisterOverlay,
    }),
    [
      headerState,
      leftState,
      rightState,
      modalState,
      snackbarState,
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
      unregisterOverlay,
    ]
  );

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay(): OverlayContextValue {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
}
