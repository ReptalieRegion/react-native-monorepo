import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from './mutations/useCreateFollow';
import useCreateLike from './mutations/useCreateLike';
import useUpdateFollow from './mutations/useUpdateFollow';
import useUpdateLike from './mutations/useUpdateLike';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { FetchPostsResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

export default function useSharePostActions() {
    const { mutate: createLikeMutate } = useCreateLike();
    const { mutate: updateLikeMutate } = useUpdateLike();
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();
    const { requireAuthNavigation } = useAuthNavigation();
    const queryClient = useQueryClient();

    // 동기적으로 처리하기 위해 먼저 cache조회 후 팔처링
    const removePostList = useCallback(() => {
        const postList = queryClient.getQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
            SHARE_POST_QUERY_KEYS.list,
        );

        const newPostList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined = postList
            ? {
                  pages: postList.pages.slice(0, 1),
                  pageParams: postList.pageParams.slice(0, 1),
              }
            : postList;

        queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
            SHARE_POST_QUERY_KEYS.list,
            () => newPostList,
        );
    }, [queryClient]);

    const onlyLike = useCallback(
        (props: { isLike: boolean | undefined; postId: string }) =>
            requireAuthNavigation(() => {
                Haptic.trigger('impactLight');
                if (props.isLike === undefined) {
                    createLikeMutate({ postId: props.postId });
                } else if (!props.isLike) {
                    updateLikeMutate({ postId: props.postId });
                }
            }),
        [createLikeMutate, requireAuthNavigation, updateLikeMutate],
    );

    const updateOrCreateLike = useCallback(
        (props: { isLike: boolean | undefined; postId: string }) =>
            requireAuthNavigation(() => {
                Haptic.trigger('impactLight');
                if (props.isLike === undefined) {
                    createLikeMutate({ postId: props.postId });
                } else {
                    updateLikeMutate({ postId: props.postId });
                }
            }),
        [createLikeMutate, requireAuthNavigation, updateLikeMutate],
    );

    const updateOrCreateFollow = useCallback(
        ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) =>
            requireAuthNavigation(() => {
                if (isFollow === undefined) {
                    createFollowMutate({ userId });
                } else {
                    updateFollowMutate({ userId });
                }
                Haptic.trigger('impactLight');
            }),
        [createFollowMutate, requireAuthNavigation, updateFollowMutate],
    );

    return useMemo(
        () => ({
            removePostList,
            onlyLike,
            updateOrCreateLike,
            updateOrCreateFollow,
        }),
        [onlyLike, removePostList, updateOrCreateFollow, updateOrCreateLike],
    );
}
