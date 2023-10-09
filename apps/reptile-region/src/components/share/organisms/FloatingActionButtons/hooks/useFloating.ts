import { useContext } from 'react';

import { FloatingActionButtonStateContext } from '../contexts/FloatingActionButtons';

const useFloating = () => {
    const state = useContext(FloatingActionButtonStateContext);

    if (state === null) {
        throw new Error('FloatingActionButtonActions Provider를 감싸주세요');
    }

    return state;
};

export default useFloating;
