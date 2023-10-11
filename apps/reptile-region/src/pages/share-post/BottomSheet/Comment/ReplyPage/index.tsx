import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentReplySkeleton from './loading';

import type { SharePostCommentParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import { FollowerUserList, FollowerUserListSkeleton } from '@/components/@common/organisms/TagTextInput';
import Comment, { CommentReplyList, CommentReplyTextEditor } from '@/components/share/organisms/Comment';

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
                <View style={styles.followerUserListContainer}>
                    <Suspense fallback={<FollowerUserListSkeleton />}>
                        <FollowerUserList />
                    </Suspense>
                </View>
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
    followerUserListContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingTop: 10,
        backgroundColor: 'white',
    },
});
