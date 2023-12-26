import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import MemoUpdateBottomSheet, { type MemoUpdateBottomSheetProps } from './MemoUpdate';

export default function useMemoUpdateBottomSheet() {
    const overlay = useOverlay();
    const openSelectEntityBottomSheet = useCallback(
        ({ calendar, searchDate }: Pick<MemoUpdateBottomSheetProps, 'calendar' | 'searchDate'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <MemoUpdateBottomSheet
                        isOpen={isOpen}
                        calendar={calendar}
                        searchDate={searchDate}
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

    return openSelectEntityBottomSheet;
}
