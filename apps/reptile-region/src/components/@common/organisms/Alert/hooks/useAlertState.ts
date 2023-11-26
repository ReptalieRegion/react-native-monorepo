import { useContext } from 'react';

import { AlertStateContext } from '../contexts/AlertContext';

const useAlertState = () => {
    const state = useContext(AlertStateContext);

    if (state === null) {
        throw new Error('Alert Provider를 감싸주세요.');
    }

    return state;
};

export default useAlertState;
