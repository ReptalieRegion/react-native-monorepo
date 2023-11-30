import { useCallback, useState } from 'react';

const useOnOff = () => {
    const [state, setOn] = useState(false);
    const on = useCallback(() => setOn(true), []);
    const off = useCallback(() => setOn(false), []);

    return { state, on, off };
};

export default useOnOff;
