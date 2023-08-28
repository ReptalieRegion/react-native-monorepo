import React from 'react';
import { StyleSheet, View } from 'react-native';

import TaggedContent from '../../common/atoms/TaggedContent';
import CommentContent from '../atoms/CommentContent';
import LikeContent from '../atoms/LikeContent';

import { SharePostListData } from '<SharePostListAPI>';

type PostContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount' | 'commentCount' | 'contents' | 'id' | 'tagIds'>;
};

const PostContent = ({ post }: PostContentProps) => {
    const { id: postId, commentCount, contents, likeCount, tagIds } = post;

    return (
        <View style={styles.container}>
            <LikeContent post={{ likeCount }} />
            <TaggedContent uuid={postId} tags={tagIds} contents={contents} />
            <CommentContent post={{ id: postId, commentCount }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 5,
    },
    content: {
        overflow: 'hidden',
    },
});

export default PostContent;
