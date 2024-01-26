import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import MemoUpdateBottomSheet, { type MemoUpdateBottomSheetProps } from './MemoUpdate';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useMemoUpdateBottomSheet() {
    const overlay = useOverlay({ exitOnUnmount: false });
    const openSelectEntityBottomSheet = useCallback(
        ({ calendar, searchDate }: Pick<MemoUpdateBottomSheetProps, 'calendar' | 'searchDate'>) => {
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
                                headerTitle="메모수정"
                            >
                                <MemoUpdateBottomSheet calendar={calendar} searchDate={searchDate} />
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
