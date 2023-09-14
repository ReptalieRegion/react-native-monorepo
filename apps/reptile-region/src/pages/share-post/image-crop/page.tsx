import React, { useEffect } from 'react';

import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import usePhotoStore from '@/stores/share-post/usePhotoStore';
import useUserTaggingStore from '@/stores/share-post/useUserTaggingStore';

const SharePostImageCropPage = () => {
    const resetImageStore = usePhotoStore((state) => state.resetImageStore);
    const resetUserTaggingStore = useUserTaggingStore((state) => state.resetUserTaggingStore);

    useEffect(
        () => () => {
            resetImageStore();
            resetUserTaggingStore();
        },
        [resetImageStore, resetUserTaggingStore],
    );

    return <ImageCrop />;
};

export default SharePostImageCropPage;
