import { useContext } from 'react';

import { PhotoSelectStateContext } from '../contexts/PhotoSelectContext';

export default function usePhotoSelect() {
    const state = useContext(PhotoSelectStateContext);

    if (state === null) {
        throw new Error('PhotoSelect Provider를 감싸주세요');
    }

    return state;
}
