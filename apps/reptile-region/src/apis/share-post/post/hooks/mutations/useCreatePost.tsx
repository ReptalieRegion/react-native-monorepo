import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { RootStackParamList } from '<RootRoutes>';
import type { CreatePostRequest, SharePostListData, SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useCreatePost = () => {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>>();
    const queryClient = useQueryClient();

    return useMutation<SharePostListData, any, CreatePostRequest>({
        mutationFn: ({ contents, files }) => createPost({ contents, files }),
        onSuccess: (data) => {
            queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (oldData) => {
                if (oldData === undefined) {
                    return oldData;
                }

                const updatePages = [...oldData.pages];
                updatePages[0] = {
                    ...updatePages[0],
                    items: [data, ...updatePages[0].items],
                };

                return {
                    ...oldData,
                    pages: updatePages,
                };
            });

            navigate.navigate('bottom-tab', {
                screen: 'bottom-tab/routes',
                params: {
                    screen: 'share-post/routes',
                    params: {
                        screen: 'share-post/list',
                    },
                },
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export default useCreatePost;
