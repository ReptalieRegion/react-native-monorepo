import React, { Suspense, useMemo } from 'react';

import CommentSkeleton from './Comment/loading';
import PostListSkeleton from './Post/loading';
import type { PostDetailModalListScreenProps } from './type';

const Post = React.lazy(() => import('./Post/page'));
const Comment = React.lazy(() => import('@/components/share-post/organisms/Comment'));
const SharePostDetailModalPage = React.lazy(() => import('./Comment/page'));

export default function PostDetailModalListPage(props: PostDetailModalListScreenProps) {
    const postId = props.route.params.postId;
    const ListHeaderComponent = useMemo(
        () => (
            <Suspense fallback={<PostListSkeleton />}>
                <Post postId={postId} />
            </Suspense>
        ),
        [postId],
    );

    return (
        <Suspense
            fallback={
                <>
                    {ListHeaderComponent}
                    <CommentSkeleton />
                </>
            }
        >
            <Comment id={postId}>
                <SharePostDetailModalPage {...props} ListHeaderComponent={ListHeaderComponent} />
            </Comment>
        </Suspense>
    );
}
