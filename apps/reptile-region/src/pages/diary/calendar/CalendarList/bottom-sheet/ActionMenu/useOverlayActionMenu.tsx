import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import ActionMenuBottomSheet, { type ActionMenuProps } from './ActionMenu';

export default function useOverlayActionMenuBottomSheet() {
    const overlay = useOverlay();
    const openActionMenuBottomSheet = useCallback(
        ({ calendar }: Pick<ActionMenuProps, 'calendar'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <ActionMenuBottomSheet
                        calendar={calendar}
                        isOpen={isOpen}
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

    return openActionMenuBottomSheet;
}
