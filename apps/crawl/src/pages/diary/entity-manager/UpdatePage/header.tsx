import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function EntityMangerUpdateHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'cancel', title: '개체 수정' })(props);
}
