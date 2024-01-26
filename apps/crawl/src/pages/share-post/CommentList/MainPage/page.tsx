import { Typo } from '@crawl/design-system';
import { withErrorBoundary } from '@crawl/error-boundary';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentProvider from '../../@common/contexts/Comment/CommentProvider';

import CommentList from './components/CommentList';
import CommentTextEditor from './components/CommentTextEditor';
import CommentSkeleton from './loading';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import HTTPError from '@/apis/@utils/error/HTTPError';
import type { CommentScreenProps } from '@/types/routes/props/share-post/comment';

const FollowerUserList = React.lazy(
    () => import('@/pages/share-post/@common/contexts/TagTextInput/components/FollowerUserList'),
);

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
        ignoreError: (error) => !(error instanceof HTTPError) || error.code !== SHARE_POST_ERROR_CODE.NOT_FOUND_SHARE_POST,
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
