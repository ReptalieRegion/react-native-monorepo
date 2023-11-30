import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number = 500, callback?: () => void): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            callback?.();
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay, callback]);

    return debouncedValue;
};

export default useDebounce;
