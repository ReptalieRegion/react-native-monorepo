import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserActivitySummaryItem, {
    ActivitySummaryItemActions,
    ActivitySummaryItemProps,
} from '../../molecules/UserActivitySummaryItem';

import type { FetchDetailUserPost } from '<api/share/post>';
import type { ImageType } from '<image>';
import { sharePostQueryKeys } from '@/apis/query-keys';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { Avatar } from '@/components/@common/atoms';
import Follow from '@/components/share/atoms/Follow';

type UserDetailPanelProps = {
    nickname: string;
    profile: ImageType;
    isFollow: boolean | undefined;
};

export default function Profile({ nickname, profile, isFollow }: UserDetailPanelProps) {
    const { data } = useFetchUserProfile({ nickname });
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response']>>(
        sharePostQueryKeys.detailUserPosts(nickname),
    );

    const defaultData = {
        user: {
            id: '',
            nickname,
            profile,
            isFollow,
            followerCount: 0,
            followingCount: 0,
            postCount: 0,
        },
    };

    const newData = {
        user: {
            ...defaultData.user,
            ...data?.user,
            postCount: post?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? 0,
        },
    };

    const activitySummaryItems: Array<ActivitySummaryItemProps & ActivitySummaryItemActions> = [
        {
            label: '게시물',
            count: newData.user.postCount,
            onPress: () => {},
        },
        {
            label: '팔로워',
            count: newData.user.followerCount,
            onPress: () => {},
        },
        {
            label: '팔로잉',
            count: newData.user.followingCount,
            onPress: () => {},
        },
    ];

    return (
        <View style={styles.container}>
            <Avatar image={{ src: newData.user.profile.src }} size={80} priority={'high'} />
            <Typo variant="title5">{newData.user.nickname}</Typo>
            <View style={styles.activitySummaryContainer}>
                {activitySummaryItems.map(({ label, count, onPress }) => (
                    <UserActivitySummaryItem key={label} label={label} count={count} onPress={onPress} />
                ))}
            </View>
            <View style={styles.textContainer}>
                <Follow user={{ id: newData.user.id, isFollow: newData.user.isFollow }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        height: 195,
    },
    activitySummaryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    textContainer: {
        height: 20,
    },
});
