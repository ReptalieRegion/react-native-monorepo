import { useCallback, useState } from 'react';

export function useOnOff() {
    const [state, setOn] = useState(false);
    const on = useCallback(() => setOn(true), []);
    const off = useCallback(() => setOn(false), []);

    return { state, on, off };
}
