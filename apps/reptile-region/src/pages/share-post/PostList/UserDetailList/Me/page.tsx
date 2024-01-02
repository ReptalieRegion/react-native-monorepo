import { color } from '@crawl/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import usePostOptionsMenuBottomSheet from '../../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';
import useSharePostNavigation from '../../../@common/hooks/useSharePostNavigation';

import useOtherUserPostListActions from './hooks/useMeUserPostListActions';

import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteFetchMePostList from '@/apis/share-post/post/hooks/queries/useInfiniteFetchMePostList';
import { ListFooterLoading } from '@/components/@common/atoms';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import type { FetchMePostListResponse, FetchMeProfile } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';
import type { SharePostListMeModalPageScreen } from '@/types/routes/props/share-post/post-list';

export default function MeDetailListModalPage({
    route: {
        params: { startIndex, pageState },
    },
}: SharePostListMeModalPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /** Data 시작 */
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchMeProfile['Response']>(ME_QUERY_KEYS.profile);
    const { data: userPost, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchMePostList();
    const { onlyLike, updateOrCreateFollow, updateOrCreateLike } = useOtherUserPostListActions();
    const { navigateComment, navigateImageThumbnail, handlePressLikeContents, handlePressTag } =
        useSharePostNavigation(pageState);
    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    const keyExtractor = (item: FetchMePostListResponse) => item.post.id;

    const renderItem = useCallback(
        ({ item, extraData }: ListRenderItemInfo<FetchMePostListResponse>) => {
            const {
                user: { id: userId, nickname, profile, isFollow },
            } = (extraData as FetchDetailUserProfileResponse | undefined) ?? {
                user: { id: '', nickname: '', profile: { src: '' }, isFollow: undefined },
            };

            const { id: postId, contents, images, isMine } = item.post;
            const post = {
                ...item.post,
                showFollowButton: false,
                user: {
                    id: userId,
                    nickname,
                    profile,
                    isFollow,
                },
            };

            return (
                <SharePostCard
                    containerStyle={styles.postCardContainer}
                    post={post}
                    onPressHeart={() => updateOrCreateLike({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => onlyLike({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => updateOrCreateFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={() => navigateComment({ post: { id: postId } })}
                    onPressPostOptionsMenu={() =>
                        openPostOptionsMenuBottomSheet({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
                    }
                    onPressProfile={() => navigateImageThumbnail({ user: { isFollow, nickname, profile } })}
                    onPressLikeContents={() => handlePressLikeContents({ post: { id: postId } })}
                    onPressTag={handlePressTag}
                />
            );
        },
        [
            handlePressTag,
            updateOrCreateLike,
            onlyLike,
            updateOrCreateFollow,
            navigateComment,
            openPostOptionsMenuBottomSheet,
            navigateImageThumbnail,
            handlePressLikeContents,
        ],
    );

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
    /** Data 시작 */

    const { flashListRef, scrollToIndex } = useFlashListScroll<FetchMePostListResponse>();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const opacity = useSharedValue(0);
    const animatedStyled = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, animatedStyled]}>
                <FlashList
                    ref={flashListRef}
                    contentContainerStyle={styles.listContainer}
                    data={userPost}
                    extraData={userProfile}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                    onEndReached={onEndReached}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                    scrollEventThrottle={16}
                    estimatedItemSize={594}
                    initialScrollIndex={startIndex}
                    onContentSizeChange={
                        // TODO 리스트의 특정 인덱스 offset 찾기 임시 적용
                        isFirstRender
                            ? () => {
                                  scrollToIndex({ index: startIndex });
                                  setTimeout(() => {
                                      opacity.value = withTiming(1);
                                      setIsFirstRender(false);
                                  }, 400);
                              }
                            : undefined
                    }
                />
            </Animated.View>
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
    },
});
