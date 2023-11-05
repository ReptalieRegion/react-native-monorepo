import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePost } from '../../repository';

import type { FetchDetailUserPost, FetchPost, UpdatePost } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

/** 일상공유 무한스크롤 조회 리스트 게시물 수정 */
const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdatePost['Response'] }) => {
    const queryKey = sharePostQueryKeys.list;

    queryClient.setQueryData<InfiniteData<FetchPost['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pageParams, pages } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost
                        ? { post: { ...item.post, images: data.post.images, contents: data.post.contents } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

/** 특정 유저의 게시글 리스트 무한 스크롤 게시물 수정 */
const updateSharePostDetailUserListCache = ({
    queryClient,
    data,
}: {
    queryClient: QueryClient;
    data: UpdatePost['Response'];
}) => {
    const queryKey = sharePostQueryKeys.detailUserPosts(data.post.user.nickname);

    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevDetailUserPostList) => {
        if (prevDetailUserPostList === undefined) {
            return prevDetailUserPostList;
        }

        const { pageParams, pages } = prevDetailUserPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost
                        ? { post: { ...item.post, images: data.post.images, contents: data.post.contents } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

interface UseUpdatePost {
    onSuccess(): void;
}

const useUpdatePost = ({ onSuccess }: UseUpdatePost) => {
    const queryClient = useQueryClient();
    return useMutation<UpdatePost['Response'], HTTPError, UpdatePost['Request']>({
        mutationFn: ({ postId, contents, remainingImages }) => updatePost({ postId, contents, remainingImages }),
        onSuccess: (data) => {
            onSuccess();
            updateSharePostListCache({ queryClient, data });
            updateSharePostDetailUserListCache({ queryClient, data });
        },
    });
};

export default useUpdatePost;
