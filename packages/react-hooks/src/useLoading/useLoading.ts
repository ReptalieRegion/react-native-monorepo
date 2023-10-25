import { useState } from 'react';

const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
    };

    const endLoading = () => {
        setLoading(false);
    };

    return { loading, startLoading, endLoading };
};

export default useLoading;
