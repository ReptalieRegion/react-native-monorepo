import { useQueryClient } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '../query-keys';

const useAuthCacheInvalidateQueries = () => {
    const queryClient = useQueryClient();

    const invalidateAuthQueries = async () => {
        const cache = queryClient.getQueryCache().getAll();
        cache.map(({ queryKey }) => {
            if (queryKey === SHARE_POST_QUERY_KEYS.list) {
                queryClient.invalidateQueries({ queryKey, exact: false });
            } else if (queryKey.length > 2 && queryKey[0] === 'user' && queryKey[1] === 'profile') {
                queryClient.invalidateQueries({ queryKey });
            } else {
                queryClient.removeQueries({ queryKey });
            }
        });
    };

    return {
        invalidateAuthQueries,
    };
};

export default useAuthCacheInvalidateQueries;
