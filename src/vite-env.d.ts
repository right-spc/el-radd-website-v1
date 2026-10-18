/// <reference types="vite/client" />

declare global {
  interface Window {
    trackPillClick: (question: string) => void;
  }
}

export {};
