import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';

import ListHeaderComponent from './ListHeaderComponent';

import type { SharePostDetailProps } from '<routes/bottom-tab>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import useMeImageThumbnailNavigation from '@/hooks/share-post/navigation/useMeImageThumbnailNavigation';

const PostImageList = React.lazy(() => import('./PostImageList'));

export function SharePostMeDetailImageListHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
}

export default function SharePostMeDetailImageListPage() {
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
