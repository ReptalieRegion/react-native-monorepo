import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import TagUpdateBottomSheet, { type TagUpdateBottomSheetProps } from './TagUpdate';

export default function useTagUpdateBottomSheet() {
    const overlay = useOverlay();
    const openSelectEntityBottomSheet = useCallback(
        ({ calendar, searchDate }: Pick<TagUpdateBottomSheetProps, 'calendar' | 'searchDate'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <TagUpdateBottomSheet
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
