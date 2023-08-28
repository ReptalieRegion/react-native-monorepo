import { FlashList, ListRenderItem, ListRenderItemInfo } from '@shopify/flash-list';
import React, { memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';
import ReplyCommentButton from '../atoms/ReplyCommentButton';

import ReplyCommentRenderItem from './ReplyCommentRenderItem';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import { useInfiniteFetchReplyComments } from '@/apis/share-post';

type FootChildrenProps = Pick<SharePostCommentData, 'id' | 'replyCommentCount'>;

const FootChildren = ({ id, replyCommentCount }: FootChildrenProps) => {
    const { data, isFetching, hasNextPage, fetchNextPage, remove } = useInfiniteFetchReplyComments({
        commentId: id,
        postId: '1',
    });

    const keyExtractor = useCallback((item: SharePostCommentReplyData) => item.id, []);
    const renderItem: ListRenderItem<SharePostCommentReplyData> = useCallback(
        ({ item }) => <ReplyCommentRenderItem {...item} />,
        [],
    );
    const newData = data?.pages.flatMap((page) => page.items);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [remove, id]);

    const onPressReplyButton = () => {
        fetchNextPage();
    };

    return (
        <>
            <View style={footChildrenStyles.container}>
                <FlashList keyExtractor={keyExtractor} data={newData} renderItem={renderItem} estimatedItemSize={200} />
            </View>
            <ReplyCommentButton
                props={{ replyCommentCount: replyCommentCount - (newData?.length ?? 0) }}
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

const CommentRenderItem = ({
    item: { contents, writer, tags, id, replyCommentCount },
    index,
    isAlreadyRenderItem,
}: CommentRenderItemProps) => {
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
    }, [opacity, showAnimated, id]);

    return (
        <Animated.View style={animatedStyle}>
            <CommentBaseRenderItem
                showAnimated={showAnimated}
                data={{ id, contents, writer, tags }}
                FootChildren={<FootChildren id={id} replyCommentCount={replyCommentCount} />}
            />
        </Animated.View>
    );
};

export default memo(CommentRenderItem);
