import React, { useEffect } from 'react';
import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import SharePostStore from '@/stores/share-post';
import CustomSafeArea from '@/components/common/layouts/safe-area/CustomSafeArea';

const ImageCropPage = () => {
    const reset = SharePostStore((state) => state.reset);

    useEffect(() => () => reset());

    return (
        <CustomSafeArea>
            <ImageCrop />
        </CustomSafeArea>
    );
};

export default ImageCropPage;
