import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import Toast, { type ToastProps } from './Toast';

export default function useToast() {
    const overlay = useOverlay();
    const openToast = useCallback(
        ({ severity, contents }: Pick<ToastProps, 'severity' | 'contents'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <Toast
                        isOpen={isOpen}
                        severity={severity}
                        contents={contents}
                        onClose={() => {
                            resolve(false);
                            close();
                        }}
                    />
                ));
            });
        },
        [overlay],
    );

    return openToast;
}
