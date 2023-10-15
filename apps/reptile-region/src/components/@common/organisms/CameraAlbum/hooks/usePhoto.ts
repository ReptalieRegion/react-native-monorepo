import { useContext } from 'react';

import { PhotoStateContext } from '../contexts/PhotoContext';

const usePhoto = () => {
    const state = useContext(PhotoStateContext);

    if (state === null) {
        throw new Error('CameraAlbum Provider를 감싸주세요.');
    }

    return state;
};

export default usePhoto;
