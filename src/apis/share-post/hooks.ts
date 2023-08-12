import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCommentPost, getDetailPosts, getPosts, getReplyComment, updateFollow } from './apis';

import { SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyInfinityData } from '<SharePostCommentReply>';
import { SharePostDetailPostsData } from '<SharePostDetail>';
import { SharePostListInfiniteData } from '<SharePostListAPI>';

export const useInfiniteFetchPosts = () => {
    return useInfiniteQuery<SharePostListInfiniteData>({
        queryKey: ['fetchPosts'],
        queryFn: getPosts,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export const useUpdateFollow = () => {
    const queryClient = useQueryClient();
    return useMutation(updateFollow, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPosts']);
        },
    });
};

export const useFetchDetailPosts = (userId: string) => {
    return useQuery<SharePostDetailPostsData>({
        queryKey: ['fetchDetailPosts' + userId],
        queryFn: () => getDetailPosts(userId),
    });
};

export const useInfiniteFetchCommentsPost = (postId: string) => {
    return useInfiniteQuery<SharePostCommentInfiniteData>({
        queryKey: ['fetchCommentsPost' + postId],
        queryFn: ({ pageParam }) => getCommentPost({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export const useInfiniteFetchReplyComments = ({
    postId,
    commentId,
    enabled,
}: {
    postId: string;
    commentId: string;
    enabled: boolean;
}) => {
    return useInfiniteQuery<SharePostCommentReplyInfinityData>({
        queryKey: ['fetchReplyComments' + commentId],
        queryFn: ({ pageParam }) => getReplyComment({ postId, commentId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled,
    });
};
