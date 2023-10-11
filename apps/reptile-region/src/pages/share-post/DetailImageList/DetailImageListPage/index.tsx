import type { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React, { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';
import UserProfile from '../UserProfile';

import type { SharePostDetailProps, SharePostTabParamList } from '<routes/bottom-tab>';
import { createNativeStackHeader } from '@/components/@common/molecules';

type SharePostDetailProfileScreenNavigationProp = NativeStackScreenProps<SharePostTabParamList, 'share-post/detail'>;

const PostImageList = React.lazy(() => import('../PostImageList'));

export function SharePostDetailImageListHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
}

export default function SharePostDetailImageListPage({
    navigation,
    route: { params },
}: SharePostDetailProfileScreenNavigationProp) {
    const ListHeaderComponent = useMemo(() => {
        return <UserProfile nickname={params.nickname} profile={params.profile} isFollow={params.isFollow} />;
    }, [params]);

    const handleImagePress = (index: number) => {
        navigation.push('share-post/list/user', { nickname: params.nickname, startIndex: index });
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