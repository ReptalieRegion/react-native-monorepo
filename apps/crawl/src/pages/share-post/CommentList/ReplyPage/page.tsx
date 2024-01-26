import { Typo } from '@crawl/design-system';
import { withErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentProvider from '../../@common/contexts/Comment/CommentProvider';

import CommentReplyTextEditor from './components/CommentReplyTextEditor';
import CommentReplySkeleton from './loading';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import HTTPError from '@/apis/@utils/error/HTTPError';
import type { CommentReplyScreenProps } from '@/types/routes/props/share-post/comment';

const FollowerUserList = React.lazy(() => import('../../@common/contexts/TagTextInput/components/FollowerUserList'));
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
                <CommentReplyTextEditor isFocus={props.route.params.isFocus} />
            </CommentProvider>
        );
    },
    {
        ignoreError: (error) => !(error instanceof HTTPError) || error.code !== SHARE_POST_ERROR_CODE.NOT_FOUND_COMMENT,
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
