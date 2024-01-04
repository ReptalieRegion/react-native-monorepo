import { useContext } from 'react';

import { ImageStateContext } from '../contexts/ImageContext';

import { useTag } from '@/pages/share-post/@common/contexts/TagTextInput';

const usePostUpdate = () => {
    const { contents } = useTag();
    const imageState = useContext(ImageStateContext);

    if (imageState === null) {
        throw new Error('PostUpdate Provider를 감싸주세요.');
    }
    return {
        contents,
        images: imageState.images,
    };
};

export default usePostUpdate;
