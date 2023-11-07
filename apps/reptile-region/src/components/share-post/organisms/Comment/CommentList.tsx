import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';

import CommentItem from './components/CommentItem';

import type { FetchCommentResponse } from '<api/share/post/comment>';
import type { SharePostCommentParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
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
                Alert.alert('정말로 삭제 하시겠어요?', '', [
                    {
                        text: '취소',
                        style: 'cancel',
                        onPress: () => {},
                    },
                    {
                        text: '삭제',
                        onPress: () => deleteMutate.mutate({ commentId }),
                    },
                ]);
            };

            // TODO 신고하기
            const handlePressDeclarationButton = () => {};

            // TODO 수정하기
            const handlePressUpdateButton = () => {};

            const navigateDetailPage = () => {
                navigation.push('share-post/modal', {
                    screen: 'detail',
                    params: { nickname, profile, isFollow: false },
                });
            };

            const navigateCommentReplyPage = () => {
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

            return (
                <CommentItem
                    item={item}
                    onPressNickname={navigateDetailPage}
                    onPressTag={navigateDetailPage}
                    onPressDeclarationButton={handlePressDeclarationButton}
                    onPressDeleteButton={handleDeleteButton}
                    onPressUpdateButton={handlePressUpdateButton}
                    onPressWriteButton={navigateCommentReplyPage}
                    onPressShowCommentReplyButton={navigateCommentReplyPage}
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
