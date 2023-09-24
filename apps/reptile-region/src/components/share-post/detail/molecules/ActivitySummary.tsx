import React from 'react';
import { StyleSheet, View } from 'react-native';

import ActivitySummaryItem from '../atoms/ActivitySummaryItem';

type ActivitySummaryProps = {
    user: {
        followerCount: number;
        followingCount: number;
    };
    post: {
        count: number;
    };
};

const ActivitySummary = ({ user, post }: ActivitySummaryProps) => {
    const handleClickFollower = () => {
        return;
    };

    const handleClickFollowing = () => {
        return;
    };

    return (
        <View style={styles.container}>
            <ActivitySummaryItem content="게시물" count={post.count} />
            <ActivitySummaryItem content="팔로워" count={user.followerCount} onPress={handleClickFollower} />
            <ActivitySummaryItem content="팔로잉" count={user.followingCount} onPress={handleClickFollowing} />
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
