import { useQueryClient } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '../query-keys';

const useAuthCacheInvalidateQueries = () => {
    const queryClient = useQueryClient();

    const invalidateAuthQueries = async () => {
        const cache = queryClient.getQueryCache().getAll();
        cache.map(({ queryKey }) => {
            if (queryKey.length > 1 && queryKey[0] === 'me' && queryKey[1] === 'profile') {
                return;
            }

            if (queryKey === SHARE_POST_QUERY_KEYS.list) {
                queryClient.invalidateQueries({ queryKey, exact: false });
            } else if (queryKey.length > 1 && queryKey[0] === 'user' && queryKey[1] === 'profile') {
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
