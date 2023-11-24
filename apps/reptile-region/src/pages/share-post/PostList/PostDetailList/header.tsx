import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function SharePostDetailModalHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'back',
        title: '게시물',
    })(props);
}
