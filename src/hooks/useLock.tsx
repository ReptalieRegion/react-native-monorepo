import { useCallback, useRef } from 'react';

const useLock = () => {
    const lock = useRef(false);

    const lockStart = useCallback(() => {
        lock.current = true;
    }, []);

    const lockEnd = useCallback(() => {
        lock.current = false;
    }, []);

    const isLock = useCallback(() => {
        return lock.current;
    }, []);

    return { lockStart, lockEnd, isLock };
};

export default useLock;
