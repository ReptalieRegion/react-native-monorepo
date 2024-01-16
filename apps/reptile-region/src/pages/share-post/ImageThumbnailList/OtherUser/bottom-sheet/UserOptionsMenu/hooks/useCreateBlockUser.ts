import { useNavigation } from '@react-navigation/native';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateBlockUser from '@/apis/report/mutations/useBaseCreateBlockUser';
import useToast from '@/components/overlay/Toast/useToast';
import type { CreateBlockUserRequest, CreateBlockUserResponse } from '@/types/apis/report/block-user';
import type { FetchPostsResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';
import type { SharePostListNavigationProp } from '@/types/routes/props/share-post/post-list';

type Context = {
    prevList: InfiniteData<InfiniteState<FetchPostsResponse[]>, number> | undefined;
};

export default function useCreateBlockUser() {
    const queryClient = useQueryClient();
    const navigation = useNavigation<SharePostListNavigationProp>();
    const openToast = useToast();

    return useBaseCreateBlockUser<Context>({
        onMutate: useCallback(
            async (variables: CreateBlockUserRequest) => {
                const queryKey = SHARE_POST_QUERY_KEYS.list;
                await queryClient.cancelQueries({ queryKey });

                const prevList = queryClient.getQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
                    SHARE_POST_QUERY_KEYS.list,
                );

                queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostsResponse[]>, number>>(
                    queryKey,
                    (prevPostList) => {
                        if (prevPostList === undefined) {
                            return prevPostList;
                        }

                        const { pageParams, pages } = prevPostList;
                        const updatePages = [...pages].map((page) => {
                            const { items, nextPage } = page;

                            return {
                                nextPage,
                                items: items.filter((item) => item.post.user.nickname !== variables.nickname),
                            };
                        });

                        return {
                            pageParams,
                            pages: updatePages,
                        };
                    },
                );

                return { prevList };
            },
            [queryClient],
        ),
        onSuccess: useCallback(
            (_data: CreateBlockUserResponse, variables: CreateBlockUserRequest) => {
                openToast({ contents: '차단에 성공했어요', severity: 'info' });
                navigation.popToTop();

                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                queryClient.removeQueries({ queryKey: SHARE_POST_QUERY_KEYS.profileDetail(variables.nickname), exact: true });
                queryClient.removeQueries({ queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(variables.nickname), exact: true });

                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.defaultComment });
                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.defaultCommentReply });
            },
            [openToast, navigation, queryClient],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateBlockUserRequest, context: Context | undefined) => {
                openToast({ contents: '차단에 실패했어요. 잠시 후 다시 시도해주세요.', severity: 'error' });
                if (context?.prevList) {
                    queryClient.setQueryData(SHARE_POST_QUERY_KEYS.list, context.prevList);
                }
            },
            [openToast, queryClient],
        ),
    });
}
