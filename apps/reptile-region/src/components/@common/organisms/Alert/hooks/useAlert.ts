import { useCallback, useContext } from 'react';

import { AlertActionsContext } from '../contexts/AlertContext';
import type { OpenAlert } from '../types';

const useAlert = () => {
    const dispatch = useContext(AlertActionsContext);

    if (dispatch === null) {
        throw new Error('Alert Provider를 감싸주세요.');
    }

    const openAlert = useCallback(
        ({ contents, title, buttons }: Omit<OpenAlert, 'type'>) => {
            dispatch({ type: 'OPEN_ALERT', contents, title, buttons });
        },
        [dispatch],
    );

    return { openAlert };
};

export default useAlert;
