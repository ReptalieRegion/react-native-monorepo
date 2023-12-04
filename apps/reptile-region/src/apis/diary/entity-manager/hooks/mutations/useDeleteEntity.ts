import { useMutation } from '@tanstack/react-query';

import { deleteEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteEntity } from '@/types/apis/diary/entity';

interface UseDeleteEntityActions {
    onSuccess?(): void;
}

type UseDeleteEntityProps = UseDeleteEntityActions;

// 다이어리 개체삭제
export default function useDeleteEntity(props?: UseDeleteEntityProps) {
    return useMutation<DeleteEntity['Response'], HTTPError, DeleteEntity['Request']>({
        mutationFn: ({ diaryId }) => deleteEntity({ diaryId }),
        onSuccess: props?.onSuccess,
    });
}
