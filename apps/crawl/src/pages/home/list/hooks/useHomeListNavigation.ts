import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { EntityDetailParams } from '@/types/routes/params/diary';
import type { DetailPostParams } from '@/types/routes/params/sharePost';
import type { HomeListPageNavigationProp } from '@/types/routes/props/home/list';

export default function useHomeListNavigation() {
    const { requireAuthNavigation } = useAuthNavigation();
    const navigation = useNavigation<HomeListPageNavigationProp>();

    const navigatePlayground = useCallback(() => {
        navigation.navigate('playground');
    }, [navigation]);

    const navigatePlaygroundFlashList = useCallback(() => {
        navigation.navigate('playground-flash-list');
    }, [navigation]);

    const navigateSharePost = useCallback(() => {
        navigation.navigate('bottom-tab/routes', {
            screen: 'tab',
            params: {
                screen: 'share-post/routes',
                params: {
                    screen: 'bottom-tab/list',
                },
            },
        });
    }, [navigation]);

    const navigateDiary = useCallback(() => {
        requireAuthNavigation(() =>
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'diary/routes',
                    params: {
                        screen: 'entity-manager',
                        params: {
                            screen: 'entity-manager/list',
                        },
                    },
                },
            }),
        );
    }, [navigation, requireAuthNavigation]);

    const navigateEntityDetail = useCallback(
        (params: EntityDetailParams) => {
            navigation.navigate('entity-manager/detail', params);
        },
        [navigation],
    );

    const navigationPostDetail = useCallback(
        (params: DetailPostParams) => {
            navigation.navigate('share-post/modal', {
                screen: 'modal/post/detail',
                params,
            });
        },
        [navigation],
    );

    const navigationEntityCreate = useCallback(() => {
        navigation.navigate('entity-manager/create', {
            screen: 'image',
        });
    }, [navigation]);

    return useMemo(
        () => ({
            navigateSharePost,
            navigateDiary,
            navigateEntityDetail,
            navigationPostDetail,
            navigationEntityCreate,
            navigatePlayground,
            navigatePlaygroundFlashList,
        }),
        [
            navigateDiary,
            navigateEntityDetail,
            navigateSharePost,
            navigationEntityCreate,
            navigationPostDetail,
            navigatePlayground,
            navigatePlaygroundFlashList,
        ],
    );
}
