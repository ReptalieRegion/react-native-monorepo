import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import CreateWeightBottomSheet, { type UpdateWeightBottomSheetProps } from './UpdateWeight';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useUpdateWeightBottomSheet() {
    const overlay = useOverlay();

    const openUpdateWeightBottomSheet = useCallback(
        ({ entity }: Pick<UpdateWeightBottomSheetProps, 'entity'>) => {
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
                                snapInfo={{ pointsFromTop: [400], startIndex: 0 }}
                                headerTitle="몸무게 수정"
                            >
                                <CreateWeightBottomSheet entity={entity} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openUpdateWeightBottomSheet;
}
