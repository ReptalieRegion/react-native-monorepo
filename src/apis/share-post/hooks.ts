import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCommentPost, getDetailPosts, getPosts, updateFollow } from './apis';

import { SharePostCommentData, SharePostDetailPostsData, SharePostListData } from '<SharePostAPI>';

export const useFetchPosts = () => {
    return useQuery<SharePostListData[]>({ queryKey: ['fetchPosts'], queryFn: getPosts, staleTime: Infinity });
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

export const useFetchCommentsPost = (postId: string) => {
    return useQuery<SharePostCommentData[]>({
        queryKey: ['fetchCommentsPost' + postId],
        queryFn: () => getCommentPost(postId),
    });
};

export const useFetchReplyComments = (commentId: string) => {
    return useQuery({ queryKey: ['fetchReplyComments' + commentId], queryFn: () => getCommentPost(commentId) });
};
