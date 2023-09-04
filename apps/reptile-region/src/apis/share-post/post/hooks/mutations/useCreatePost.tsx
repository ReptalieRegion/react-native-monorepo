import { useNavigation } from '@react-navigation/native';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { BottomTabStackNavigationProp } from '<RootRoutes>';
import type { CreatePostRequest, SharePostListData, SharePostListInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useCreatePost = () => {
    const navigate = useNavigation<BottomTabStackNavigationProp>();
    const queryClient = useQueryClient();

    return useMutation<SharePostListData, any, CreatePostRequest>({
        mutationFn: ({ contents, files }) => createPost({ contents, files }),
        onSuccess: (data) => {
            const listData = queryClient.getQueryData<InfiniteData<SharePostListInfiniteData>>(postQueryKeys.list);
            if (listData && listData.pages.length !== 0) {
                const sliceData = listData.pages.slice(1);
                const updatePages = [{ ...listData.pages[0], items: [data, ...listData.pages[0].items] }, ...sliceData];

                queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(postQueryKeys.list, {
                    pageParams: listData.pageParams,
                    pages: updatePages,
                });
            }
            navigate.navigate('bottom-tab', { screen: 'bottom-tab/share-post/routes', params: { screen: 'share-post/list' } });
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export default useCreatePost;
