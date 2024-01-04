import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreatePost from '@/apis/share-post/post/hooks/mutations/useBaseCreatePost';
import type { WritePostNavigationProp } from '@/types/routes/props/share-post/create-post';

export default function useCreatePost() {
    const navigation = useNavigation<WritePostNavigationProp>();
    const queryClient = useQueryClient();

    return useBaseCreatePost({
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: SHARE_POST_QUERY_KEYS.list,
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname),
                exact: true,
            });
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
    });
}
