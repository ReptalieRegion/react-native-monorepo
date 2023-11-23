import { color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import type { SharePostListPageScreen } from './type';

import type { FetchPostResponse } from '<api/share/post>';
import useInfiniteFetchPosts from '@/apis/share-post/post/hooks/queries/useInfiniteFetchPosts';
import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { FadeInCellRenderComponent, ListFooterLoading } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import { ListEmptyComponent } from '@/components/share-post/organisms/SharePostCard/components';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import useSharePostNavigation from '@/hooks/share-post/navigation/useSharePostNavigation';
import useFlashListScroll from '@/hooks/useFlashListScroll';

export default function PostList({ navigation }: SharePostListPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<FetchPostResponse>({
        onScrollDown: secondaryIconDownAnimation,
        onScrollUp: secondaryIconUpAnimation,
    });
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostNavigation();

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
                    onPressHeart={() => handlePressHeart({ postId, isLike })}
                    onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId, isLike })}
                    onPressFollow={() => handlePressFollow({ userId, isFollow })}
                    onPressComment={() => handlePressComment({ post: { id: postId } })}
                    onPressPostOptionsMenu={() =>
                        handlePressPostOptionsMenu({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
                    }
                    onPressProfile={() => handlePressProfile({ isFollow, nickname, profile })}
                    onPressTag={handlePressTag}
                    onPressLikeContents={() => handlePressLikeContents({ postId })}
                />
            );
        },
        [
            handleDoublePressImageCarousel,
            handlePressComment,
            handlePressFollow,
            handlePressHeart,
            handlePressLikeContents,
            handlePressPostOptionsMenu,
            handlePressProfile,
            handlePressTag,
        ],
    );

    const asyncOnRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

    const handlePressPrimaryFloatingButton = useCallback(() => {
        navigation.navigate('share-post/modal/posting', {
            screen: 'image-crop',
        });
    }, [navigation]);

    const handlePressSecondaryFloatingButton = useCallback(() => {
        scrollToTop();
    }, [scrollToTop]);

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                contentContainerStyle={styles.listContainer}
                data={useMemo(() => data?.pages.flatMap((page) => page.items), [data])}
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
            <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
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
                    onPress={handlePressSecondaryFloatingButton}
                />
            </FloatingActionButtonGroup>
        </View>
    );
}

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
