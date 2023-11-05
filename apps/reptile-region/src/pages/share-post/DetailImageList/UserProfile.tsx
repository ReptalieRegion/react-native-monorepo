import { Typo } from '@reptile-region/design-system';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { FetchDetailUserPost } from '<api/share/post>';
import type { ImageType } from '<image>';
import type { SharePostFollowProps } from '<routes/bottom-tab>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/mutations/useCreateOrUpdateFollow';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import Follow from '@/components/share-post/atoms/Follow';
import type {
    ActivitySummaryItemActions,
    ActivitySummaryItemProps,
} from '@/components/share-post/molecules/UserActivitySummaryItem';
import UserActivitySummaryItem from '@/components/share-post/molecules/UserActivitySummaryItem';

type UserDetailPanelState = {
    nickname: string;
    profile: ImageType;
    isFollow: boolean | undefined;
};

interface UserDetailPanelActions {
    navigateFollowPage(props: SharePostFollowProps): void;
}

type UserDetailPanelProps = UserDetailPanelState & UserDetailPanelActions;

export default function UserProfile({ nickname, profile, isFollow, navigateFollowPage }: UserDetailPanelProps) {
    const { data } = useFetchUserProfile({ nickname });
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response']>>(
        sharePostQueryKeys.detailUserPosts(nickname),
    );

    const { mutateFollow } = useCreateOrUpdateFollow();

    const defaultData = {
        user: {
            id: '',
            nickname,
            profile,
            isFollow,
            followerCount: 0,
            followingCount: 0,
        },
        postCount: 0,
    };

    const newData = {
        user: {
            ...defaultData.user,
            ...data?.user,
        },
        postCount: post?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? 0,
    };

    const handlePressFollow = () => {
        mutateFollow({ userId: newData.user.id, isFollow: newData.user.isFollow });
    };

    // TODO 유저 프로필 액션
    const activitySummaryItems: Array<ActivitySummaryItemProps & ActivitySummaryItemActions> = [
        {
            label: '게시물',
            count: newData.postCount,
        },
        {
            label: '팔로워',
            count: newData.user.followerCount,
            onPress: () =>
                navigateFollowPage({
                    initialRouteName: 'share-post/follower/list',
                    userId: newData.user.id,
                    followerCount: newData.user.followerCount,
                    followingCount: newData.user.followingCount,
                    nickname: newData.user.nickname,
                }),
        },
        {
            label: '팔로잉',
            count: newData.user.followingCount,
            onPress: () =>
                navigateFollowPage({
                    initialRouteName: 'share-post/following/list',
                    userId: newData.user.id,
                    followerCount: newData.user.followerCount,
                    followingCount: newData.user.followingCount,
                    nickname: newData.user.nickname,
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
                    condition={data?.user.isMine === false}
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
