import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import ConditionRender from '../../../components/ConditionRender';
import { BOTTOM_SHEET_LIST } from '../../../mocks/bottom-sheet-list';

import TestBottomSheet from './TestBottomSheet';

export default function useTestBottomSheet() {
    const overlay = useOverlay();

    const openToast = useCallback(() => {
        return new Promise<boolean>(() => {
            overlay.open(({ isOpen, close, exit }) => (
                <ConditionRender
                    condition={isOpen}
                    trueContent={
                        <BottomSheet
                            headerTitle="BottomSheet Test"
                            snapInfo={{
                                pointsFromTop: ['50%', '70%'],
                                startIndex: 1,
                            }}
                            onClose={() => {
                                close();
                                exit;
                            }}
                        >
                            <TestBottomSheet data={BOTTOM_SHEET_LIST} />
                        </BottomSheet>
                    }
                />
            ));
        });
    }, [overlay]);

    return openToast;
}
