import type { ReactNode } from 'react';

type OverlayContextActions = {
    mount(id: string, element: ReactNode): void;
    unmount(id: string): void;
};

type CreateOverlayElement = (props: { isOpen: boolean; close: () => void; exit: () => void }) => JSX.Element;

export type { CreateOverlayElement, OverlayContextActions };
