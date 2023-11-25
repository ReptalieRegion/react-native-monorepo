import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function SharePostMeImageThumbnailListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'back' })(props);
}
