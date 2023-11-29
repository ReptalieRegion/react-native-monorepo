import React, { Suspense, useMemo } from 'react';

import CommentSkeleton from './Comment/loading';
import SharePostDetailModalPage from './Comment/page';
import PostListSkeleton from './Post/loading';
import { Post } from './Post/page';
import type { PostDetailModalListScreenProps } from './type';

import Comment from '@/components/share-post/organisms/Comment';

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
