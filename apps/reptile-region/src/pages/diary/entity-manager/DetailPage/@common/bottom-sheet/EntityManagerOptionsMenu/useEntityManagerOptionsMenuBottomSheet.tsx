import { useOverlay } from '@crawl/overlay-manager';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import EntityManagerOptionsMenuBottomSheet, { type EntityManagerOptionsMenuBottomSheetProps } from './EntityManagerOptionsMenu';

import type { EntityManagerDetailNavigationProp } from '@/types/routes/props/diary/entity';

export default function useEntityManagerOptionsMenuBottomSheet() {
    const overlay = useOverlay();
    const navigation = useNavigation<EntityManagerDetailNavigationProp>();

    const openEntityManagerOptionsMenuBottomSheet = useCallback(
        ({ entity }: Pick<EntityManagerOptionsMenuBottomSheetProps, 'entity'>) => {
            return new Promise<boolean>((resolve) => {
                overlay.open(({ isOpen, close }) => (
                    <EntityManagerOptionsMenuBottomSheet
                        isOpen={isOpen}
                        entity={entity}
                        navigation={navigation}
                        onClose={() => {
                            resolve(false);
                            close();
                        }}
                    />
                ));
            });
        },
        [navigation, overlay],
    );

    return openEntityManagerOptionsMenuBottomSheet;
}
