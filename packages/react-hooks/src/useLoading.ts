import { useState } from 'react';

export function useLoading() {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
    };

    const endLoading = () => {
        setLoading(false);
    };

    return { loading, startLoading, endLoading };
}
