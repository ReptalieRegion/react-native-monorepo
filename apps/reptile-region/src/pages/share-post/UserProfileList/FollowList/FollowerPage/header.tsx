import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchFollowerList } from '@/types/apis/share-post/user';
import type { FollowerPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowerChangeHeader({
    navigation,
    route: {
        params: {
            user: { id: userId, followerCount },
        },
    },
}: FollowerPageScreenProps) {
    const queryClient = useQueryClient();
    const followingList = queryClient.getQueryData<InfiniteData<FetchFollowerList['Response']>>(
        SHARE_POST_QUERY_KEYS.followerList(userId),
    );
    const newFollowerCount = followingList?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? followerCount;

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: `${newFollowerCount} 팔로워`,
        });
    }, [newFollowerCount, navigation]);

    return null;
}
