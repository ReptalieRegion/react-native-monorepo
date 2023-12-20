import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS, SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateFollow from '@/apis/share-post/user/hooks/mutations/useBaseCreateFollow';
import type { FetchLike, FetchPosts, FetchPostsResponse } from '@/types/apis/share-post/post';
import type { CreateFollowRequest, CreateFollowResponse, FetchFollowerList } from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevPostList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined;
};

export default function useCreateFollow() {
    const queryClient = useQueryClient();

    return useBaseCreateFollow<Context>({
        onMutate: async (variables: CreateFollowRequest) => {
            const queryKey = SHARE_POST_QUERY_KEYS.list;
            await queryClient.cancelQueries({ queryKey });
            const prevPostList = queryClient.getQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey);
            queryClient.setQueryData<InfiniteData<FetchPosts['Response'], number>>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { pageParams, pages } = prevData;

                const updatePages = [...pages].map((page) => {
                    const { items, nextPage } = page;
                    return {
                        nextPage,
                        items: items.map((item) => {
                            const isTargetPost = item.post.user.id === variables.userId;
                            return isTargetPost
                                ? { post: { ...item.post, user: { ...item.post.user, isFollow: true } } }
                                : item;
                        }),
                    };
                });

                return {
                    pageParams,
                    pages: updatePages,
                };
            });

            return { prevPostList };
        },
        onError: useCallback(
            (_error: HTTPError, _variables: CreateFollowRequest, context: Context | undefined) => {
                if (context?.prevPostList) {
                    queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
                        SHARE_POST_QUERY_KEYS.list,
                        context.prevPostList,
                    );
                }
            },
            [queryClient],
        ),
        onSettled: useCallback(
            (data: CreateFollowResponse | undefined) => {
                if (data) {
                    // 일상 공유 리스트, 특정 유저 일상 공유 리스트, 사용자 프로필 무효화
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.profileDetail(data.user.nickname),
                        exact: true,
                    });
                    queryClient.invalidateQueries({ queryKey: MY_QUERY_KEYS.profile });

                    // 팔로우, 팔로잉, 좋아요 리스트에서 팔로우 당한 유저 아이디 있는 키값 추출
                    const userIdSet = new Set();
                    queryClient.getQueryCache().findAll({
                        queryKey: SHARE_POST_QUERY_KEYS.profileList,
                        predicate: (query) => {
                            const isFollowOrLikeKey =
                                query.queryKey.length > 3 &&
                                (query.queryKey[3] === 'follower' ||
                                    query.queryKey[3] === 'following' ||
                                    query.queryKey[3] === 'like');
                            if (isFollowOrLikeKey) {
                                const findUSer = !!queryClient
                                    .getQueryData<InfiniteData<FetchFollowerList['Response'] | FetchLike['Response']>>(
                                        query.queryKey,
                                    )
                                    ?.pages.find((page) =>
                                        page.items.find((item) => item.user.nickname === data.user.nickname),
                                    );
                                if (findUSer) {
                                    userIdSet.add(query.queryKey[4]);
                                    return true;
                                }
                                return false;
                            }
                            return false;
                        },
                    });

                    // 팔로우, 팔로잉, 좋아요 리스트 무효화
                    userIdSet.forEach((userId) => {
                        queryClient.invalidateQueries({ queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'follower', userId] });
                        queryClient.invalidateQueries({
                            queryKey: [...SHARE_POST_QUERY_KEYS.profileList, 'following', userId],
                        });
                    });
                }
            },
            [queryClient],
        ),
    });
}
