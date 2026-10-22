declare global {
  interface Window {
    horusDesk?: {
      ask: (message: string) => void;
      open: () => void;
      close: () => void;
      destroy: () => void;
      isOpen: () => boolean;
    };
  }
}

export {};
