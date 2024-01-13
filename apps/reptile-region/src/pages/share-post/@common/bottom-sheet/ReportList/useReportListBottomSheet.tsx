import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import React, { useCallback } from 'react';

import ReportListBottomSheet, { type ReportListProps } from './ReportList';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function useReportListBottomSheet() {
    const overlay = useOverlay({ exitOnUnmount: false });
    const openReportListBottomSheet = useCallback(
        ({ report }: Pick<ReportListProps, 'report'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close, exit }) => (
                    <ConditionalRenderer
                        condition={isOpen}
                        trueContent={
                            <BottomSheet
                                headerTitle="신고"
                                onClose={() => {
                                    close();
                                    exit();
                                    resolve(true);
                                }}
                                snapInfo={{ startIndex: 0, pointsFromTop: ['50%'] }}
                            >
                                <ReportListBottomSheet report={report} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [overlay],
    );

    return openReportListBottomSheet;
}
