import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import useCreateBlockUser from './hooks/useCreateBlockUser';
import UserOptionsMenuBottomSheet from './UserOptionsMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useUserOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const { mutate } = useCreateBlockUser();

    const openUserOptionsMenuBottomSheet = useCallback(
        ({ nickname }: { nickname: string }) => {
            const listItem = [
                {
                    text: '차단하기',
                    onPress: () => {
                        mutate({ nickname });
                    },
                },
            ];

            const bottomSheetHeight = 59 + 38 * listItem.length;

            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                onClose={() => {
                                    close();
                                    resolve(false);
                                }}
                                snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}
                            >
                                <UserOptionsMenuBottomSheet listItem={listItem} bottomSheetHeight={bottomSheetHeight} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [mutate, overlay],
    );

    return openUserOptionsMenuBottomSheet;
}
