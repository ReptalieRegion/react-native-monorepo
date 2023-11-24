import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type { FetchDetailUserPost, FetchPosts, UpdateLike } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

/** 일상공유 무한스크롤 조회 리스트 좋아요 수정 */
const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdateLike['Response'] }) => {
    const queryKey = SHARE_POST_QUERY_KEYS.list;

    queryClient.setQueryData<InfiniteData<FetchPosts['Response']>>(queryKey, (prevPostList) => {
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
                    const { isLike, likeCount } = item.post;
                    return isTargetPost
                        ? { post: { ...item.post, isLike: !isLike, likeCount: isLike ? likeCount - 1 : likeCount + 1 } }
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

/** 특정 유저의 게시글 리스트 무한 스크롤 좋아요 수정  */
const updateSharePostUserDetailCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdateLike['Response'] }) => {
    const queryKey = SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname);
    queryClient.setQueryData<InfiniteData<FetchDetailUserPost['Response']>>(queryKey, (prevPostDetailData) => {
        if (prevPostDetailData === undefined) {
            return prevPostDetailData;
        }

        const { pageParams, pages } = prevPostDetailData;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetPost = item.post.id === data.post.id;
                    return isTargetPost ? { post: { ...item.post, isLike: true } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

const useUpdateLike = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateLike['Response'], HTTPError, UpdateLike['Request']>({
        mutationFn: ({ postId }) => updateLike({ postId }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
            updateSharePostUserDetailCache({ queryClient, data });
        },
    });
};

export default useUpdateLike;
