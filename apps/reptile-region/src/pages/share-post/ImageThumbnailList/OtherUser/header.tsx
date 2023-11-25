import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function SharePostImageThumbnailListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'back' })(props);
}
