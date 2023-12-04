import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { KebabMenu } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary';

export const EntityManagerDetailPageHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '',
});

export function ChangeHeader({
    navigation,
    route: {
        params: { entityId },
    },
}: EntityManagerDetailScreenProps) {
    useEffect(() => {
        const headerRight = () => {
            const handlePressKebabMenu = () => {
                navigation.navigate('entity-manager/options-menu', {
                    entityId,
                });
            };

            return (
                <TouchableOpacity onPress={handlePressKebabMenu}>
                    <KebabMenu />
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [entityId, navigation]);

    return null;
}
