import type { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import React, { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';
import UserProfile from '../UserProfile';

import type { SharePostDetailProps, SharePostFollowProps, SharePostTabParamList } from '<routes/bottom-tab>';
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
        const navigateFollowerPage = ({
            initialRouteName,
            userId,
            followerCount,
            followingCount,
            nickname,
        }: SharePostFollowProps) => {
            navigation.push('share-post/list/follow', {
                initialRouteName,
                userId,
                followerCount,
                followingCount,
                nickname,
            });
        };

        return (
            <UserProfile
                nickname={params.nickname}
                profile={params.profile}
                isFollow={params.isFollow}
                navigateFollowPage={navigateFollowerPage}
            />
        );
    }, [params, navigation]);

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
