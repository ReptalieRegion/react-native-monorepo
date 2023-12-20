import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function CalendarDetailHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'cancel',
        title: '상세 보기',
    })(props);
}
