import { color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import type { SharePostListModalPageScreen } from '../../../type';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import useSharePostNavigation from '@/hooks/share-post/navigation/useSharePostNavigation';
import type { FetchDetailUserPostResponse } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfile, FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';

export default function UserDetailListModalPage({ route: { params } }: SharePostListModalPageScreen) {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    /** Data 시작 */
    const queryClient = useQueryClient();
    const userProfile = queryClient.getQueryData<FetchDetailUserProfile['Response']>(
        SHARE_POST_QUERY_KEYS.profile(params.nickname),
    );
    const {
        data: userPost,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
    } = useInfiniteUserPosts({ nickname: params.nickname });
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostNavigation('MODAL');

    const keyExtractor = (item: FetchDetailUserPostResponse) => item.post.id;

    const renderItem = useCallback(
        ({ item, extraData }: ListRenderItemInfo<FetchDetailUserPostResponse>) => {
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
                    onPressHeart={() => handlePressHeart({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => handlePressFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={() => handlePressComment({ post: { id: postId } })}
                    onPressPostOptionsMenu={() =>
                        handlePressPostOptionsMenu({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
                    }
                    onPressProfile={() => handlePressProfile({ isFollow, nickname, profile })}
                    onPressLikeContents={() => handlePressLikeContents({ postId })}
                    onPressTag={handlePressTag}
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

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
    /** Data 시작 */

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={styles.listContainer}
                data={userPost}
                extraData={userProfile}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={onEndReached}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                scrollEventThrottle={16}
                estimatedItemSize={484}
                initialScrollIndex={params.startIndex}
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
        height: 444,
    },
});
