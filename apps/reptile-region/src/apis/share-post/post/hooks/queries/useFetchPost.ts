import { useSuspenseQuery } from '@tanstack/react-query';

import { getPost } from '../../repository';

import type { FetchPost } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

export default function useFetchPost({ postId }: FetchPost['Request']) {
    return useSuspenseQuery<FetchPost['Response'], HTTPError, FetchPost['Response'], readonly string[]>({
        queryKey: SHARE_POST_QUERY_KEYS.post(postId),
        queryFn: () => getPost({ postId }),
    });
}
