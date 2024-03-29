import { withAsyncBoundary } from '@crawl/async-boundary';
import { useRoute } from '@react-navigation/native';
import React, { Suspense } from 'react';

import CommentSkeleton from './components/Comment/loading';
import PostListSkeleton from './components/Post/loading';
import PostDetailError from './error';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import HTTPError from '@/apis/@utils/error/HTTPError';
import PageWrapper from '@/components/PageWrapper';
import type { PostDetailModalListScreenProps, PostDetailRouteProp } from '@/types/routes/props/share-post/post-detail';

const Post = React.lazy(() => import('./components/Post/page'));
const CommentProvider = React.lazy(() => import('@/pages/share-post/@common/contexts/Comment/CommentProvider'));
const SharePostDetailModalPage = React.lazy(() => import('./components/Comment/page'));

const ListHeaderComponent = () => {
    const {
        params: { postId },
    } = useRoute<PostDetailRouteProp>();

    return (
        <Suspense fallback={<PostListSkeleton />}>
            <Post postId={postId} />
        </Suspense>
    );
};

const PostDetailModalListPage = withAsyncBoundary(
    (props: PostDetailModalListScreenProps) => {
        const postId = props.route.params.postId;

        return (
            <CommentProvider id={postId}>
                <SharePostDetailModalPage {...props} ListHeaderComponent={<ListHeaderComponent />} />
            </CommentProvider>
        );
    },
    {
        pendingFallback: (
            <PageWrapper>
                <ListHeaderComponent />
                <CommentSkeleton />
            </PageWrapper>
        ),
        rejectedFallback: PostDetailError,
        ignoreError: (error) => !(error instanceof HTTPError) || error.code !== SHARE_POST_ERROR_CODE.NOT_FOUND_SHARE_POST,
    },
);

export default PostDetailModalListPage;
