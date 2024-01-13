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

import useOtherUserPostListActions from './hooks/useOtherUserPostListActions';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import SharePostCard from '@/pages/share-post/@common/contexts/SharePostCard/SharePostCard';
import type { FetchDetailUserPostResponse } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfile, FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';
import type {
    SharePostUserDetailModalPageScreen,
    SharePostUserDetailPageScreen,
} from '@/types/routes/props/share-post/post-list';

export default function UserDetailListPage({
    route: {
        params: {
            user: { nickname },
            startIndex,
            pageState,
        },
    },
}: SharePostUserDetailModalPageScreen | SharePostUserDetailPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(
        SHARE_POST_QUERY_KEYS.profileDetail(nickname),
    );
    const { data: userPost, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteUserPosts({ nickname });
    const { onlyLike, updateOrCreateLike, updateOrCreateFollow, removePostList } = useOtherUserPostListActions({ nickname });
    const { navigateComment, handlePressLikeContents, navigateImageThumbnail, handlePressTag } =
        useSharePostNavigation(pageState);
    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    const keyExtractor = (item: FetchDetailUserPostResponse) => item.post.id;

    const renderItem = useCallback(
        ({ item, extraData }: ListRenderItemInfo<FetchDetailUserPostResponse>) => {
            const { user } = (extraData as FetchDetailUserProfileResponse | undefined) ?? {
                user: { id: '', nickname: '', profile: { src: '' }, isFollow: undefined },
            };
            const post = {
                ...item.post,
                showFollowButton: false,
                user: {
                    id: user.id,
                    nickname: user.nickname,
                    profile: user.profile,
                    isFollow: user.isFollow,
                },
            };

            return (
                <SharePostCard
                    post={post}
                    onPressHeart={() => updateOrCreateLike({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => onlyLike({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => updateOrCreateFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={() => navigateComment({ post: { id: post.id } })}
                    onPressPostOptionsMenu={() =>
                        openPostOptionsMenuBottomSheet({
                            post: {
                                id: post.id,
                                contents: post.contents,
                                images: post.images,
                                isMine: post.isMine,
                                user: { id: post.user.id, nickname },
                            },
                        })
                    }
                    onPressProfile={() =>
                        navigateImageThumbnail({
                            user: {
                                isFollow: post.user.isFollow,
                                nickname: post.user.nickname,
                                profile: post.user.profile,
                            },
                        })
                    }
                    onPressLikeContents={() => handlePressLikeContents({ post: { id: post.id } })}
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
            nickname,
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

    const handleFirstRender = useDebounce(() => {
        if (isFirstRender) {
            scrollToIndex({ index: startIndex });
            opacity.value = withTiming(1);
            setIsFirstRender(false);
        }
    }, 300);

    const { flashListRef, scrollToIndex } = useFlashListScroll<FetchDetailUserPostResponse>();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const { bottom } = useSafeAreaInsets();
    const opacity = useSharedValue(0);
    const animatedStyled = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const wrapperStyle = useMemo(
        () => [styles.container, animatedStyled, pageState === 'MODAL' ? { paddingBottom: bottom } : undefined],
        [animatedStyled, bottom, pageState],
    );

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
