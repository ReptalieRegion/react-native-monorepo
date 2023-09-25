import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React, { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootRoutesParamList, SharePostParamList } from '<RootRoutes>';
import SharePostsDetailListSkeleton from '@/components/share-post/detail/atoms/loading/SharePostsDetailListSkeleton';
import UserDetailPanel from '@/components/share-post/detail/organisms/UserDetailPanel';

type SharePostDetailProfileScreenNavigationProp = CompositeScreenProps<
    NativeStackScreenProps<SharePostParamList, 'share-post/detail'>,
    BottomTabScreenProps<RootRoutesParamList, 'share-post/routes'>
>;

const SharePostsDetailList = React.lazy(() => import('@/components/share-post/detail/organisms/PostsDetailList'));

export default function SharePostDetailProfile({ navigation, route: { params } }: SharePostDetailProfileScreenNavigationProp) {
    const handleImagePress = (index: number) => {
        navigation.push('share-post/list/user', { nickname: params.nickname, startIndex: index });
    };

    const ListHeaderComponent = useMemo(() => {
        return <UserDetailPanel nickname={params.nickname} profile={params.profile} isFollow={params.isFollow} />;
    }, [params]);

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
                <SharePostsDetailList
                    nickname={params.nickname}
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
