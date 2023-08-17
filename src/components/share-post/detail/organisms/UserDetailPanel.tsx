import React from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../../list/atoms/Follow';
import UserAvatar from '../atoms/UserAvatar';
import ActivitySummary from '../molecules/ActivitySummary';

import { SharePostDetailPostsData } from '<SharePostDetail>';

const UserDetailPanel = ({ followerCount, followingCount, posts, profile, nickname, isFollow }: SharePostDetailPostsData) => {
    return (
        <View style={styles.container}>
            <UserAvatar profile={profile} nickname={nickname} />
            <ActivitySummary followerCount={followerCount} followingCount={followingCount} posts={posts} />
            <View style={styles.textContainer}>
                <Follow isFollow={isFollow} />
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
    },
    textContainer: {
        height: 20,
    },
});

export default UserDetailPanel;
