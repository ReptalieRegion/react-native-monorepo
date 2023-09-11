import { useContext } from 'react';

import { OverlayStateContext } from '../contexts/overlay-context';

const useOverlayState = () => {
    const state = useContext(OverlayStateContext);

    if (state === null) {
        throw new Error('Provider를 감싸주세요');
    }

    return state;
};

export default useOverlayState;
