import { useContext } from 'react';

import { ImageStateContext } from '../contexts/ImageContext';

const usePostUpdateImages = () => {
    const state = useContext(ImageStateContext);

    if (state === null) {
        throw new Error('PostUpdate Provider를 감싸주세요.');
    }

    return state;
};

export default usePostUpdateImages;
