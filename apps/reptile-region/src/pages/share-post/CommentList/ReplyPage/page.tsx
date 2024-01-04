import { Typo } from '@crawl/design-system';
import { withErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentProvider from '../../@common/contexts/Comment/CommentProvider';
import { FollowerUserList } from '../../@common/contexts/TagTextInput';

import CommentReplyTextEditor from './components/CommentReplyTextEditor';
import CommentReplySkeleton from './loading';

import HTTPError from '@/apis/@utils/error/HTTPError';
import type { CommentReplyScreenProps } from '@/types/routes/props/share-post/comment';

const CommentReplyList = React.lazy(() => import('./components/CommentReplyList'));

const CommentReplyListPage = withErrorBoundary<CommentReplyScreenProps>(
    (props) => {
        return (
            <CommentProvider id={props.route.params.post.comment.id}>
                <View style={styles.container}>
                    <Suspense fallback={<CommentReplySkeleton />}>
                        <CommentReplyList {...props} />
                    </Suspense>
                    <FollowerUserList containerStyles={styles.followerUserListContainer} />
                </View>
                <CommentReplyTextEditor postId={props.route.params.post.id} isFocus={props.route.params.isFocus} />
            </CommentProvider>
        );
    },
    {
        ignoreError: (error) => !(error instanceof HTTPError) || error.code !== -1001,
        renderFallback: () => <Typo>삭제된 댓글입니다</Typo>,
    },
);

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

export default CommentReplyListPage;
