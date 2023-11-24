import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';

import UserProfile from './ListHeaderComponent';
import type { SharePostDetailProfileScreenNavigationProp, SharePostModalDetailScreenNavigationProp } from './type';

import type { SharePostDetailProps } from '<routes/bottom-tab>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import useImageThumbnailNavigation from '@/hooks/share-post/navigation/useImageThumbnailNavigation';

const PostImageList = React.lazy(() => import('./PostImageList'));

export function SharePostDetailImageListHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
}

export default function SharePostDetailImageListPage({
    route: {
        params: { isFollow, nickname, profile, pageState },
    },
}: SharePostDetailProfileScreenNavigationProp | SharePostModalDetailScreenNavigationProp) {
    const { navigateFollowerPage, navigateListUser } = useImageThumbnailNavigation(pageState);

    const ListHeaderComponent = (
        <UserProfile isFollow={isFollow} nickname={nickname} profile={profile} navigateFollowerPage={navigateFollowerPage} />
    );

    const handleImagePress = (index: number) => {
        navigateListUser({ nickname, startIndex: index });
    };

    return (
        <View style={styles.container}>
            <Suspense
                fallback={
                    <>
                        {ListHeaderComponent}
                        <SharePostsDetailListSkeleton />
                    </>
                }
            >
                <PostImageList
                    nickname={nickname}
                    ListHeaderComponent={ListHeaderComponent}
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
