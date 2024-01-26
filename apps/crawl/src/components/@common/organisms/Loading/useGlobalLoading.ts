import { useContext } from 'react';

import { LoadingContext } from './LoadingProvider';

const useGlobalLoading = () => {
    const actions = useContext(LoadingContext);

    if (actions === null) {
        throw new Error('Loading Provider를 감싸주세요.');
    }

    return actions;
};

export default useGlobalLoading;
