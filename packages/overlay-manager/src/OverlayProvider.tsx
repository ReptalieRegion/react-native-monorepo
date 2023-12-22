import React, { useCallback, useMemo, useState, type PropsWithChildren, type ReactNode } from 'react';

import { OverlayContext } from './OverlayContext';

export default function OverlayProvider({ children }: PropsWithChildren) {
    const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map());

    const mount = useCallback((id: string, element: ReactNode) => {
        setOverlayById((prevOverlayById) => {
            const cloned = new Map(prevOverlayById);
            cloned.set(id, element);
            return cloned;
        });
    }, []);

    const unmount = useCallback((id: string) => {
        setOverlayById((prevOverlayById) => {
            const cloned = new Map(prevOverlayById);
            cloned.delete(id);
            return cloned;
        });
    }, []);

    const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

    return (
        <OverlayContext.Provider value={context}>
            {children}
            {[...overlayById.entries()].map(([id, element]) => (
                <React.Fragment key={id}>{element}</React.Fragment>
            ))}
        </OverlayContext.Provider>
    );
}
