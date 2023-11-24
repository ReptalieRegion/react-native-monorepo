import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function NotificationSettingHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        title: '푸시 알림 설정',
        leftIcon: 'back',
    })(props);
}
