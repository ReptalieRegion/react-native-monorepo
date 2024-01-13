import { useIsMounted } from '@crawl/react-hooks';
import React, { useContext, useEffect, useMemo, useRef, type PropsWithChildren } from 'react';

import { ErrorBoundaryGroupContext } from '../contexts/ErrorBoundaryGroupContext';
import { useKey } from '../hooks';

type ErrorBoundaryGroupProps = {
    blockOutside: boolean;
};

export default function ErrorBoundaryGroup({ blockOutside = false, children }: PropsWithChildren<ErrorBoundaryGroupProps>) {
    const blockOutsideRef = useRef(blockOutside);
    const isMounted = useIsMounted();
    const group = useContext(ErrorBoundaryGroupContext);
    const [resetKey, reset] = useKey();

    useEffect(() => {
        if (isMounted && !blockOutsideRef.current) {
            reset();
        }
    }, [group?.resetKey, isMounted, reset]);

    const value = useMemo(() => ({ resetKey, reset }), [resetKey, reset]);

    return <ErrorBoundaryGroupContext.Provider value={value}>{children}</ErrorBoundaryGroupContext.Provider>;
}
