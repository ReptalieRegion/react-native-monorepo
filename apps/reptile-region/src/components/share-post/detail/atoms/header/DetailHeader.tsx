import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { BottomTabLessSharePostDetailProps } from '<BottomTabLessSharePostRoutes>';
import { BottomTabSharePostDetailProps } from '<BottomTabSharePostRoutes>';
import { createNativeStackHeader } from '../../../../common/layouts/header/utils/create-header';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as BottomTabSharePostDetailProps | BottomTabLessSharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
};

export default SharePostDetailHeader;
