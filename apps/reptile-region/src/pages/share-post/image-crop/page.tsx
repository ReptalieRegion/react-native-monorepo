import React, { useEffect } from 'react';

import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import usePhotoStore from '@/stores/share-post/usePhotoStore';

const SharePostImageCropPage = () => {
    const resetImageStore = usePhotoStore((state) => state.resetImageStore);

    useEffect(() => () => resetImageStore(), [resetImageStore]);

    return <ImageCrop />;
};

export default SharePostImageCropPage;
