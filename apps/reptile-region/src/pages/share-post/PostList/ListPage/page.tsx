import { color } from '@crawl/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import usePostOptionsMenuBottomSheet from '../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';

import useInfiniteFetchPosts from './hooks/queries/useInfiniteFetchPosts';
import useSharePostActions from './hooks/useSharePostActions';

import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { FadeInCellRenderComponent, ListFooterLoading } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import { ListEmptyComponent } from '@/components/share-post/organisms/SharePostCard/components';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import useSharePostNavigation from '@/pages/share-post/@common/hooks/useSharePostNavigation';
import type { FetchPostResponse } from '@/types/apis/share-post/post';
import type { SharePostListPageScreen } from '@/types/routes/props/share-post/post-list';

// 일상공유 조회 페이지
export default function PostList({ navigation }: SharePostListPageScreen) {
    // 일상 공유 패칭
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();

    /** Pull To Refresh 시작 */
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const asyncOnRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
    /** Pull To Refresh 끝 */

    /** Floating 관련 액션 시작 */
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { requireAuthNavigation } = useAuthNavigation();

    const handlePressPrimaryFloatingButton = () => {
        requireAuthNavigation(() => {
            navigation.navigate('share-post/modal/posting', {
                screen: 'image-crop',
            });
        });
    };

    // FlashList 스크롤 관련 함수
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<FetchPostResponse>({
        onScrollDown: secondaryIconDownAnimation,
        onScrollUp: secondaryIconUpAnimation,
    });
    /** Floating 관련 액션 끝 */

    const { onlyLike, updateOrCreateFollow, updateOrCreateLike } = useSharePostActions();
    const { navigateComment, handlePressLikeContents, navigateImageThumbnail, handlePressTag } =
        useSharePostNavigation('BOTTOM_TAB');
    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<FetchPostResponse>) => {
            const {
                post: {
                    id: postId,
                    images,
                    contents,
                    isMine,
                    isLike,
                    user: { id: userId, isFollow, nickname, profile },
                },
            } = item;

            return (
                <SharePostCard
                    post={item.post}
                    onPressHeart={() => updateOrCreateLike({ postId, isLike })}
                    onDoublePressImageCarousel={() => onlyLike({ postId, isLike })}
                    onPressFollow={() => updateOrCreateFollow({ userId, isFollow })}
                    onPressComment={() => navigateComment({ post: { id: postId } })}
                    onPressPostOptionsMenu={() =>
                        openPostOptionsMenuBottomSheet({
                            post: { id: postId, contents, images, isMine, user: { id: userId, nickname } },
                        })
                    }
                    onPressProfile={() => navigateImageThumbnail({ user: { isFollow, nickname, profile } })}
                    onPressTag={handlePressTag}
                    onPressLikeContents={() => handlePressLikeContents({ post: { id: postId } })}
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

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                contentContainerStyle={styles.listContainer}
                data={data}
                keyExtractor={(item) => item.post.id}
                renderItem={renderItem}
                estimatedItemSize={400}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={handleEndReached}
                CellRendererComponent={FadeInCellRenderComponent}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                scrollEventThrottle={16}
                onScroll={determineScrollDirection}
            />
            <FloatingActionButtonGroup position={floatingPosition}>
                <FloatingActionButtonGroup.Button
                    name="primary"
                    Icon={PostWriteIcon}
                    iconStyle={primaryIcon}
                    onPress={handlePressPrimaryFloatingButton}
                />
                <FloatingActionButtonGroup.Button
                    name="secondary"
                    Icon={UpArrow}
                    iconStyle={secondaryIcon}
                    onPress={scrollToTop}
                />
            </FloatingActionButtonGroup>
        </View>
    );
}

/** Floating 관련 스타일 시작 */
const floatingPosition = {
    right: 70,
    bottom: 70,
};

const primaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.Teal[150].toString(),
};

const secondaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.White.toString(),
    borderColor: color.Gray[200].toString(),
    borderWidth: 1,
};
/** Floating 관련 스타일 끝 */

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    listContainer: {
        padding: 20,
    },
});
