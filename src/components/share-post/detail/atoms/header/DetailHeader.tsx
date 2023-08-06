import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import { SharePostDetailPageProp } from '<Routes>';
import { BaseHeader } from '@/components/common/layouts';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as SharePostDetailPageProp;
    return <BaseHeader leftIcon="back" title={param.nickname} />;
};

export default SharePostDetailHeader;
