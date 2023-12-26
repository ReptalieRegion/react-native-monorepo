import { BottomSheet } from '@crawl/bottom-sheet';
import { useOverlay } from '@crawl/overlay-manager';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import EntityManagerOptionsMenuBottomSheet, { type EntityManagerOptionsMenuBottomSheetProps } from './EntityManagerOptionsMenu';

import { ConditionalRenderer } from '@/components/@common/atoms';
import type { EntityManagerDetailNavigationProp } from '@/types/routes/props/diary/entity';

export default function useEntityManagerOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const navigation = useNavigation<EntityManagerDetailNavigationProp>();

    const openEntityManagerOptionsMenuBottomSheet = useCallback(
        ({ entity }: Pick<EntityManagerOptionsMenuBottomSheetProps, 'entity'>) => {
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
                                snapInfo={{ startIndex: 0, pointsFromTop: [59 + 38 * 2] }}
                            >
                                <EntityManagerOptionsMenuBottomSheet entity={entity} navigation={navigation} />
                            </BottomSheet>
                        }
                    />
                ));
            });
        },
        [navigation, overlay],
    );

    return openEntityManagerOptionsMenuBottomSheet;
}
