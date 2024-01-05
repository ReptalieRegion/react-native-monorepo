import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import type { EntityDetailParams } from '@/types/routes/params/diary';
import type { HomeListPageNavigationProp } from '@/types/routes/props/home/list';

export default function useHomeListNavigation() {
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
        });
    }, [navigation]);

    const navigateEntityDetail = useCallback(
        (params: EntityDetailParams) => {
            navigation.navigate('entity-manager/detail', params);
        },
        [navigation],
    );

    const navigationPostDetail = useCallback(() => {
        navigation;
    }, [navigation]);

    return useMemo(
        () => ({
            navigateSharePost,
            navigateDiary,
            navigateEntityDetail,
            navigationPostDetail,
        }),
        [navigateDiary, navigateEntityDetail, navigateSharePost, navigationPostDetail],
    );
}
