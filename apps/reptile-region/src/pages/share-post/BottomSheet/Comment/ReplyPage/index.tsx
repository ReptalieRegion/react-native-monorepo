import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentReplySkeleton from './loading';

import type { SharePostCommentParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import CommentTagListActivityIndicator from '@/components/share/atoms/Suspense/CommentTagListActivityIndicator';
import Comment, { CommentReplyList, CommentReplyTextEditor, CommentTagList } from '@/components/share/organisms/Comment';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'reply'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function CommentReplyPage(props: CommentScreenProps) {
    return (
        <Comment id={props.route.params.comment.id}>
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
        minHeight: 2,
    },
});