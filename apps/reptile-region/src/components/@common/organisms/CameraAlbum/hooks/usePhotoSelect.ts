import { useContext } from 'react';

import { PhotoSelectStateContext } from '../contexts/PhotoSelectContext';

const usePhotoSelect = () => {
    const state = useContext(PhotoSelectStateContext);

    if (state === null) {
        throw new Error('CameraAlbum Provider를 감싸주세요.');
    }

    return state;
};

export default usePhotoSelect;
