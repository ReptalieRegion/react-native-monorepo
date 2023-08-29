import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '../../repository';

import type { GetCommentsRequest, SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { commentQueryKeys } from '@/apis/share-post/query-keys';

const useInfiniteComment = ({ postId }: GetCommentsRequest) => {
    return useInfiniteQuery<SharePostCommentInfiniteData>({
        queryKey: commentQueryKeys.comment(postId),
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteComment;
