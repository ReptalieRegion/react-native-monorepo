import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '../../repository';

import type { GetCommentsRequest, SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteComment = ({ postId }: GetCommentsRequest) => {
    return useInfiniteQuery<SharePostCommentInfiniteData>({
        queryKey: sharePostQueryKeys.comment(postId),
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        suspense: true,
    });
};

export default useInfiniteComment;
