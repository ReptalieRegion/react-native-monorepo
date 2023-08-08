import React, { useEffect } from 'react';

import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import SharePostWriteStore from '@/stores/share-post/write';

const SharePostImageCropPage = () => {
    const reset = SharePostWriteStore((state) => state.reset);

    useEffect(() => () => reset());

    return <ImageCrop />;
};

export default SharePostImageCropPage;
