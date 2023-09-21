import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootRoutesParamList, SharePostParamList } from '<RootRoutes>';
import SharePostsDetailListSkeleton from '@/components/share-post/detail/atoms/loading/SharePostsDetailListSkeleton';
import UserDetailPanelSkeleton from '@/components/share-post/detail/atoms/loading/UserDetailPanelSkeleton';
import SharePostsDetailList from '@/components/share-post/detail/organisms/PostsDetailList';
import UserDetailPanel from '@/components/share-post/detail/organisms/UserDetailPanel';

type SharePostModalDetailScreenNavigationProp = CompositeScreenProps<
    NativeStackScreenProps<SharePostParamList, 'share-post/modal/detail'>,
    BottomTabScreenProps<RootRoutesParamList, 'share-post/routes'>
>;

export default function SharePostDetailProfileModal({
    navigation,
    route: { params },
}: SharePostModalDetailScreenNavigationProp) {
    const handleImagePress = () => {
        navigation.push('share-post/modal/list/user', { nickname: params.nickname });
    };

    return (
        <View style={styles.container}>
            <Suspense fallback={<UserDetailPanelSkeleton />}>
                <UserDetailPanel nickname={params.nickname} />
            </Suspense>
            <Suspense fallback={<SharePostsDetailListSkeleton />}>
                <SharePostsDetailList nickname={params.nickname} handleImagePress={handleImagePress} />
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
