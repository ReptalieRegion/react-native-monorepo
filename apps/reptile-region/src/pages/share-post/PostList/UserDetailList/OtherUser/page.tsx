import { color } from '@reptile-region/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import type { SharePostUserDetailModalPageScreen, SharePostUserDetailPageScreen } from '../../type';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import { ListFooterLoading } from '@/components/@common/atoms';
import SharePostCard from '@/components/share-post/organisms/SharePostCard/SharePostCard';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import useSharePostNavigation from '@/hooks/share-post/navigation/useSharePostNavigation';
import type { FetchDetailUserPostResponse } from '@/types/apis/share-post/post';
import type { FetchDetailUserProfile, FetchDetailUserProfileResponse } from '@/types/apis/share-post/user';

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
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions({
        type: 'USER_DETAIL',
        nickname,
    });
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostNavigation(pageState);

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
                    containerStyle={styles.postCardContainer}
                    post={post}
                    onPressHeart={() => handlePressHeart({ postId: post.id, isLike: post.isLike })}
                    onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId: post.id, isLike: post.isLike })}
                    onPressFollow={() => handlePressFollow({ userId: post.user.id, isFollow: post.user.isFollow })}
                    onPressComment={() => handlePressComment({ post: { id: post.id } })}
                    onPressPostOptionsMenu={() =>
                        handlePressPostOptionsMenu({
                            post: {
                                id: post.id,
                                contents: post.contents,
                                images: post.images,
                                isMine: post.isMine,
                                user: { id: post.user.id },
                            },
                        })
                    }
                    onPressProfile={() =>
                        handlePressProfile({
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
                estimatedItemSize={594}
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
        minHeight: 594,
        height: 594,
    },
});
