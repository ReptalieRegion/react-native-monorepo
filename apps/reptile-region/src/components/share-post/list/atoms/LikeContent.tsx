import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { SharePostListData } from '<SharePostListAPI>';

type LikeContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount'>;
};

const LikeContent = ({ post }: LikeContentProps) => {
    if (post.likeCount === 0) {
        return null;
    }

    return <Text style={[styles.fontBold]}>{post.likeCount}명이 좋아합니다.</Text>;
};

const styles = StyleSheet.create({
    fontBold: {
        fontWeight: 'bold',
    },
});

export default LikeContent;
