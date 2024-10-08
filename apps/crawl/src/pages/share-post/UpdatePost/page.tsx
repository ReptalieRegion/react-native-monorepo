import React from 'react';

import ChangeHeader from './header';

import useToast from '@/components/overlay/Toast/useToast';
import PageWrapper from '@/components/PageWrapper';
import PostUpdate from '@/pages/share-post/UpdatePost/context/providers/PostUpdate';
import type { SharePostUpdateScreen } from '@/types/routes/props/share-post/update-post';

export default function SharePostUpdatePage({
    navigation,
    route: {
        params: { post },
    },
}: SharePostUpdateScreen) {
    const openToast = useToast();

    const handleToast = () => {
        openToast({
            severity: 'warning',
            contents: '이미지는 최소 1개이상이어야 합니다.',
        });
    };

    return (
        <PostUpdate minImageCountCallback={handleToast}>
            <PageWrapper>
                <ChangeHeader navigation={navigation} postId={post.id} />
                <PostUpdate.List images={post.images} contents={post.contents} />
            </PageWrapper>
        </PostUpdate>
    );
}
