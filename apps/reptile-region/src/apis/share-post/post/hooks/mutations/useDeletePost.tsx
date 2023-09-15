import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../../repository';

import { DeletePostResponse, type DeletePostRequest, type SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const deletePostListCache = ({ queryClient, postId }: { queryClient: QueryClient; postId: string }) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const updatePages = [...prevPostList.pages].map((page) => {
            const items = page.items.filter((item) => item.post.id !== postId);

            return { ...page, items };
        });

        return {
            ...prevPostList,
            pages: updatePages,
        };
    });
};

const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<DeletePostResponse, any, DeletePostRequest>({
        mutationFn: ({ postId }) => deletePost({ postId }),
        onSuccess: ({ post }) => {
            deletePostListCache({ queryClient, postId: post.id });
        },
    });
};

export default useDeletePost;
