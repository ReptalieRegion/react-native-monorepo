import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteEntityWeight } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { DeleteEntityWeight } from '@/types/apis/diary/entity';

export default function useDeleteEntityWeight() {
    const queryClient = useQueryClient();
    return useMutation<DeleteEntityWeight['Response'], HTTPError, DeleteEntityWeight['Request']>({
        mutationFn: deleteEntityWeight,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list, exact: true });
        },
    });
}
