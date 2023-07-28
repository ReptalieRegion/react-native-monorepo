import React from 'react';
import { BaseHeader } from '@/components/common/layouts';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SharePostDetailPageProp } from '<Routes>';

const SharePostDetailHeader = (props: NativeStackHeaderProps) => {
    const param = props.route.params as SharePostDetailPageProp;
    return <BaseHeader leftIcon="back" title={param.nickname} />;
};

export default SharePostDetailHeader;
