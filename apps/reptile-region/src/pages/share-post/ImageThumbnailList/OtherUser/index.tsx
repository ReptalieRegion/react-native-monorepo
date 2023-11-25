import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import useImageThumbnailNavigation from '../../../../hooks/share-post/navigation/useImageThumbnailNavigation';
import SharePostsDetailListSkeleton from '../loading';
import type { SharePostImageThumbnailListScreenProps, SharePostMeImageThumbnailListScreenProps } from '../type';

import ListHeaderComponent from './ListHeaderComponent';

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

    const handleImagePress = (index: number) => {
        navigateListUser({ user: { nickname }, startIndex: index, pageState });
    };

    return (
        <View style={styles.container}>
            <Suspense
                fallback={
                    <>
                        {
                            <ListHeaderComponent
                                isFollow={isFollow}
                                nickname={nickname}
                                profile={profile}
                                navigateFollowerPage={navigateFollowerPage}
                            />
                        }
                        <SharePostsDetailListSkeleton />
                    </>
                }
            >
                <PostImageList
                    nickname={nickname}
                    ListHeaderComponent={
                        <ListHeaderComponent
                            isFollow={isFollow}
                            nickname={nickname}
                            profile={profile}
                            navigateFollowerPage={navigateFollowerPage}
                        />
                    }
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
