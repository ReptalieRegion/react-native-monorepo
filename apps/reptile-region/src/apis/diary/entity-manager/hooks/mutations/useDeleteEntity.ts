import { useMutation } from '@tanstack/react-query';

import { deleteEntity } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteEntity } from '@/types/apis/diary/entity';

// 다이어리 개체삭제
export default function useDeleteEntity() {
    return useMutation<DeleteEntity['Response'], HTTPError, DeleteEntity['Request']>({
        mutationFn: ({ diaryId }) => deleteEntity({ diaryId }),
    });
}
