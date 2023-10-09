import { useContext } from 'react';

import { HeartAnimationActionsContext } from '../contexts/HeartAnimation';
import { ImageIndicatorActionsContext } from '../contexts/ImagesIndicators';

const usePostCardHandler = () => {
    const heartAnimationDispatch = useContext(HeartAnimationActionsContext);
    const imagesIndicatorDispatch = useContext(ImageIndicatorActionsContext);

    if (heartAnimationDispatch === null || imagesIndicatorDispatch === null) {
        throw new Error('PostCard Provider를 감싸주세요.');
    }

    return { ...heartAnimationDispatch, ...imagesIndicatorDispatch };
};

export default usePostCardHandler;
