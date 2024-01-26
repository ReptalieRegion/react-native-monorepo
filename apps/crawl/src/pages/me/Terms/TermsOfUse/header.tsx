import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function TermsOfUseHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'back',
        title: '서비스 이용약관',
    })(props);
}
