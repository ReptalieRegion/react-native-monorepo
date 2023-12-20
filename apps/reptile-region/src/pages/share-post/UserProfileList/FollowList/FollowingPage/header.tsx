import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchFollowingList } from '@/types/apis/share-post/user';
import type { FollowingPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowingChangeHeader({
    navigation,
    route: {
        params: {
            user: { id: userId, followingCount },
        },
    },
}: FollowingPageScreenProps) {
    const queryClient = useQueryClient();
    const followingList = queryClient.getQueryData<InfiniteData<FetchFollowingList['Response']>>(
        SHARE_POST_QUERY_KEYS.followingList(userId),
    );
    const newFollowingCount = followingList?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? followingCount;

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: `${newFollowingCount} 팔로잉`,
        });
    }, [newFollowingCount, navigation]);

    return null;
}
