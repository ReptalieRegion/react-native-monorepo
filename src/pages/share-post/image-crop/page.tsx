import React, { useEffect } from 'react';
import ImageCrop from '@/components/share-post/image-crop/template/ImageCrop';
import SharePostWriteStore from '@/stores/share-post/write';
import CustomSafeArea from '@/components/common/layouts/safe-area/CustomSafeArea';

const ImageCropPage = () => {
    const reset = SharePostWriteStore((state) => state.reset);

    useEffect(() => () => reset());

    return (
        <CustomSafeArea>
            <ImageCrop />
        </CustomSafeArea>
    );
};

export default ImageCropPage;
