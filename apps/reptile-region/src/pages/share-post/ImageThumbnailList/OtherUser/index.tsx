import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';
import type { SharePostDetailProfileScreenNavigationProp, SharePostModalDetailScreenNavigationProp } from '../type';

import ListHeaderComponent from './ListHeaderComponent';

import { createNativeStackHeader } from '@/components/@common/molecules';
import useImageThumbnailNavigation from '@/hooks/share-post/navigation/useImageThumbnailNavigation';

const PostImageList = React.lazy(() => import('./PostImageList'));

export function SharePostDetailImageListHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({ leftIcon: 'back' })(props);
}

export default function SharePostDetailImageListPage({
    route: {
        params: { isFollow, nickname, profile, pageState },
    },
}: SharePostDetailProfileScreenNavigationProp | SharePostModalDetailScreenNavigationProp) {
    const { navigateFollowerPage, navigateListUser } = useImageThumbnailNavigation(pageState);

    const handleImagePress = (index: number) => {
        navigateListUser({ nickname, startIndex: index });
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
