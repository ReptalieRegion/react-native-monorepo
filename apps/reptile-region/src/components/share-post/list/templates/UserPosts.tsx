import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { color } from 'design-system';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import UserPostCard from '../organisms/UserPostCard';

import type { FetchDetailUserProfile, FetchDetailUserProfileResponse } from '<api/share/post/user>';
import type { FetchDetailUserPostResponse } from '<api/share/post>';
import type { SharePostListNavigationProps } from '<SharePostComponent>';
import { sharePostQueryKeys } from '@/apis/query-keys';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';

type UserPostsProps = {
    nickname: string;
    startIndex: number;
} & SharePostListNavigationProps;

export default function UserPosts({
    nickname,
    startIndex,
    navigateBottomSheetKebabMenu,
    navigateCommentPage,
    navigateDetailPage,
}: UserPostsProps) {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /** Data 시작 */
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(sharePostQueryKeys.profile(nickname));
    const { data: userPost, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteUserPosts({ nickname });

    const newData = useMemo(() => userPost?.pages.flatMap((page) => page.items), [userPost]);

    const keyExtractor = useCallback((item: FetchDetailUserPostResponse) => item.post.id, []);

    const renderItem = useCallback(
        ({ item, extraData }: ListRenderItemInfo<FetchDetailUserPostResponse>) => {
            const userData = extraData as FetchDetailUserProfileResponse | undefined;

            const post = {
                ...item.post,
                user: {
                    id: userData?.user.id ?? '',
                    nickname: userData?.user.nickname ?? '',
                    profile: userData?.user.profile ?? {
                        src: '',
                    },
                    isFollow: userData?.user.isFollow,
                },
            };

            return (
                <UserPostCard
                    post={post}
                    navigateBottomSheetKebabMenu={navigateBottomSheetKebabMenu}
                    navigateCommentPage={navigateCommentPage}
                    navigateDetailPage={navigateDetailPage}
                />
            );
        },
        [navigateBottomSheetKebabMenu, navigateCommentPage, navigateDetailPage],
    );

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);
    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );
    /** Data 시작 */

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={styles.listContainer}
                data={newData}
                extraData={userProfile}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={onEndReached}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                scrollEventThrottle={16}
                estimatedItemSize={484}
                initialScrollIndex={startIndex}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    listContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
});
