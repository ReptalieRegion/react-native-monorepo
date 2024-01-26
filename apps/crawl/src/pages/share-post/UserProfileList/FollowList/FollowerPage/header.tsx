import { useEffect } from 'react';

import useInfiniteFollowerList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowerList';
import type { FollowerPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowerChangeHeader({
    navigation,
    route: {
        params: {
            user: { id: userId, followerCount },
        },
    },
}: FollowerPageScreenProps) {
    const { data } = useInfiniteFollowerList({ userId });
    const newFollowerCount = data?.length ?? followerCount;

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: `${newFollowerCount} 팔로워`,
        });
    }, [newFollowerCount, navigation]);

    return null;
}
