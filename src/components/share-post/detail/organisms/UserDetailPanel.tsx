import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserAvatar from '../atoms/UserAvatar';
import ActivitySummary from '../molecules/ActivitySummary';
import Follow from '../../list/atoms/Follow';
import { SharePostDetailPostsData } from '<SharePostAPI>';

const UserDetailPanel = ({ followerCount, followingCount, posts, profile, nickname, isFollow }: SharePostDetailPostsData) => {
    return (
        <View style={styles.container}>
            <UserAvatar profile={profile} nickname={nickname} />
            <ActivitySummary followerCount={followerCount} followingCount={followingCount} posts={posts} />
            <Follow isFollow={isFollow} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    },
});

export default UserDetailPanel;
