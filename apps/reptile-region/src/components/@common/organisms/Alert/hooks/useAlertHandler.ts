import { useCallback, useContext } from 'react';

import { AlertActionsContext } from '../contexts/AlertContext';

const useAlertHandler = () => {
    const dispatch = useContext(AlertActionsContext);

    if (dispatch === null) {
        throw new Error('Alert Provider를 감싸주세요.');
    }

    const closeAlert = useCallback(() => {
        dispatch({ type: 'CLOSE_ALERT' });
    }, [dispatch]);

    return {
        closeAlert,
    };
};

export default useAlertHandler;
