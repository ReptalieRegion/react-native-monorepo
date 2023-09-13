import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import TaggedContent, { TagPressHandler } from '../../common/atoms/TaggedContent';
import CommentContent from '../atoms/CommentContent';
import LikeContent from '../atoms/LikeContent';

import type { RootStackParamList } from '<RootRoutes>';
import type { SharePostListData } from '<SharePostAPI>';

type PostContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount' | 'commentCount' | 'contents' | 'id'>;
};

const PostContent = ({ post }: PostContentProps) => {
    const { id: postId, commentCount, contents, likeCount } = post;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>>();

    const onPressTag: TagPressHandler = (_, content) => {
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
