import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { OverlayContext } from './OverlayContext';
import { OverlayController, type OverlayControlRef } from './OverlayController';
import type { CreateOverlayElement } from './types';

let elementId = 1;

interface Options {
    exitOnUnmount?: boolean;
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
    const context = useContext(OverlayContext);

    if (context == null) {
        throw new Error('OverlayProvider를 감싸주세요.');
    }

    const { mount, unmount } = context;
    const [id] = useState(() => String(elementId++));

    const overlayRef = useRef<OverlayControlRef | null>(null);

    useEffect(() => {
        return () => {
            if (exitOnUnmount) {
                unmount(id);
            }
        };
    }, [exitOnUnmount, id, unmount]);

    return useMemo(
        () => ({
            open: (overlayElement: CreateOverlayElement) => {
                mount(
                    id,
                    <OverlayController
                        key={Date.now()}
                        ref={overlayRef}
                        overlayElement={overlayElement}
                        onExit={() => {
                            unmount(id);
                        }}
                    />,
                );
            },
            close: () => {
                overlayRef.current?.close();
            },
            exit: () => {
                unmount(id);
            },
        }),
        [id, mount, unmount],
    );
}
