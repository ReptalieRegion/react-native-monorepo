import React, { useEffect } from 'react';

import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const SharePostImageCropPage = () => {
    const reset = usePhotoStore((state) => state.reset);

    useEffect(() => () => reset(), [reset]);

    return <ImageCrop />;
};

export default SharePostImageCropPage;
