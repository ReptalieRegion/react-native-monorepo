import { useInfiniteQuery } from '@tanstack/react-query';

import { getLikes } from '../../repository';

import type { FetchLike } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteFetchLikes = ({ postId }: FetchLike['Request']) => {
    return useInfiniteQuery<FetchLike['Response']>({
        queryKey: sharePostQueryKeys.likeList(postId),
        queryFn: ({ pageParam }) => getLikes({ postId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        suspense: true,
    });
};

export default useInfiniteFetchLikes;
