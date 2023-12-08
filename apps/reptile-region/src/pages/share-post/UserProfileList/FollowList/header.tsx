import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

export function SharePostFollowHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as FollowRouterParams;
    return createNativeStackHeader({
        leftIcon: 'back',
        title: param.user.nickname,
        containerStyle: {
            borderBottomWidth: 0,
            borderBottomColor: undefined,
        },
    })(props);
}
