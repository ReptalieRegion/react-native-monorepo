import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { createNativeStackHeader } from '@/components/@common/molecules';

export function SharePostDetailListHeader(props: NativeStackHeaderProps) {
    const handleLeftIconClick = () => {
        if (props.navigation.canGoBack()) {
            props.navigation.goBack();
        } else {
            props.navigation.navigate('bottom-tab/routes');
        }
    };
    return createNativeStackHeader({
        leftIcon: 'back',
        title: '게시물',
        leftIconClick: handleLeftIconClick,
    })(props);
}
