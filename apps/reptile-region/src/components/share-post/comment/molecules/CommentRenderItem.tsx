import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';

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
            <CommentBaseRenderItem showAnimated={showAnimated} user={item.user} comment={item.comment} />
        </Animated.View>
    );
};

export default CommentRenderItem;
