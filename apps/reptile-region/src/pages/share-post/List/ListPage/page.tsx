import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import type { FetchPostResponse } from '<api/share/post>';
import type { BottomTabNativeStackParamList, SharePostTabParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import useInfiniteFetchPosts from '@/apis/share-post/post/hooks/queries/useInfiniteFetchPosts';
import { PostWriteIcon, UpArrow } from '@/assets/icons';
import { FadeInCellRenderComponent, ListFooterLoading } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useFloatingHandler from '@/components/share-post/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import useSharePostActions from '@/hooks/useSharePostActions';

type SharePostListPageScreen = CompositeScreenProps<
    NativeStackScreenProps<SharePostTabParamList, 'share-post/list'>,
    CompositeScreenProps<NativeStackScreenProps<BottomTabNativeStackParamList>, NativeStackScreenProps<RootRoutesParamList>>
>;

export default function PostList({ navigation }: SharePostListPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { secondaryIconDownAnimation, secondaryIconUpAnimation } = useFloatingHandler();
    const { flashListRef, determineScrollDirection, scrollToTop } = useFlashListScroll<FetchPostResponse>({
        onScrollDown: secondaryIconDownAnimation,
        onScrollUp: secondaryIconUpAnimation,
    });
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();

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

            const handlePressComment = () => {
                navigation.push('bottom-sheet/comment', {
                    screen: 'main',
                    params: {
                        post: { id: postId },
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
                        user: { id: userId },
                    },
                });
            };

            const handlePressProfile = () => {
                navigation.push('share-post/detail', { isFollow, nickname, profile });
            };

            const handlePressTag = (tag: string) => {
                navigation.push('share-post/detail', { isFollow: undefined, nickname: tag, profile: { src: '' } });
            };

            return (
                <SharePostCard
                    post={item.post}
                    onPressHeart={() => handlePressHeart({ postId, isLike })}
                    onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId, isLike })}
                    onPressFollow={() => handlePressFollow({ userId, isFollow })}
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

    const handleEndReached = () => {
        hasNextPage && !isFetchingNextPage && fetchNextPage();
    };

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
