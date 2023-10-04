import type { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React, { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { SharePostParamList } from '<RootRoutes>';
import type { SharePostDetailProps } from '<SharePostRoutes>';
import { createNativeStackHeader } from '@/components/@common/molecules';
import SharePostsDetailListSkeleton from '@/components/share/atoms/Suspense/DetailListSkeleton';
import { UserProfile } from '@/components/share/organisms/UserProfile';

type SharePostModalDetailScreenNavigationProp = NativeStackScreenProps<SharePostParamList, 'share-post/modal/detail'>;

const PostDetailList = React.lazy(() => import('@/components/share/organisms/PostDetail'));

export function SharePostDetailModalHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
}

export default function SharePostDetailProfileModal({
    navigation,
    route: { params },
}: SharePostModalDetailScreenNavigationProp) {
    const ListHeaderComponent = useMemo(() => {
        return <UserProfile nickname={params.nickname} profile={params.profile} isFollow={params.isFollow} />;
    }, [params]);

    const handleImagePress = (index: number) => {
        navigation.push('share-post/modal/list/user', { nickname: params.nickname, startIndex: index });
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
                <PostDetailList
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
