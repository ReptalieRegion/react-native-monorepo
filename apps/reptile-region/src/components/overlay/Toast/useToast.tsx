import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import Toast, { type ToastProps } from './Toast';

export default function useToast() {
    const overlay = useOverlay({ exitOnUnmount: false });

    const openToast = useCallback(
        ({ severity, contents }: Pick<ToastProps, 'severity' | 'contents'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close, exit }) => (
                    <Toast
                        isOpen={isOpen}
                        severity={severity}
                        contents={contents}
                        onClose={() => {
                            resolve(false);
                            close();
                            exit();
                        }}
                    />
                ));
            });
        },
        [overlay],
    );

    return openToast;
}
