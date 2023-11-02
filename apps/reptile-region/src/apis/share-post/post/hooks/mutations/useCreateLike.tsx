import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type { CreateLike, FetchDetailUserPost, FetchPost } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

/** 일상공유 무한스크롤 조회 리스트 좋아요 생성 */
const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreateLike['Response'] }) => {
    const queryKey = sharePostQueryKeys.list;

    queryClient.setQueryData<InfiniteData<FetchPost['Response']>>(queryKey, (prevPostList) => {
        if (prevPostList === undefined) {
            return prevPostList;
        }

        const { pages, pageParams } = prevPostList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, isLike: true, likeCount: item.post.likeCount + 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

/** 특정 유저의 게시글 리스트 무한 스크롤 좋아요 생성 */
const updateSharePostUserDetailCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreateLike['Response'] }) => {
    const queryKey = sharePostQueryKeys.detailUserPosts(data.post.user.nickname);

    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevPostDetailList) => {
        if (prevPostDetailList === undefined) {
            return prevPostDetailList;
        }

        const { pageParams, pages } = prevPostDetailList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: [...items].map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, isLike: true, likeCount: item.post.likeCount + 1 } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

const useCreateLike = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateLike['Response'], any, CreateLike['Request']>({
        mutationFn: ({ postId }) => createLike({ postId }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
            updateSharePostUserDetailCache({ queryClient, data });
        },
    });
};

export default useCreateLike;
