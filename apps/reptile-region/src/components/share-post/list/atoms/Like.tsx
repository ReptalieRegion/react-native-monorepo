import { color } from 'design-system';
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import type { SharePostListData } from '<SharePostAPI>';
import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import { Like_40 as LikeIcon } from '@/assets/icons';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type LikeProps = {
    post: Pick<SharePostListData['post'], 'isLike' | 'id'>;
};

const ANIMATED_DURATION = 140;

const LIKE_INFO = {
    fill: color.Red[500].toString(),
    stroke: color.Red[500].toString(),
};

const UN_LIKE_INFO = {
    fill: color.White.toString(),
    stroke: color.Black.toString(),
};

const makeLikeInfo = (isLike: boolean | undefined) => {
    return isLike ? LIKE_INFO : UN_LIKE_INFO;
};

const Like = ({ post }: LikeProps) => {
    const { id: postId, isLike } = post;

    const createQuery = useCreateLike();
    const updateQuery = useUpdateLike();

    const startLikeAnimation = useSharePostListStore((state) => state.postsOfInfo[postId]?.startLikeAnimation);
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (startLikeAnimation) {
            scale.value = withSequence(
                withTiming(0.7, { duration: ANIMATED_DURATION }),
                withTiming(1.3, { duration: ANIMATED_DURATION }),
                withTiming(1, { duration: ANIMATED_DURATION }),
            );
        }
    }, [scale, startLikeAnimation]);

    const handleLikeClick = () => {
        if (isLike === undefined) {
            createQuery.mutate({ postId });
        } else {
            updateQuery.mutate({ postId });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleLikeClick}>
            <Animated.View style={animatedStyle}>
                <LikeIcon {...makeLikeInfo(isLike)} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default Like;
