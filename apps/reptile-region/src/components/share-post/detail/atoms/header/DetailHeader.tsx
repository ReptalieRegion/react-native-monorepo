import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { SharePostDetailProps } from '<SharePostRoutes>';
import { createNativeStackHeader } from '@/components/@common/molecules';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
};

export default SharePostDetailHeader;
