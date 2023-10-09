import { useContext } from 'react';

import { ImageCarouselStateContext } from '../contexts/ImageCarousel';

const useImageCarousel = () => {
    const state = useContext(ImageCarouselStateContext);

    if (state === null) {
        throw new Error('ImageCarouselStateContext Provider를 감싸주세요.');
    }

    return state;
};

export default useImageCarousel;
