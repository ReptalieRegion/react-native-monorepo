import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>(() => {});
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id: number;
        if (delay !== null && !isPaused) {
            id = setInterval(tick, delay);
        }

        return () => clearInterval(id);
    }, [delay, isPaused]);

    const pause = useCallback(() => {
        setIsPaused(true);
    }, []);

    const resume = useCallback(() => {
        setIsPaused(false);
    }, []);

    return useMemo(
        () => ({
            pause,
            resume,
        }),
        [pause, resume],
    );
}
