import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState, type ForwardedRef } from 'react';

import type { CreateOverlayElement } from './types';

interface OverlayControllerProps {
    overlayElement: CreateOverlayElement;
    onExit: () => void;
}

export interface OverlayControlRef {
    close: () => void;
}

export const OverlayController = forwardRef(function OverlayController(
    { overlayElement: OverlayElement, onExit }: OverlayControllerProps,
    ref: ForwardedRef<OverlayControlRef>,
) {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);

    const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), []);

    useImperativeHandle(
        ref,
        () => {
            return { close: handleOverlayClose };
        },
        [handleOverlayClose],
    );

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsOpenOverlay(true);
        });
    }, []);

    return <OverlayElement isOpen={isOpenOverlay} close={handleOverlayClose} exit={onExit} />;
});
