import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function CalendarItemCreateHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'cancel',
        title: '다이어리 수정하기',
    })(props);
}
