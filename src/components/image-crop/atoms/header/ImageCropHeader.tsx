import React from 'react';
import Header from '@/components/ui/header/MainHeader';
import ImageCropRightHeader from './ImageCropRight';

const ImageCropHeader = () => {
    return <Header leftIcon="cancel" title="사진 등록" right={<ImageCropRightHeader />} />;
};

export default ImageCropHeader;
