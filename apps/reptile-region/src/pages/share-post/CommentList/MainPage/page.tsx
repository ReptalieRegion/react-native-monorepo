import { Typo } from '@crawl/design-system';
import { withErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentProvider from '../../@common/contexts/Comment/CommentProvider';

import CommentList from './components/CommentList';
import CommentTextEditor from './components/CommentTextEditor';
import CommentSkeleton from './loading';

import HTTPError from '@/apis/@utils/error/HTTPError';
import { FollowerUserList } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { CommentScreenProps } from '@/types/routes/props/share-post/comment';

const CommentListPage = withErrorBoundary<CommentScreenProps>(
    (props) => {
        return (
            <CommentProvider id={props.route.params.post.id}>
                <View style={styles.container}>
                    <Suspense fallback={<CommentSkeleton />}>
                        <CommentList {...props} />
                    </Suspense>
                    <FollowerUserList containerStyles={styles.followerUserListContainer} />
                </View>
                <CommentTextEditor />
            </CommentProvider>
        );
    },
    {
        ignoreError: (error) => !(error instanceof HTTPError) || error.code !== -1001,
        renderFallback: () => <Typo>삭제된 게시물입니다</Typo>,
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

export default CommentListPage;
