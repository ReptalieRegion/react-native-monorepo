import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useEntityManagerOptionsMenuBottomSheet from './bottom-sheet/EntityManagerOptionsMenu/useEntityManagerOptionsMenuBottomSheet';

import { KebabMenu } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { EntityOptionsMenuParams } from '@/types/routes/params/diary';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary/entity';

export const EntityManagerDetailPageHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '',
});

export function ChangeHeader({
    navigation,
    entity,
}: Pick<EntityManagerDetailScreenProps, 'navigation'> & EntityOptionsMenuParams) {
    const openEntityManagerOptionsMenuBottomSheet = useEntityManagerOptionsMenuBottomSheet();

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
