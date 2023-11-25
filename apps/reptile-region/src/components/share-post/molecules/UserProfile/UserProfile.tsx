import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';
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

interface UserDetailPanelActions {
    navigateFollowPage(props: FollowRouterParams): void;
}

type UserDetailPanelProps = UserDetailPanelState & UserDetailPanelActions;

export default function UserProfile({ user, postCount, navigateFollowPage }: UserDetailPanelProps) {
    const { mutateFollow } = useCreateOrUpdateFollow();
    const newData = {
        user: {
            ...user,
            isFollow: user?.isFollow,
        },
        postCount,
    };

    const handlePressFollow = () => {
        mutateFollow({ userId: newData.user.id, isFollow: newData.user.isFollow });
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
                    pageState: 'BOTTOM_TAB',
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
                    pageState: 'BOTTOM_TAB',
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
                    trueContent={<Follow isFollow={newData.user.isFollow} onPress={handlePressFollow} />}
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
