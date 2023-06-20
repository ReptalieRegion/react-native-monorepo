import React, { useEffect } from 'react';
import ImageCrop from '@/components/image-crop/template/ImageCrop';
import imageCropStore from '@/stores/image-crop';

const ImageCropPage = () => {
    const reset = imageCropStore((state) => state.reset);

    useEffect(() => {
        return () => reset();
    });

    return <ImageCrop />;
};

export default ImageCropPage;
