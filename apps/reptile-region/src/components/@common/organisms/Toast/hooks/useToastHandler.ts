import { useCallback, useContext } from 'react';

import { ToastActionsContext } from '../contexts/ToastContext';

const useToastHandler = () => {
    const dispatch = useContext(ToastActionsContext);

    if (dispatch === null) {
        throw new Error('Toast Provider를 감싸주세요.');
    }

    const closeToast = useCallback(() => {
        dispatch({ type: 'CLOSE_TOAST' });
    }, [dispatch]);

    return {
        closeToast,
    };
};

export default useToastHandler;
