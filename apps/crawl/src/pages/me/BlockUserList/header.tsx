import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function BlockUserListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'back',
        title: '차단 관리',
    })(props);
}
