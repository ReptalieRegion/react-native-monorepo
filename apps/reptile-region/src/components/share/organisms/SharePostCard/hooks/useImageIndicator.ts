import { useContext } from 'react';

import { ImagesIndicatorStateContext } from '../contexts/ImagesIndicators';

const useImageIndicator = () => {
    const state = useContext(ImagesIndicatorStateContext);

    if (state === null) {
        throw new Error('ImageIndicator Provider를 감싸주세요');
    }

    return state;
};

export default useImageIndicator;
