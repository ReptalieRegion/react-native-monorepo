import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import { NotificationIcon } from '@/assets/icons';
import { createNativeStackHeader } from '@/components/@common/molecules';

export function HomeListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'logo', right: <NotificationIcon /> })(props);
}
