import { useContext, useMemo } from 'react';

import { ErrorBoundaryGroupContext } from '../contexts/ErrorBoundaryGroupContext';

const useErrorBoundaryGroup = () => {
    const group = useContext(ErrorBoundaryGroupContext);

    if (group === null) {
        throw new Error('ErrorBoundaryGroup Provider를 감싸주세요.');
    }

    return useMemo(() => ({ reset: group.reset }), [group.reset]);
};

export default useErrorBoundaryGroup;
