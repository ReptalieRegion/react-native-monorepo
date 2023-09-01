import { FlashList, ListRenderItem, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';
import ReplyCommentButton from '../atoms/ReplyCommentButton';

import ReplyCommentRenderItem from './ReplyCommentRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import type { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';

type FootChildrenProps = {
    comment: Pick<SharePostCommentData['comment'], 'id' | 'replyCount'>;
};

const FootChildren = ({ comment }: FootChildrenProps) => {
    const { data, isFetching, hasNextPage, fetchNextPage, remove } = useInfiniteCommentReply({
        commentId: comment.id,
    });

    const keyExtractor = useCallback((item: SharePostCommentReplyData) => item.comment.id, []);
    const renderItem: ListRenderItem<SharePostCommentReplyData> = useCallback(
        ({ item }) => <ReplyCommentRenderItem {...item} />,
        [],
    );
    const newData = data?.pages.flatMap((page) => page.items);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [remove, comment.id]);

    const onPressReplyButton = () => {
        fetchNextPage();
    };

    return (
        <>
            <View style={footChildrenStyles.container}>
                <FlashList keyExtractor={keyExtractor} data={newData} renderItem={renderItem} estimatedItemSize={200} />
            </View>
            <ReplyCommentButton
                comment={{ replyCount: comment.replyCount - (newData?.length ?? 0) }}
                onPress={onPressReplyButton}
                isFetching={isFetching}
                isHideComment={!hasNextPage && !!data}
            />
        </>
    );
};

const footChildrenStyles = StyleSheet.create({
    container: {
        minHeight: 2,
    },
});

type CommentRenderItemProps = ListRenderItemInfo<SharePostCommentData> & { isAlreadyRenderItem: boolean };

const CommentRenderItem = ({ item, index, isAlreadyRenderItem }: CommentRenderItemProps) => {
    const opacity = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

    const showAnimated = !isAlreadyRenderItem && (index < 5 || index % 10 < 2);
    if (showAnimated) {
        opacity.value = 0;
    }

    useEffect(() => {
        if (showAnimated) {
            opacity.value = withSpring(1);
        }
    }, [opacity, showAnimated, item.comment.id]);

    return (
        <Animated.View style={animatedStyle}>
            <CommentBaseRenderItem
                showAnimated={showAnimated}
                user={item.user}
                comment={item.comment}
                FootChildren={<FootChildren comment={{ id: item.comment.id, replyCount: item.comment.replyCount }} />}
            />
        </Animated.View>
    );
};

export default CommentRenderItem;
