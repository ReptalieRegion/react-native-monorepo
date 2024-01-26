import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import CreateWeightBottomSheet, { type CreateWeightBottomSheetProps } from './CreateWeight';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useCreateWeightBottomSheet() {
    const overlay = useOverlay();

    const openCreateWeightBottomSheet = useCallback(
        ({ entity }: Pick<CreateWeightBottomSheetProps, 'entity'>) => {
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
                                headerTitle="몸무게 추가"
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

    return openCreateWeightBottomSheet;
}
