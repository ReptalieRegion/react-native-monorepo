import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';
import type {
    ActivitySummaryItemActions,
    ActivitySummaryItemProps,
} from '@/components/share-post/molecules/UserActivitySummaryItem';
import UserActivitySummaryItem from '@/components/share-post/molecules/UserActivitySummaryItem';
import type { ImageType } from '@/types/global/image';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

type UserDetailPanelState = {
    user: {
        id: string;
        nickname: string;
        profile: ImageType;
        isFollow?: boolean | undefined;
        isMine?: boolean;
        followerCount: number;
        followingCount: number;
    };
    postCount: number;
};

export interface UserDetailPanelActions {
    handlePressFollow?(props: { userId: string; isFollow: boolean | undefined }): void;
    navigateFollowPage(props: Omit<FollowRouterParams, 'pageState'>): void;
}

type UserDetailPanelProps = UserDetailPanelState & UserDetailPanelActions;

export default function UserProfile({ user, postCount, navigateFollowPage, handlePressFollow }: UserDetailPanelProps) {
    const newData = {
        user: {
            ...user,
            isFollow: user?.isFollow,
        },
        postCount,
    };

    // TODO 유저 프로필 액션
    const activitySummaryItems: Array<ActivitySummaryItemProps & ActivitySummaryItemActions> = [
        {
            label: '게시물',
            count: postCount,
        },
        {
            label: '팔로워',
            count: newData.user.followerCount,
            onPress: () =>
                navigateFollowPage({
                    initialRouteName: 'follower',
                    user: {
                        id: user.id,
                        followerCount: user.followerCount,
                        followingCount: user.followingCount,
                        nickname: user.nickname,
                    },
                }),
        },
        {
            label: '팔로잉',
            count: user.followingCount,
            onPress: () =>
                navigateFollowPage({
                    initialRouteName: 'following',
                    user: {
                        id: user.id,
                        followerCount: user.followerCount,
                        followingCount: user.followingCount,
                        nickname: user.nickname,
                    },
                }),
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
                {/** TODO 팔로우 */}
                <ConditionalRenderer
                    condition={user.isMine === false}
                    trueContent={
                        <Follow
                            isFollow={newData.user.isFollow}
                            onPress={() =>
                                handlePressFollow?.({
                                    userId: user.id,
                                    isFollow: user.isFollow,
                                })
                            }
                        />
                    }
                    falseContent={null}
                />
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
