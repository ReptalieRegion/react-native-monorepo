import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import SelectEntityBottomSheet, { type SelectEntityProps } from './SelectEntity';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useOverlaySelectEntityBottomSheet({ onSelectEntity }: Pick<SelectEntityProps, 'onSelectEntity'>) {
    const overlay = useOverlay();
    const openSelectEntityBottomSheet = useCallback(() => {
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
                            snapInfo={{ pointsFromTop: ['70%'], startIndex: 0 }}
                            headerTitle="개체선택"
                        >
                            <SelectEntityBottomSheet onSelectEntity={onSelectEntity} />
                        </BottomSheet>
                    }
                />
            ));
        });
    }, [overlay, onSelectEntity]);

    return openSelectEntityBottomSheet;
}
