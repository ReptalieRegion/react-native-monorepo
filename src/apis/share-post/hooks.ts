import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetailPosts, getPosts, updateFollow } from './apis';
import { DetailPostsData, SharePostsData } from '<SharePostAPI>';

export const useFetchPosts = () => {
    return useQuery<SharePostsData[]>({ queryKey: ['fetchPosts'], queryFn: getPosts, staleTime: Infinity });
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
    return useQuery<DetailPostsData>({ queryKey: ['fetchDetailPosts'], queryFn: () => getDetailPosts(userId) });
};