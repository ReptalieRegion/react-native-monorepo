import React from 'react';
import { StyleSheet, View } from 'react-native';

import ActivitySummaryItem from '../atoms/ActivitySummaryItem';

import { SharePostDetailPostsData } from '<SharePostDetail>';

type ActivitySummaryProps = Pick<SharePostDetailPostsData, 'followerCount' | 'followingCount' | 'posts'>;

const ActivitySummary = ({ followerCount, followingCount, posts }: ActivitySummaryProps) => {
    const handleClickFollower = () => {
        return;
    };

    const handleClickFollowing = () => {
        return;
    };

    return (
        <View style={styles.container}>
            <ActivitySummaryItem content="게시물" count={posts.length} />
            <ActivitySummaryItem content="팔로워" count={followerCount} onPress={handleClickFollower} />
            <ActivitySummaryItem content="팔로잉" count={followingCount} onPress={handleClickFollowing} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
});

export default ActivitySummary;
