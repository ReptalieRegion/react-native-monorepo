import { color, Typo } from '@crawl/design-system';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { useIsMutating } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import * as Progress from 'react-native-progress';

import usePostOptionsMenuBottomSheet from '../../@common/bottom-sheet/PostOptionsMenu/usePostOptionsMenuBottomSheet';

import EmptyPost from './empty';
import useInfiniteFetchPosts from './hooks/queries/useInfiniteFetchPosts';
import useSharePostActions from './hooks/useSharePostActions';

import { SHARE_POST_MUTATION_KEYS } from '@/apis/@utils/query-keys';
import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchPushReadCheck from '@/apis/notification/push/hooks/queries/useFetchPushReadCheck';
import { NotificationIcon, PostWriteIcon, UpArrow } from '@/assets/icons';
import { Avatar, ConditionalRenderer, FadeInCellRenderComponent, ListFooterLoading } from '@/components/@common/atoms';
import FloatingActionButtonGroup from '@/components/@common/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import useFloatingHandler from '@/components/@common/organisms/FloatingActionButtons/hooks/useFloatingHandler';
import withPageHeaderUpdate from '@/components/withPageHeaderUpdate';
import { useAuth } from '@/hooks/auth';
import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import useFlashListScroll from '@/hooks/useFlashListScroll';
import SharePostCard from '@/pages/share-post/@common/contexts/SharePostCard/SharePostCard';
import useSharePostNavigation from '@/pages/share-post/@common/hooks/useSharePostNavigation';
import type { FetchPostResponse } from '@/types/apis/share-post/post';
import type { SharePostListPageScreen } from '@/types/routes/props/share-post/post-list';

// 일상공유 조회 페이지
function PostList({ navigation }: SharePostListPageScreen) {
    // 일상 공유 패칭
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();

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

    const { onlyLike, updateOrCreateFollow, updateOrCreateLike, removePostList } = useSharePostActions();
    const { navigateComment, handlePressLikeContents, navigateImageThumbnail, handlePressTag } =
        useSharePostNavigation('BOTTOM_TAB');

    const openPostOptionsMenuBottomSheet = usePostOptionsMenuBottomSheet();

    /** Pull To Refresh 시작 */
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const asyncOnRefresh = async () => {
        setRefreshing(true);
        removePostList();
        await refetch();
        setRefreshing(false);
    };

    const handleEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();
    /** Pull To Refresh 끝 */

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
            <TopProgress onStartMutating={() => scrollToTop()} />
            <FlashList
                ref={flashListRef}
                data={data}
                keyExtractor={(item) => item.post.id}
                renderItem={renderItem}
                estimatedItemSize={537}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={handleEndReached}
                CellRendererComponent={FadeInCellRenderComponent}
                ListEmptyComponent={EmptyPost}
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

function TopProgress({ onStartMutating }: { onStartMutating: () => void }) {
    const { width } = useWindowDimensions();
    const isMutating = useIsMutating({
        mutationKey: SHARE_POST_MUTATION_KEYS.create,
        exact: true,
    });

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let timers: NodeJS.Timeout[] = [];
        if (isMutating) {
            timers = [
                setTimeout(() => onStartMutating(), 250),
                setTimeout(() => setPercent((prevPercent) => Math.min(prevPercent + Math.random() / 3, 0.8)), 500),
                setTimeout(() => setPercent((prevPercent) => Math.min(prevPercent + Math.random() / 3, 0.8)), 1000),
                setTimeout(() => setPercent((prevPercent) => Math.min(prevPercent + Math.random() / 3, 0.8)), 1500),
            ];
        } else {
            if (percent !== 0) {
                timers.map((timer) => clearTimeout(timer));
                setPercent(1);
            }
        }

        return () => {
            timers.map((timer) => clearTimeout(timer));
        };
    }, [isMutating, percent, onStartMutating]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (percent === 1) {
            timer = setTimeout(() => setPercent(0), 500);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [percent]);

    return (
        <ConditionalRenderer
            condition={percent !== 0}
            trueContent={
                <>
                    <View style={progressStyles.container}>
                        <Typo color="placeholder">게시물을 생성중이예요</Typo>
                    </View>
                    <Progress.Bar
                        width={width}
                        height={2}
                        progress={percent}
                        borderWidth={0}
                        color={color.Teal[150].toString()}
                    />
                </>
            }
        />
    );
}

/** Header 변경 HOC */
export default withPageHeaderUpdate<SharePostListPageScreen>(PostList, ({ navigation }) => {
    const { isSignIn } = useAuth();
    const { requireAuthNavigation } = useAuthNavigation();
    const { data: pushRead } = useFetchPushReadCheck();
    const { data: profile } = useFetchMeProfile();

    const handlePressNotification = useCallback(() => {
        requireAuthNavigation(() => {
            navigation.navigate('me/notification-log');
        });
    }, [navigation, requireAuthNavigation]);

    const handlePressProfile = useCallback(() => {
        requireAuthNavigation(() => {
            navigation.navigate('share-post/modal', {
                screen: 'modal/image-thumbnail/me',
            });
        });
    }, [navigation, requireAuthNavigation]);

    useEffect(() => {
        const headerRight = () => {
            return (
                <View style={headerStyles.rightContainer}>
                    <ConditionalRenderer
                        condition={!!isSignIn && pushRead?.isReadAllLog !== undefined && !pushRead.isReadAllLog}
                        trueContent={
                            <TouchableOpacity onPress={handlePressNotification}>
                                <View style={headerStyles.container}>
                                    <NotificationIcon />
                                    <View style={headerStyles.circle} />
                                </View>
                            </TouchableOpacity>
                        }
                        falseContent={
                            <TouchableOpacity onPress={handlePressNotification}>
                                <NotificationIcon />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity onPress={handlePressProfile}>
                        <Avatar image={profile?.user.profile} size={24} />
                    </TouchableOpacity>
                </View>
            );
        };

        navigation.setOptions({ headerRight });
    }, [handlePressNotification, handlePressProfile, isSignIn, navigation, profile?.user, pushRead?.isReadAllLog]);

    return null;
});

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
});

const progressStyles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});

const headerStyles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    rightContainer: {
        flexDirection: 'row',
        gap: 20,
        flex: 1,
    },
    circle: {
        backgroundColor: color.Red[500].toString(),
        position: 'absolute',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: color.White.toString(),
        height: 8,
        width: 8,
        top: 0,
        right: 1,
    },
});
