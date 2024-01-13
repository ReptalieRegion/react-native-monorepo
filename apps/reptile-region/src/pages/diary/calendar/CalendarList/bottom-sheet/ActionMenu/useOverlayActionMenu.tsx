import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import ActionMenuBottomSheet, { type ActionMenuProps } from './ActionMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useOverlayActionMenuBottomSheet() {
    const overlay = useOverlay();
    const openActionMenuBottomSheet = useCallback(
        ({ calendar, searchDate }: Pick<ActionMenuProps, 'calendar' | 'searchDate'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                onClose={() => {
                                    resolve(false);
                                    close();
                                }}
                                snapInfo={{ pointsFromTop: [59 + 38 * 3], startIndex: 0 }}
                            >
                                <ActionMenuBottomSheet calendar={calendar} searchDate={searchDate} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openActionMenuBottomSheet;
}
