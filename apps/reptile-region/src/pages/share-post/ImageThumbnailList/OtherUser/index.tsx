import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import useImageThumbnailNavigation from '../../../../hooks/share-post/navigation/useImageThumbnailNavigation';
import SharePostsDetailListSkeleton from '../loading';
import type { SharePostImageThumbnailListScreenProps, SharePostMeImageThumbnailListScreenProps } from '../type';

import ListHeaderComponent from './ListHeaderComponent';

import useImageThumbnailActions from '@/hooks/share-post/actions/useImageThumbnailActions';

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
    const { handlePressFollow } = useImageThumbnailActions({ nickname });

    const handleImagePress = (index: number) => {
        navigateListUser({ user: { nickname }, startIndex: index });
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
                                navigateFollowPage={navigateFollowerPage}
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
                            navigateFollowPage={navigateFollowerPage}
                            handlePressFollow={handlePressFollow}
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
