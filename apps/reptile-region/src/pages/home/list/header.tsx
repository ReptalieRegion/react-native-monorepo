import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { NotificationIcon } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';

export function HomeListHeader(props: NativeStackHeaderProps) {
    const handlePressNotification = () => {
        props.navigation.navigate('my/notification-log');
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
