import React from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../atoms/Follow';
import PostKebabMenu from '../atoms/PostKebabMenu';
import Profile from '../atoms/Profile';

import { SharePostsData } from '<SharePostAPI>';

type PostHeaderProps = Pick<SharePostsData, 'nickname' | 'profile' | 'isFollow' | 'userId' | 'postId'>;

const PostHeader = ({ nickname, profile, isFollow, userId, postId }: PostHeaderProps) => {
    return (
        <View style={styles.container}>
            <Profile userId={userId} nickname={nickname} profile={profile} />
            <View style={styles.rightContent}>
                <Follow isFollow={isFollow} />
                <PostKebabMenu postId={postId} userId={userId} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostHeader;
