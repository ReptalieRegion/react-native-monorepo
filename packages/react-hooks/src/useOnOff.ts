import { useCallback, useState } from 'react';

export function useOnOff(defaultValue?: boolean) {
    const [state, setOn] = useState(defaultValue ?? false);
    const on = useCallback(() => setOn(true), []);
    const off = useCallback(() => setOn(false), []);

    return { state, on, off };
}
