import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../../common/atoms/Follow';
import UserAvatar from '../atoms/UserAvatar';
import ActivitySummary from '../molecules/ActivitySummary';

import { ImageType } from '<image>';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';

type UserDetailPanelProps = {
    nickname: string;
    profile: ImageType;
    isFollow: boolean | undefined;
};

const UserDetailPanel = ({ nickname, profile, isFollow }: UserDetailPanelProps) => {
    const { data } = useFetchUserProfile({ nickname });

    const newData = useMemo(
        () => ({
            avatar: {
                user: {
                    nickname: data?.user.nickname ?? nickname,
                    profile: data?.user.profile ?? profile,
                },
            },
            activitySummary: {
                user: {
                    followerCount: data?.user.followerCount ?? 0,
                    followingCount: data?.user.followingCount ?? 0,
                },
                post: {
                    count: 0,
                },
            },
            follow: {
                user: {
                    id: data?.user.id ?? '',
                    isFollow: data?.user.isFollow ?? isFollow,
                },
            },
        }),
        [data, isFollow, nickname, profile],
    );

    return (
        <View style={styles.container}>
            <UserAvatar {...newData.avatar} />
            <ActivitySummary {...newData.activitySummary} />
            <View style={styles.textContainer}>
                <Follow {...newData.follow} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        height: 195,
    },
    textContainer: {
        height: 20,
    },
});

export default UserDetailPanel;
