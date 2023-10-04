import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SharePostCommentParamList, SharePostParamList } from '<RootRoutes>';
import CommentReplySkeleton from '@/components/share/atoms/Suspense/CommentReplySkeleton';
import CommentTagListActivityIndicator from '@/components/share/atoms/Suspense/CommentTagListActivityIndicator';
import Comment, { CommentReplyList, CommentReplyTextEditor, CommentTagList } from '@/components/share/organisms/Comment';

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
            <CommentReplyTextEditor />
        </Comment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});
