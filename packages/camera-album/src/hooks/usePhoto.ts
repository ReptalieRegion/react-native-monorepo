import { useContext } from 'react';

import { PhotoStateContext } from '../contexts/PhotoContext';

export default function usePhoto() {
    const state = useContext(PhotoStateContext);

    if (state === null) {
        throw new Error('Photo Provider를 감싸주세요');
    }

    return state;
}
