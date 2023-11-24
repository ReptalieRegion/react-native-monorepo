import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import type { SharePostDetailProps } from '<routes/bottom-tab>';
import { createNativeStackHeader } from '@/components/@common/molecules';

export function SharePostFollowHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({
        leftIcon: 'back',
        title: param.nickname,
        containerStyle: {
            borderBottomWidth: 0,
            borderBottomColor: undefined,
        },
    })(props);
}
