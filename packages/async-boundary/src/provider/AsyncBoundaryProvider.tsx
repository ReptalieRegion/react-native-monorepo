import React, { createContext, useContext, type ReactNode } from 'react';

import useResetError from '../hooks/useResetError';

interface AsyncBoundaryProvider {
    resetKey: number;
    reset(): void;
}

const AsyncBoundaryContext = createContext<AsyncBoundaryProvider | null>(null);

interface AsyncBoundaryProviderProps {
    children: ReactNode;
}

export function AsyncBoundaryProvider({ children }: AsyncBoundaryProviderProps) {
    const [resetKey, reset] = useResetError();

    return <AsyncBoundaryContext.Provider value={{ resetKey, reset }}>{children}</AsyncBoundaryContext.Provider>;
}

export function useAsyncBoundaryContext() {
    return useContext(AsyncBoundaryContext) ?? { resetKey: null, reset: () => {} };
}
