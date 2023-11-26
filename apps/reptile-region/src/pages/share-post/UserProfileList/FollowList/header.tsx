import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';

import type { FollowerPageScreenProps, FollowingPageScreenProps } from '../type';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { createNativeStackHeader } from '@/components/@common/molecules';
import type { FetchFollowerList, FetchFollowingList } from '@/types/apis/share-post/user';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

export function SharePostFollowHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as FollowRouterParams;
    return createNativeStackHeader({
        leftIcon: 'back',
        title: param.user.nickname,
        containerStyle: {
            borderBottomWidth: 0,
            borderBottomColor: undefined,
        },
    })(props);
}

export function FollowerChangeHeader({
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

export function FollowingChangeHeader({
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
