import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentProvider from '../../@common/contexts/Comment/CommentProvider';

import CommentReplyTextEditor from './components/CommentReplyTextEditor';
import CommentReplySkeleton from './loading';

import { FollowerUserList, FollowerUserListSkeleton } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { CommentReplyScreenProps } from '@/types/routes/props/share-post/comment';

const CommentReplyList = React.lazy(() => import('./page'));

export default function CommentReplyPage(props: CommentReplyScreenProps) {
    return (
        <CommentProvider id={props.route.params.post.comment.id}>
            <View style={styles.container}>
                <Suspense fallback={<CommentReplySkeleton />}>
                    <CommentReplyList {...props} />
                </Suspense>
                <Suspense fallback={<FollowerUserListSkeleton />}>
                    <FollowerUserList containerStyles={styles.followerUserListContainer} />
                </Suspense>
            </View>
            <CommentReplyTextEditor isFocus={props.route.params.isFocus} />
        </CommentProvider>
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
