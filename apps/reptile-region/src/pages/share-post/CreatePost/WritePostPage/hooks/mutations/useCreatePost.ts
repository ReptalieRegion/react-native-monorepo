import { useNavigation } from '@react-navigation/native';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreatePost from '@/apis/share-post/post/hooks/mutations/useBaseCreatePost';
import type { FetchPostResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';
import type { WritePostNavigationProp } from '@/types/routes/props/share-post/create-post';

export default function useCreatePost() {
    const navigation = useNavigation<WritePostNavigationProp>();
    const queryClient = useQueryClient();

    return useBaseCreatePost({
        onMutate: () => {
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'bottom-tab/list',
                        params: {
                            isScrollToTop: true,
                        },
                    },
                },
            });
        },
        onSuccess: (data) => {
            queryClient.setQueryData<InfiniteData<InfiniteState<FetchPostResponse[]>, number>>(
                SHARE_POST_QUERY_KEYS.list,
                (prevPostList) => {
                    if (prevPostList === undefined) {
                        return prevPostList;
                    }

                    const { pageParams, pages } = prevPostList;

                    const updatePages = [...pages];
                    updatePages[0] = {
                        ...updatePages[0],
                        items: [data, ...updatePages[0].items],
                    };

                    return {
                        pageParams,
                        pages: updatePages,
                    };
                },
            );

            queryClient.invalidateQueries({
                queryKey: SHARE_POST_QUERY_KEYS.list,
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname),
                exact: true,
            });
        },
    });
}
