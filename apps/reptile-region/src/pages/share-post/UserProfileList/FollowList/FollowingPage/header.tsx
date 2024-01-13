import { useEffect } from 'react';

import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import type { FollowingPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowingChangeHeader({
    navigation,
    route: {
        params: {
            user: { id: userId, followingCount },
        },
    },
}: FollowingPageScreenProps) {
    const { data } = useInfiniteFollowingList({ userId });
    const newFollowingCount = data.length ?? followingCount;

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: `${newFollowingCount} 팔로잉`,
        });
    }, [newFollowingCount, navigation]);

    return null;
}
