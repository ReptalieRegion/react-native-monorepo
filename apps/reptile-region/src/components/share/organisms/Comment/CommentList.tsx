import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContentStyle, FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';

import CommentItem from './components/CommentItem';

import { FetchCommentResponse } from '<api/share/post/comment>';
import { RootRoutesParamList } from '<RootRoutesV2>';
import { SharePostCommentParamList } from '<routes/bottom-tab>';
import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'main'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function CommentList({ navigation, route: { params } }: CommentScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentResponse>>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteComment({ postId: params.post.id });
    const deleteMutate = useDeleteComment();

    const renderItem: ListRenderItem<FetchCommentResponse> = useCallback(
        ({ item }) => {
            const {
                comment: {
                    id: commentId,
                    contents,
                    isMine,
                    isModified,
                    user: { id: userId, nickname, profile },
                },
            } = item;

            const handleDeleteButton = () => {
                deleteMutate.mutate({ commentId });
            };

            const handlePressDeclarationButton = () => {};

            const handlePressUpdateButton = () => {};

            const handlePressNickname = () => {
                navigation.push('share-post/modal', {
                    screen: 'detail',
                    params: { nickname, profile, isFollow: false },
                });
            };

            const handlePressTag = () => {
                navigation.push('share-post/modal', {
                    screen: 'detail',
                    params: { nickname, profile, isFollow: false },
                });
            };

            const handlePressWriteButton = () => {
                navigation.push('reply', {
                    comment: {
                        id: commentId,
                        contents,
                        isMine,
                        isModified,
                        user: { id: userId, profile, nickname },
                    },
                    isFocus: false,
                });
            };

            const handlePressShowCommentReplyButton = () => {
                navigation.push('reply', {
                    comment: {
                        id: commentId,
                        contents,
                        isMine,
                        isModified,
                        user: { id: userId, profile, nickname },
                    },
                    isFocus: true,
                });
            };

            return (
                <CommentItem
                    item={item}
                    onPressNickname={handlePressNickname}
                    onPressTag={handlePressTag}
                    onPressDeclarationButton={handlePressDeclarationButton}
                    onPressDeleteButton={handleDeleteButton}
                    onPressUpdateButton={handlePressUpdateButton}
                    onPressWriteButton={handlePressWriteButton}
                    onPressShowCommentReplyButton={handlePressShowCommentReplyButton}
                />
            );
        },
        [deleteMutate, navigation],
    );

    const keyExtractor = useCallback((item: FetchCommentResponse) => item.comment.id, []);

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    return (
        <FlashList
            ref={flashListRef}
            contentContainerStyle={contentContainerStyle}
            data={data?.pages.flatMap((page) => page.items)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
            renderItem={renderItem}
            estimatedItemSize={100}
            scrollEventThrottle={16}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
        />
    );
}

const contentContainerStyle: ContentStyle = { paddingLeft: 20, paddingRight: 20 };
