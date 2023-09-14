import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import TaggedContent, { TagPressHandler } from '../../common/atoms/TaggedContent';
import CommentContent from '../atoms/CommentContent';
import LikeContent from '../atoms/LikeContent';

import type { SharePostListData } from '<SharePostAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';

type PostContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount' | 'commentCount' | 'contents' | 'id'>;
};

const PostContent = ({ post }: PostContentProps) => {
    const { id: postId, commentCount, contents, likeCount } = post;
    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const onPressTag: TagPressHandler = (content) => {
        navigation.push('share-post/detail', { nickname: content.slice(1) });
    };

    return (
        <View style={styles.container}>
            <LikeContent post={{ likeCount }} />
            <TaggedContent uuid={postId} contents={contents} onPressTag={onPressTag} />
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
