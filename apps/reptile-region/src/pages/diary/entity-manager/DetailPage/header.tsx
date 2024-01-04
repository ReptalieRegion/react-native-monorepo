import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { EntityManagerOptionsMenuBottomSheetProps } from './bottom-sheet/EntityManagerOptionsMenu/EntityManagerOptionsMenu';
import useEntityManagerOptionsMenuBottomSheet from './bottom-sheet/EntityManagerOptionsMenu/useEntityManagerOptionsMenuBottomSheet';

import { KebabMenu } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary/entity';

export const EntityManagerDetailPageHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '',
});

export function ChangeHeader({
    navigation,
    entity,
}: Pick<EntityManagerDetailScreenProps, 'navigation'> & Pick<EntityManagerOptionsMenuBottomSheetProps, 'entity'>) {
    const openEntityManagerOptionsMenuBottomSheet = useEntityManagerOptionsMenuBottomSheet(navigation);

    useEffect(() => {
        const headerRight = () => {
            return (
                <TouchableOpacity onPress={() => openEntityManagerOptionsMenuBottomSheet({ entity })}>
                    <KebabMenu />
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [entity, navigation, openEntityManagerOptionsMenuBottomSheet]);

    return null;
}
