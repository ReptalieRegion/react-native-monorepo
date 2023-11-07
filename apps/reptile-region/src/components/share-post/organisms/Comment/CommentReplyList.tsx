import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import CommentReplyItem from './components/CommentReplyItem';

import type { FetchCommentReplyResponse } from '<api/share/post/comment-reply>';
import type { SharePostCommentParamList } from '<routes/bottom-tab>';
import type { RootRoutesParamList } from '<routes/root>';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

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
    const { changeText, tagTextInputFocus } = useTagHandler();

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
                Alert.alert('정말로 삭제 하시겠어요?', '', [
                    {
                        text: '취소',
                        style: 'cancel',
                        onPress: () => {},
                    },
                    {
                        text: '삭제',
                        onPress: () => deleteMutate.mutate({ commentReplyId }),
                    },
                ]);
            };

            const handlePressDeclarationButton = () => {};

            const handlePressUpdateButton = () => {};

            const navigateDetailPage = () => {
                navigation.push('share-post/modal', {
                    screen: 'detail',
                    params: { nickname, profile, isFollow: false },
                });
            };

            const handlePressWriteButton = () => {
                changeText(`@${nickname} `);
                tagTextInputFocus();
            };

            return (
                <View style={styles.renderItemContainer}>
                    <CommentReplyItem
                        item={item}
                        onPressNickname={navigateDetailPage}
                        onPressTag={navigateDetailPage}
                        onPressDeclarationButton={handlePressDeclarationButton}
                        onPressDeleteButton={handleDeleteButton}
                        onPressUpdateButton={handlePressUpdateButton}
                        onPressWriteButton={handlePressWriteButton}
                    />
                </View>
            );
        },
        [deleteMutate, navigation, changeText, tagTextInputFocus],
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
                onPressDeleteButton={tagTextInputFocus}
                onPressNickname={() => {}}
                onPressTag={() => {}}
                onPressUpdateButton={() => {}}
                onPressWriteButton={() => {}}
            />
        );
    }, [
        params.comment.contents,
        params.comment.id,
        params.comment.isMine,
        params.comment.isModified,
        params.comment.user,
        tagTextInputFocus,
    ]);

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
