import { useEffect, useState } from 'react';

export const useDebounceValue = <T>(value: T, delay: number = 500, callback?: () => void): T => {
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
