import { color } from '@crawl/design-system';
import React, { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import useImageThumbnailNavigation from '../@hooks/useImageThumbnailNavigation';
import { LIST_HEADER_HEIGHT, LIST_HEADER_PADDING } from '../constants';
import SharePostsDetailListSkeleton from '../loading';

import useUpdateOrCreateFollow from './@hooks/useUpdateOrCreateFollow';
import ListHeaderComponent from './ListHeaderComponent';

import type {
    SharePostImageThumbnailListScreenProps,
    SharePostMeImageThumbnailListScreenProps,
} from '@/types/routes/props/share-post/image-thumbnail';

const PostImageList = React.lazy(() => import('./PostImageList'));

export default function SharePostImageThumbnailListPage({
    route: {
        params: {
            user: { isFollow, nickname, profile },
            pageState,
        },
    },
}: SharePostMeImageThumbnailListScreenProps | SharePostImageThumbnailListScreenProps) {
    const { navigateFollowerPage, navigateListUser } = useImageThumbnailNavigation(pageState);
    const updateOrCreateFollow = useUpdateOrCreateFollow(nickname);
    const handleImagePress = (index: number) => {
        navigateListUser({ user: { nickname }, startIndex: index });
    };

    const MemoListHeaderComponent = useMemo(
        () => (
            <ListHeaderComponent
                isFollow={isFollow}
                nickname={nickname}
                profile={profile}
                navigateFollowPage={navigateFollowerPage}
                handlePressFollow={updateOrCreateFollow}
                containerStyle={{
                    height: LIST_HEADER_HEIGHT,
                    padding: LIST_HEADER_PADDING,
                }}
            />
        ),
        [isFollow, nickname, profile, navigateFollowerPage, updateOrCreateFollow],
    );

    return (
        <View style={styles.container}>
            <Suspense
                fallback={
                    <>
                        {MemoListHeaderComponent}
                        <SharePostsDetailListSkeleton />
                    </>
                }
            >
                <PostImageList
                    pageState={pageState}
                    nickname={nickname}
                    ListHeaderComponent={MemoListHeaderComponent}
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
