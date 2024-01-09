import { color } from '@crawl/design-system';
import { useDebounce } from '@crawl/react-hooks';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import usePostOptionsMenuBottomSheet from '../../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';
import useSharePostNavigation from '../../../@common/hooks/useSharePostNavigation';

import useOtherUserPostListActions from './hooks/useMeUserPostListActions';

import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteFetchMePostList from '@/apis/share-post/post/hooks/queries/useInfiniteFetchMePostList';
import { ListFooterLoading } from '@/components/@common/atoms';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import SharePostCard from '@/pages/share-post/@common/contexts/SharePostCard/SharePostCard';
import type { FetchMePostListResponse, FetchMeProfile } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';
import type { SharePostListMeModalPageScreen } from '@/types/routes/props/share-post/post-list';

export default function MeDetailListModalPage({
    route: {
        params: { startIndex, pageState },
    },
}: SharePostListMeModalPageScreen) {
    const { bottom } = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /** Data 시작 */
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchMeProfile['Response']>(ME_QUERY_KEYS.profile);
    const { data: userPost, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchMePostList();
    const { onlyLike, updateOrCreateFollow, updateOrCreateLike, removePostList } = useOtherUserPostListActions();
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
                    post={post}
                    onPressHeart={() => updateOrCreateLike({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => onlyLike({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => updateOrCreateFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={() => navigateComment({ post: { id: postId } })}
                    onPressPostOptionsMenu={() =>
                        openPostOptionsMenuBottomSheet({
                            post: { id: postId, contents, images, isMine, user: { id: userId, nickname } },
                        })
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
        removePostList();
        await refetch();
        setRefreshing(false);
    }, [refetch, removePostList]);

    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
    /** Data 시작 */

    const handleFirstRender = useDebounce(() => {
        if (isFirstRender) {
            scrollToIndex({ index: startIndex });
            opacity.value = withTiming(1);
            setIsFirstRender(false);
        }
    }, 300);

    const { flashListRef, scrollToIndex } = useFlashListScroll<FetchMePostListResponse>();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const opacity = useSharedValue(0);
    const animatedStyled = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const wrapperStyle = useMemo(() => [styles.container, animatedStyled, { paddingBottom: bottom }], [animatedStyled, bottom]);

    return (
        <Animated.View style={wrapperStyle}>
            <FlashList
                ref={flashListRef}
                data={userPost}
                extraData={userProfile}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={onEndReached}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                scrollEventThrottle={16}
                estimatedItemSize={537}
                initialScrollIndex={startIndex}
                onContentSizeChange={handleFirstRender}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
