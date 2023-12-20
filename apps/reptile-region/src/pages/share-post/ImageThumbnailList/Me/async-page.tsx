import { color } from '@crawl/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';

import ListHeaderComponent from './ListHeaderComponent';

import useMeImageThumbnailNavigation from '@/pages/share-post/ImageThumbnailList/Me/@hooks/useMeImageThumbnailNavigation';

const PostImageList = React.lazy(() => import('./PostImageList'));

export default function SharePostMeImageThumbnailListPage() {
    const { navigateFollowerPage, navigateListUser } = useMeImageThumbnailNavigation();

    const handleImagePress = (index: number) => {
        navigateListUser({ startIndex: index });
    };

    return (
        <View style={styles.container}>
            <Suspense
                fallback={
                    <>
                        {<ListHeaderComponent navigateFollowerPage={navigateFollowerPage} />}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
