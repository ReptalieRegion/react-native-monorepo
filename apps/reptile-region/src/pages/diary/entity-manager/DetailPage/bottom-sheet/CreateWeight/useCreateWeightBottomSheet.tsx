import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import CreateWeightBottomSheet, { type CreateWeightBottomSheetProps } from './CreateWeight';

export default function useCreateWeightBottomSheet() {
    const overlay = useOverlay();

    const openCreateWeightBottomSheet = useCallback(
        ({ entity }: Pick<CreateWeightBottomSheetProps, 'entity'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <CreateWeightBottomSheet
                        isOpen={isOpen}
                        entity={entity}
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

    return openCreateWeightBottomSheet;
}
