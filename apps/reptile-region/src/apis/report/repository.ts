import clientFetch, { METHOD } from '../@utils/fetcher';
import { objectToQueryString } from '../@utils/parser/query-string';

import type { CreateReport } from '@/types/apis/report';
import type { CreateBlockUser, DeleteBlockUser, FetchBlockUserList } from '@/types/apis/report/block-user';
import type { WithInfinitePageParam } from '@/types/apis/utils';

/** GET */
// 차단 사용자 리스트 조회
export const getBlockUserList = async ({ pageParam }: WithInfinitePageParam<FetchBlockUserList['Request']>) => {
    const queryString = objectToQueryString({ pageParam });
    const response = await clientFetch(`api/report/user-blocking/list?${queryString}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
// 신고하기
export const createReport = async ({ details, reported, type, typeId }: CreateReport['Request']) => {
    const response = await clientFetch('api/report/share-contents', {
        method: METHOD.POST,
        body: {
            details,
            reported,
            type,
            typeId,
        },
    });

    return response.json();
};

// 차단 사용자 생성
export const createBlockUser = async ({ nickname }: CreateBlockUser['Request']) => {
    const response = await clientFetch(`api/report/users/${nickname}/blocking`, {
        method: METHOD.POST,
    });

    return response.json();
};

/** DELETE */
// 차단 사용자 삭제
export const deleteBlockUser = async ({ blockingId }: DeleteBlockUser['Request']) => {
    const response = await clientFetch(`api/report/user-blocking/${blockingId}`, {
        method: METHOD.DELETE,
    });

    return response.json();
};
