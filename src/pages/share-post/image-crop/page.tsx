import React, { useEffect } from 'react';
import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import SharePostWriteStore from '@/stores/share-post/write';

const ImageCropPage = () => {
    const reset = SharePostWriteStore((state) => state.reset);

    useEffect(() => () => reset());

    return <ImageCrop />;
};

export default ImageCropPage;
