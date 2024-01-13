import { useContext } from 'react';

import { HeartAnimationStateContext } from '../contexts/HeartAnimation';

const useHeartAnimation = () => {
    const state = useContext(HeartAnimationStateContext);

    if (state === null) {
        throw new Error('HeartAnimationStateContext Provider를 감싸주세요.');
    }

    return state;
};

export default useHeartAnimation;
