import { useCallback, useContext } from 'react';

import { ToastActionsContext } from '../contexts/ToastContext';
import type { OpenToast } from '../types';

const useToast = () => {
    const dispatch = useContext(ToastActionsContext);

    if (dispatch === null) {
        throw new Error('Toast Provider를 감싸주세요.');
    }

    const openToast = useCallback(
        ({ contents, severity, title }: Omit<OpenToast, 'type'>) => {
            dispatch({ type: 'OPEN_TOAST', contents, severity, title });
        },
        [dispatch],
    );

    return { openToast };
};

export default useToast;
