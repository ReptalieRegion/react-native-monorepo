import { useRef } from 'react';

const useLock = () => {
    const lock = useRef(false);

    const lockStart = () => {
        lock.current = true;
    };

    const lockEnd = () => {
        console.log('lock end');
        lock.current = false;
    };

    const isLock = () => {
        return lock.current;
    };

    return { lockStart, lockEnd, isLock };
};

export default useLock;
