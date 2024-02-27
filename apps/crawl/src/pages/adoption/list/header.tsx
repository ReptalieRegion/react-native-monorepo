import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { NotificationIcon } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';

export function AdoptionListHeader(props: NativeStackHeaderProps) {
    const { requireAuthNavigation } = useAuthNavigation();
    const handlePressNotification = () => {
        requireAuthNavigation(() => {
            props.navigation.navigate('me/notification-log');
        });
    };

    return createNativeStackHeader({
        leftIcon: 'logo',
        right: (
            <TouchableOpacity onPress={handlePressNotification}>
                <NotificationIcon />
            </TouchableOpacity>
        ),
    })(props);
}
