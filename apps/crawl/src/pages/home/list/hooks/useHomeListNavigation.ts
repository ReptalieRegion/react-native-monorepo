import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import type { EntityDetailParams } from '@/types/routes/params/diary';
import type { DetailPostParams } from '@/types/routes/params/sharePost';
import type { HomeListPageNavigationProp } from '@/types/routes/props/home/list';

export default function useHomeListNavigation() {
    const { requireAuthNavigation } = useAuthNavigation();
    const navigation = useNavigation<HomeListPageNavigationProp>();

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

    const navigationGoogleFormWebview = useCallback(() => {
        navigation.navigate('webview', {
            source: { uri: 'https://forms.gle/jA8Kv7tQVBh6JMbx6' },
        });
    }, [navigation]);

    return useMemo(
        () => ({
            navigateSharePost,
            navigateDiary,
            navigateEntityDetail,
            navigationPostDetail,
            navigationEntityCreate,
            navigationGoogleFormWebview,
        }),
        [
            navigateDiary,
            navigateEntityDetail,
            navigateSharePost,
            navigationEntityCreate,
            navigationGoogleFormWebview,
            navigationPostDetail,
        ],
    );
}
