import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../../repository';

import type { DeletePostRequest, SharePostImagesInfiniteData, SharePostListInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

type SetQueryDataProps = {
    queryClient: QueryClient;
    postId: string;
    userId: string;
};

const deletePostDetailImage = ({ queryClient, postId }: SetQueryDataProps) => {
    queryClient.setQueryData<InfiniteData<SharePostImagesInfiniteData>>(
        postQueryKeys.detailImage(postId),
        (prevDetailImages) => {
            if (prevDetailImages === undefined) {
                return prevDetailImages;
            }

            const updatePages = [...prevDetailImages.pages].map((page) => {
                const items = page.items.filter((item) => item.post.id !== postId);

                return { ...page, items };
            });

            return {
                ...prevDetailImages,
                pages: updatePages,
            };
        },
    );
};

const deletePostListCache = ({ queryClient, postId }: { queryClient: QueryClient; postId: string }) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(postQueryKeys.list, (prevPostList) => {
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

const useDeletePost = ({ postId, userId }: DeletePostRequest & { userId: string }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deletePost({ postId }),
        onSuccess: () => {
            deletePostListCache({ queryClient, postId });
            deletePostDetailImage({ queryClient, userId, postId });
        },
    });
};

export default useDeletePost;
