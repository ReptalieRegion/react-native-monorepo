import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import TagUpdateBottomSheet, { type TagUpdateBottomSheetProps } from './TagUpdate';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useTagUpdateBottomSheet() {
    const overlay = useOverlay({ exitOnUnmount: false });
    const openSelectEntityBottomSheet = useCallback(
        ({ calendar, searchDate }: Pick<TagUpdateBottomSheetProps, 'calendar' | 'searchDate'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close, exit }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                onClose={() => {
                                    resolve(false);
                                    close();
                                    exit();
                                }}
                                snapInfo={{ pointsFromTop: [300], startIndex: 0 }}
                                headerTitle="태그 수정"
                            >
                                <TagUpdateBottomSheet calendar={calendar} searchDate={searchDate} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openSelectEntityBottomSheet;
}
