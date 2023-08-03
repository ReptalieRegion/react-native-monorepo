import React from 'react';

import ImageCropRightHeader from './ImageCropRight';

import { BaseHeader } from '@/components/common/layouts/header/BaseHeader';

const ImageCropHeader = () => {
    return <BaseHeader leftIcon="cancel" title="사진 등록" right={<ImageCropRightHeader />} />;
};

export default ImageCropHeader;
