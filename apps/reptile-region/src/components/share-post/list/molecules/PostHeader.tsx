import React from 'react';
import { StyleSheet, View } from 'react-native';

import Follow from '../atoms/Follow';
import PostKebabMenu from '../atoms/PostKebabMenu';
import Profile from '../atoms/Profile';

import type { SharePostListData } from '<SharePostAPI>';
import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';

type PostHeaderProps = {
    user: Pick<SharePostListData['user'], 'nickname' | 'profile' | 'isFollow' | 'id'>;
    post: Pick<SharePostListData['post'], 'id' | 'isMine'>;
};

const PostHeader = ({ user, post }: PostHeaderProps) => {
    const { id: userId, isFollow, nickname, profile } = user;

    return (
        <View style={styles.container}>
            <Profile user={{ id: userId, nickname, profile }} />
            <View style={styles.rightContent}>
                <ConditionalRenderer
                    condition={post.isMine}
                    trueContent={null}
                    falseContent={<Follow user={{ id: userId, isFollow }} />}
                />
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

export default PostHeader;
