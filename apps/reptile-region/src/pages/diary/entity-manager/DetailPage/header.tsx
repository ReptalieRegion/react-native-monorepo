import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { KebabMenu } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { EntityOptionsMenuParams } from '@/types/routes/params/diary';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary';

export const EntityManagerDetailPageHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '',
});

export function ChangeHeader({
    navigation,
    entity,
}: Pick<EntityManagerDetailScreenProps, 'navigation'> & EntityOptionsMenuParams) {
    useEffect(() => {
        const headerRight = () => {
            const handlePressKebabMenu = () => {
                navigation.navigate('entity-manager/options-menu', {
                    entity,
                });
            };

            return (
                <TouchableOpacity onPress={handlePressKebabMenu}>
                    <KebabMenu />
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [entity, navigation]);

    return null;
}
