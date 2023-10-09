import { useContext } from 'react';

import { FloatingActionButtonActionsContext } from '../contexts/FloatingActionButtons';

const useFloatingHandler = () => {
    const dispatch = useContext(FloatingActionButtonActionsContext);

    if (dispatch === null) {
        throw new Error('FloatingActionButtonActions Provider를 감싸주세요');
    }

    const secondaryIconDownAnimation = () => {
        dispatch({ type: 'SECONDARY_DOWN_ANIMATION' });
    };

    const secondaryIconUpAnimation = () => {
        dispatch({ type: 'SECONDARY_UP_ANIMATION' });
    };

    return { secondaryIconDownAnimation, secondaryIconUpAnimation };
};

export default useFloatingHandler;
