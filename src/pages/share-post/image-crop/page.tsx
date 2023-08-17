import React, { useEffect } from 'react';

import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import useSharePostWriteStore from '@/stores/share-post/write';

const SharePostImageCropPage = () => {
    const reset = useSharePostWriteStore((state) => state.reset);

    useEffect(() => () => reset());

    return <ImageCrop />;
};

export default SharePostImageCropPage;
