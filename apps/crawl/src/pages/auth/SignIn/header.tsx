import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function SignInHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'cancel' })(props);
}
