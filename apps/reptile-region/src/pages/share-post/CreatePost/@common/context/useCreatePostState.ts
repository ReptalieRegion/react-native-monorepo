import { useContext } from 'react';

import { CreatePostStateContext } from './context';

export default function useCreatePostState() {
    const state = useContext(CreatePostStateContext);

    if (state === null) {
        throw new Error('CreatePost Provider를 감싸주세요');
    }

    return state;
}
