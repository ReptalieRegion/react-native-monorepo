import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import ActionMenuBottomSheet from './ActionMenu';

export default function useOverlayActionMenuBottomSheet() {
    const overlay = useOverlay();
    const openActionMenuBottomSheet = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            overlay.open(({ isOpen, close }) => (
                <ActionMenuBottomSheet
                    isShowBottomSheet={isOpen}
                    onClose={() => {
                        resolve(false);
                        close();
                    }}
                />
            ));
        });
    }, [overlay]);

    return openActionMenuBottomSheet;
}
