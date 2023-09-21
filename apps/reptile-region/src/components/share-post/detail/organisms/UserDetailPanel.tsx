import React from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../atoms/Follow';
import UserAvatar from '../atoms/UserAvatar';
import ActivitySummary from '../molecules/ActivitySummary';

import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';

type UserDetailPanelProps = {
    nickname: string;
};

const UserDetailPanel = ({ nickname }: UserDetailPanelProps) => {
    const { data } = useFetchUserProfile({ nickname });

    if (!data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <UserAvatar user={{ nickname: data.user.nickname, profile: data.user.profile }} />
            <ActivitySummary
                user={{ followerCount: data.user.followerCount, followingCount: data.user.followingCount }}
                post={{ count: data.post.count }}
            />
            <View style={styles.textContainer}>
                <Follow user={{ id: data.user.id, isFollow: data.user.isFollow }} />
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
