import { useContext } from 'react';

import { HeartAnimationActionsContext } from '../contexts/HeartAnimation';

const usePostCardHandler = () => {
    const heartAnimationDispatch = useContext(HeartAnimationActionsContext);

    if (heartAnimationDispatch === null) {
        throw new Error('PostCard Provider를 감싸주세요.');
    }

    return { ...heartAnimationDispatch };
};

export default usePostCardHandler;
