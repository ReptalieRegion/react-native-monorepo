import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import type { BottomTabLessSharePostDetailProps } from '<BottomTabLessNavigationList>';
import type { BottomTabSharePostDetailProps } from '<BottomTabSharePostRoutes>';
import { createNativeStackHeader } from '@/components/common/layouts/header/utils/create-header';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as BottomTabSharePostDetailProps | BottomTabLessSharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
};

export default SharePostDetailHeader;
