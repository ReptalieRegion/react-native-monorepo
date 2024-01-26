import React, { Suspense } from 'react';

import SharePostsDetailListSkeleton from '../loading';

import ListHeaderComponent from './components/ListHeaderComponent';

import PageWrapper from '@/components/PageWrapper';
import useMeImageThumbnailNavigation from '@/pages/share-post/ImageThumbnailList/Me/hooks/useMeImageThumbnailNavigation';

const PostImageList = React.lazy(() => import('./components/PostImageList'));

export default function SharePostMeImageThumbnailListPage() {
    const { navigateFollowerPage, navigateListUser } = useMeImageThumbnailNavigation();

    const handleImagePress = (index: number) => {
        navigateListUser({ startIndex: index });
    };

    return (
        <PageWrapper>
            <Suspense
                fallback={
                    <>
                        <ListHeaderComponent navigateFollowerPage={navigateFollowerPage} />
                        <SharePostsDetailListSkeleton />
                    </>
                }
            >
                <PostImageList
                    pageState={'MODAL'}
                    ListHeaderComponent={<ListHeaderComponent navigateFollowerPage={navigateFollowerPage} />}
                    handleImagePress={handleImagePress}
                />
            </Suspense>
        </PageWrapper>
    );
}
