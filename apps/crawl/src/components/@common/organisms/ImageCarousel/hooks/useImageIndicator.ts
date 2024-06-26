import { useContext } from 'react';

import { ImagesIndicatorStateContext } from '../contexts/ImageIndicator';

export default function useImageIndicator() {
    const state = useContext(ImagesIndicatorStateContext);

    if (state === null) {
        throw new Error('ImageCarousel Provider를 감싸주세요');
    }

    return state;
}
