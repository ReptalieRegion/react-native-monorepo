import { color } from 'design-system';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
    WithTimingConfig,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import type { IconProps } from '<Icon>';
import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import { Like_40 as Like } from '@/assets/icons';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';

type LikeProps = {
    post: {
        id: string;
        isLike: boolean | undefined;
    };
};

type LikeType = 'like' | 'unLike';

type LikeStyle = {
    [key in LikeType]: IconProps;
};

const LIKE_STYLE: LikeStyle = {
    like: {
        fill: color.Red[500].toString(),
        stroke: color.Red[500].toString(),
    },
    unLike: {
        fill: color.White.toString(),
        stroke: color.Black.toString(),
    },
};

const makeLikeInfo = (isLike: boolean | undefined) => {
    const type: LikeType = isLike ? 'like' : 'unLike';
    return LIKE_STYLE[type];
};

const TIMING_CONFIG: WithTimingConfig = { duration: 140 };

export default function LikeIcon({ post: { id: postId, isLike } }: LikeProps) {
    /** 비지니스 로직 시작 */
    const createQuery = useCreateLike();
    const updateQuery = useUpdateLike();

    const handleLikeClick = () => {
        if (isLike === undefined) {
            createQuery.mutate({ postId });
        } else {
            updateQuery.mutate({ postId });
        }
    };
    /** 비지니스 로직 끝 */

    /** UI 애니메이션 로직 시작 */
    const startLikeAnimation = useSharePostListStore((state) => state.postsOfInfo[postId]?.startLikeAnimation);
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (startLikeAnimation) {
            scale.value = withSequence(
                withTiming(0.7, TIMING_CONFIG),
                withTiming(1.3, TIMING_CONFIG),
                withTiming(1, TIMING_CONFIG),
            );
        }
    }, [scale, startLikeAnimation]);

    const likeIconStyle = makeLikeInfo(isLike);
    /** UI 애니메이션 로직 끝 */

    return (
        <TouchableOpacity onPress={handleLikeClick}>
            <Animated.View style={animatedStyle}>
                <Like {...likeIconStyle} />
            </Animated.View>
        </TouchableOpacity>
    );
}
