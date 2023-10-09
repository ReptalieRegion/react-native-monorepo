import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentReplyItem from './components/CommentReplyItem';

import { FetchCommentReplyResponse } from '<api/share/post/comment-reply>';
import { RootRoutesParamList } from '<RootRoutesV2>';
import { SharePostCommentParamList } from '<routes/bottom-tab>';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';

type CommentScreenProps = CompositeScreenProps<
    NativeStackScreenProps<SharePostCommentParamList, 'reply'>,
    NativeStackScreenProps<RootRoutesParamList>
>;

export default function CommentReplyList({ navigation, route: { params } }: CommentScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentReplyResponse>>(null);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteCommentReply({
        commentId: params.comment.id,
    });
    const deleteMutate = useDeleteCommentReply();

    const keyExtractor = useCallback((item: FetchCommentReplyResponse) => item.commentReply.id, []);

    const renderItem: ListRenderItem<FetchCommentReplyResponse> = useCallback(
        ({ item }) => {
            const {
                commentReply: {
                    id: commentReplyId,
                    user: { nickname, profile },
                },
            } = item;

            const handleDeleteButton = () => {
                deleteMutate.mutate({ commentReplyId });
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

            const handlePressWriteButton = () => {};

            return (
                <View style={styles.renderItemContainer}>
                    <CommentReplyItem
                        item={item}
                        onPressNickname={handlePressNickname}
                        onPressTag={handlePressTag}
                        onPressDeclarationButton={handlePressDeclarationButton}
                        onPressDeleteButton={handleDeleteButton}
                        onPressUpdateButton={handlePressUpdateButton}
                        onPressWriteButton={handlePressWriteButton}
                    />
                </View>
            );
        },
        [deleteMutate, navigation],
    );

    // TODO
    const ListHeaderComponent = useCallback(() => {
        return (
            <CommentReplyItem
                item={{
                    commentReply: {
                        id: params.comment.id,
                        contents: params.comment.contents,
                        isMine: params.comment.isMine,
                        isModified: params.comment.isModified,
                        user: params.comment.user,
                    },
                }}
                onPressDeclarationButton={() => {}}
                onPressDeleteButton={() => {}}
                onPressNickname={() => {}}
                onPressTag={() => {}}
                onPressUpdateButton={() => {}}
                onPressWriteButton={() => {}}
            />
        );
    }, [params]);

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return (
        <FlashList
            ref={flashListRef}
            data={data?.pages.flatMap((page) => page.items)}
            renderItem={renderItem}
            estimatedItemSize={100}
            scrollEventThrottle={16}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            ListHeaderComponent={ListHeaderComponent}
            ListHeaderComponentStyle={styles.listHeader}
            ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
        />
    );
}

const styles = StyleSheet.create({
    renderItemContainer: {
        paddingLeft: 60,
        paddingRight: 20,
    },
    listHeader: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: color.Gray[100].toString(),
    },
});
