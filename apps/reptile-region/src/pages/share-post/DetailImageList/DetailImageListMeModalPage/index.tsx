import type { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostsDetailListSkeleton from '../loading';

import type { FetchDetailUserPost } from '<api/share/post>';
import type { SharePostDetailProps } from '<routes/bottom-tab>';
import type { SharePostFollowProps, SharePostModalParamList } from '<routes/root>';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import { createNativeStackHeader } from '@/components/@common/molecules';
import UserProfile from '@/components/share-post/molecules/UserProfile/UserProfile';

type SharePostModalDetailScreenNavigationProp = NativeStackScreenProps<SharePostModalParamList, 'detail'>;

const PostImageList = React.lazy(() => import('../OtherUser/PostImageList'));

export function SharePostDetailImageListModalHeader(props: NativeStackHeaderProps) {
    const param = props.route.params as SharePostDetailProps;
    return createNativeStackHeader({ leftIcon: 'back', title: param.nickname })(props);
}

export default function SharePostDetailImageListModalPage(props: SharePostModalDetailScreenNavigationProp) {
    const {
        navigation,
        route: {
            params: { nickname },
        },
    } = props;
    const handleImagePress = (index: number) => {
        navigation.push('list/user', { nickname, startIndex: index });
    };

    return (
        <View style={styles.container}>
            <Suspense
                fallback={
                    <>
                        <ListHeaderComponent {...props} />
                        <SharePostsDetailListSkeleton />
                    </>
                }
            >
                <PostImageList
                    nickname={nickname}
                    ListHeaderComponent={<ListHeaderComponent {...props} />}
                    handleImagePress={handleImagePress}
                />
            </Suspense>
        </View>
    );
}

function ListHeaderComponent({
    navigation,
    route: {
        params: { isFollow, nickname, profile },
    },
}: SharePostModalDetailScreenNavigationProp) {
    const navigateFollowerPage = (params: SharePostFollowProps) => {
        navigation.push('share-post/list/follow', params);
    };

    const { data } = useFetchUserProfile({ nickname });
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData<InfiniteData<FetchDetailUserPost['Response']>>(
        SHARE_POST_QUERY_KEYS.detailUserPosts(nickname),
    );

    const defaultData = {
        user: {
            id: '',
            nickname,
            profile,
            isFollow,
            followerCount: 0,
            followingCount: 0,
        },
        postCount: 0,
    };

    const newData = {
        user: {
            ...defaultData.user,
            ...data?.user,
            isFollow: data?.user.isFollow,
        },
        postCount: post?.pages.reduce((prev, page) => prev + page.items.length, 0) ?? 0,
    };

    return <UserProfile navigateFollowPage={navigateFollowerPage} user={newData.user} postCount={newData.postCount} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
