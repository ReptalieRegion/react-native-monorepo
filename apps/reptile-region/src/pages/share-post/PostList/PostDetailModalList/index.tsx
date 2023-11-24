import React from 'react';

import SharePostDetailModalPage from './page';
import type { PostDetailModalListScreenProps } from './type';

import Comment from '@/components/share-post/organisms/Comment';

export default function PostDetailModalListPage(props: PostDetailModalListScreenProps) {
    return (
        <Comment id={props.route.params.postId}>
            <SharePostDetailModalPage {...props} />
        </Comment>
    );
}
