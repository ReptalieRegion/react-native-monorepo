import React from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../atoms/Follow';
import PostKebabMenu from '../atoms/PostKebabMenu';
import Profile from '../atoms/Profile';

import { SharePostListData } from '<SharePostListAPI>';

type PostHeaderProps = {
    user: Pick<SharePostListData['user'], 'nickname' | 'profile' | 'isFollow' | 'id'>;
    post: Pick<SharePostListData['post'], 'id'>;
};

const PostHeader = ({ user, post }: PostHeaderProps) => {
    const { id: userId, isFollow, nickname, profile } = user;
    const { id: postId } = post;

    return (
        <View style={styles.container}>
            <Profile user={{ id: userId, nickname, profile }} />
            <View style={styles.rightContent}>
                <Follow user={{ id: userId, isFollow }} post={{ id: postId }} />
                <PostKebabMenu user={{ id: user.id }} post={{ id: post.id }} />
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
