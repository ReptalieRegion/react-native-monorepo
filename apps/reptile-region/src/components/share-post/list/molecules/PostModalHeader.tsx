import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostKebabMenu from '../atoms/PostKebabMenu';
import Profile from '../atoms/Profile';

import { ShareImageType } from '<Image>';

type PostModalHeaderProps = {
    user: {
        id: string;
        nickname: string;
        profile: ShareImageType;
    };
    post: {
        id: string;
        isMine: boolean;
    };
};

const PostModalHeader = ({ user, post }: PostModalHeaderProps) => {
    const { id: userId, nickname, profile } = user;

    return (
        <View style={styles.container}>
            <Profile user={{ id: userId, nickname, profile }} />
            <View style={styles.rightContent}>
                <PostKebabMenu user={{ id: user.id }} post={post} />
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

export default PostModalHeader;
