import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import type { SharePostDetailProps } from '<RootRoutes>';
import { createNativeStackHeader } from '@/components/common/layouts/header/utils/create-header';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
};

export default SharePostDetailHeader;
