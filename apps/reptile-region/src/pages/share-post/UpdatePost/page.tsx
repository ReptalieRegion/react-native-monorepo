import React from 'react';

import ChangeHeader from './header';

import { useToast } from '@/components/@common/organisms/Toast';
import PostUpdate from '@/components/share-post/organisms/PostUpdate/providers/PostUpdate';
import type { SharePostUpdateScreen } from '@/types/routes/props/share-post/update-post';

export default function SharePostUpdatePage({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    const { openToast } = useToast();

    const handleToast = () => {
        openToast({
            severity: 'warning',
            contents: '이미지는 최소 1개이상이어야 합니다.',
        });
    };

    return (
        <PostUpdate minImageCountCallback={handleToast}>
            <ChangeHeader postId={post.id} navigation={navigation} />
            <PostUpdate.List images={post.images} contents={post.contents} />
        </PostUpdate>
    );
}
