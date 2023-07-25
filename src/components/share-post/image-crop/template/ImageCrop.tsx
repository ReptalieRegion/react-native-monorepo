import React from 'react';
import ImagePicker from '../organisms/ImagePicker';
import ImageCropHeader from '../atoms/header/ImageCropHeader';

const ImageCrop = () => {
    return (
        <>
            <ImageCropHeader />
            <ImagePicker />
        </>
    );
};

export default ImageCrop;
