import { useQueryClient } from '@tanstack/react-query';

const useAuthCacheInvalidateQueries = () => {
    const queryClient = useQueryClient();

    const invalidateAuthQueries = async () => {
        queryClient.invalidateQueries();
    };

    return {
        invalidateAuthQueries,
    };
};

export default useAuthCacheInvalidateQueries;
