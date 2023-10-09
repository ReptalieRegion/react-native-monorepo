import { useContext } from 'react';

import { ImageCarouselRefContext } from '../contexts/ImageIndicator';

const useImageCarouselRef = () => {
    const state = useContext(ImageCarouselRefContext);

    if (state === null) {
        throw new Error('ImageCarousel Provider를 감싸주세요.');
    }

    return state;
};

export default useImageCarouselRef;
