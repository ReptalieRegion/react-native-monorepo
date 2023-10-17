import { useContext } from 'react';

import { ToastStateContext } from '../contexts/ToastContext';

const useToastState = () => {
    const state = useContext(ToastStateContext);

    if (state === null) {
        throw new Error('Toast Provider를 감싸주세요.');
    }

    return state;
};

export default useToastState;
