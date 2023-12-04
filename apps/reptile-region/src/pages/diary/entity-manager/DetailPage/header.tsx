import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { KebabMenu } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { EntityManagerUpdateScreenProps } from '@/types/routes/props/diary';

export const EntityManagerDetailPageHeader = createNativeStackHeader({
    leftIcon: 'back',
    title: '',
});

export function ChangeHeader({ navigation }: EntityManagerUpdateScreenProps) {
    useEffect(() => {
        const headerRight = () => {
            const handlePressKebabMenu = () => {
                navigation.navigate('share-post/bottom-sheet/post-options-menu', {
                    post: { contents: '', id: '', images: [{ src: '' }], isMine: false, user: { id: '' } },
                });
            };

            return (
                <TouchableOpacity onPress={handlePressKebabMenu}>
                    <KebabMenu />
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation]);

    return null;
}
