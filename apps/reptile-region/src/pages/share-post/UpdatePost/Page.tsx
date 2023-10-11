import React from 'react';

import ChangeHeader from './Header';
import type { SharePostUpdateScreen } from './types';

import PostUpdate from '@/components/share-post/organisms/PostUpdate/providers/PostUpdate';

export default function SharePostUpdatePage({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    return (
        <PostUpdate>
            <ChangeHeader postId={post.id} navigation={navigation} />
            <PostUpdate.List images={post.images} contents={post.contents} />
        </PostUpdate>
    );
}
