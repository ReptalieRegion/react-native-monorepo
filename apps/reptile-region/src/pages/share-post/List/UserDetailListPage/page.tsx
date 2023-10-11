import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { color } from 'design-system';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import type { FetchDetailUserProfile, FetchDetailUserProfileResponse } from '<api/share/post/user>';
import type { FetchDetailUserPostResponse } from '<api/share/post>';
import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import { RootRoutesParamList } from '<routes/root>';
import { sharePostQueryKeys } from '@/apis/query-keys';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useSharePostActions from '@/hooks/useSharePostActions';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list/user'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export default function UserDetailListPage({
    navigation,
    route: {
        params: { nickname, startIndex },
    },
}: SharePostListPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /** Data 시작 */
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(sharePostQueryKeys.profile(nickname));
    const { data: userPost, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteUserPosts({ nickname });
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();

    const newData = useMemo(() => userPost?.pages.flatMap((page) => page.items), [userPost]);

    const keyExtractor = useCallback((item: FetchDetailUserPostResponse) => item.post.id, []);

    const renderItem = useCallback(
        ({ item, extraData }: ListRenderItemInfo<FetchDetailUserPostResponse>) => {
            const { user } = (extraData as FetchDetailUserProfileResponse | undefined) ?? {
                user: { id: '', nickname: '', profile: { src: '' }, isFollow: undefined },
            };

            const { id: postId, contents, images, isMine } = item.post;
            const post = {
                ...item.post,
                user: {
                    id: user.id,
                    nickname: user.nickname,
                    profile: user.profile,
                    isFollow: user.isFollow,
                },
            };

            const handlePressComment = () => {
                navigation.push('bottom-sheet/comment', {
                    screen: 'main',
                    params: {
                        post: { id: post.id },
                    },
                });
            };

            const handlePressPostOptionsMenu = () => {
                navigation.push('share-post/bottom-sheet/post-options-menu', {
                    post: {
                        id: postId,
                        images,
                        contents,
                        isMine,
                        user: { id: user.id },
                    },
                });
            };

            const handlePressProfile = () => {
                navigation.push('share-post/detail', {
                    isFollow: user.isFollow,
                    nickname: user.nickname,
                    profile: user.profile,
                });
            };

            const handlePressTag = (tag: string) => {
                navigation.push('share-post/detail', { isFollow: undefined, nickname: tag, profile: { src: '' } });
            };

            return (
                <SharePostCard
                    containerStyle={styles.postCardContainer}
                    post={post}
                    onPressHeart={() => handlePressHeart({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => handlePressFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={handlePressComment}
                    onPressPostOptionsMenu={handlePressPostOptionsMenu}
                    onPressProfile={handlePressProfile}
                    onPressTag={handlePressTag}
                />
            );
        },
        [handleDoublePressImageCarousel, handlePressFollow, handlePressHeart, navigation],
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
    postCardContainer: {
        marginTop: 20,
        marginBottom: 20,
        minHeight: 444,
        maxHeight: 444,
    },
});
