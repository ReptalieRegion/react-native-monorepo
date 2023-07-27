import React from 'react';
import SharePostWriteRightHeader from './SharePostWriteRight';
import { BaseHeader } from '@/components/common/layouts';

const ShareHeader = () => {
    return <BaseHeader leftIcon="back" title="일상공유 등록" right={<SharePostWriteRightHeader />} />;
};

export default ShareHeader;
