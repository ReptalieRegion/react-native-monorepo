import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import { SharePostCommentParamList, SharePostParamList } from '<RootRoutes>';
import Comment, { CommentReplyList, CommentTagList } from '@/components/share/organisms/Comment';
import CommentReplySkeleton from '@/components/share-post/comment/atoms/loading/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share-post/comment/atoms/loading/CommentTagListActivityIndicator';
import CommentReplyEditor from '@/components/share-post/comment/molecules/CommentReplyEditor';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'reply'>,
    NativeStackScreenProps<SharePostParamList, 'share-post/bottom-sheet/comment'>
>;

export default function CommentReplyPage(props: CommentScreenProps) {
    return (
        <Comment>
            <View style={styles.container}>
                <Suspense fallback={<CommentReplySkeleton />}>
                    <CommentReplyList {...props} />
                </Suspense>
                <Suspense fallback={<CommentTagListActivityIndicator />}>
                    <CommentTagList />
                </Suspense>
            </View>
            <CommentReplyEditor />
        </Comment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});
