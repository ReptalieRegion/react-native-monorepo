import React, { useEffect } from 'react';
import ImageCrop from '@/components/image-crop/template/ImageCrop';
import SharePostStore from '@/stores/share-post';

const ImageCropPage = () => {
    const reset = SharePostStore((state) => state.reset);

    useEffect(() => {
        return () => reset();
    });

    return <ImageCrop />;
};

export default ImageCropPage;
