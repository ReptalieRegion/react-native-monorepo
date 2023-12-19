import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import SelectEntityBottomSheet, { type SelectEntityActions } from './SelectEntity';

export default function useOverlaySelectEntityBottomSheet({ onSelectEntity }: Pick<SelectEntityActions, 'onSelectEntity'>) {
    const overlay = useOverlay();
    const openSelectEntityBottomSheet = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            overlay.open(({ isOpen, close }) => (
                <SelectEntityBottomSheet
                    isOpen={isOpen}
                    onSelectEntity={onSelectEntity}
                    onClose={() => {
                        resolve(false);
                        close();
                    }}
                />
            ));
        });
    }, [overlay, onSelectEntity]);

    return openSelectEntityBottomSheet;
}
