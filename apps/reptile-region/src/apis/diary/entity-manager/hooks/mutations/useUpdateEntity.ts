import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateEntity } from '@/types/apis/diary/entity';

export default function useUpdateEntity() {
    const queryClient = useQueryClient();
    return useMutation<UpdateEntity['Response'], HTTPError, UpdateEntity['Request']>({
        mutationFn: updateEntity,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list, exact: true });
        },
    });
}
