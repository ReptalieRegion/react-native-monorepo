import { useQueryClient } from '@tanstack/react-query';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseDeleteEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useBaseDeleteEntityWeight';

type UseDeleteEntityWeightProps = {
    entityId: string;
};

export default function useDeleteEntityWeight({ entityId }: UseDeleteEntityWeightProps) {
    const queryClient = useQueryClient();

    return useBaseDeleteEntityWeight({
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.weight(entityId), exact: true });
        },
    });
}
