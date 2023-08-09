import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { SharePostListData } from '<SharePostListAPI>';
import { Like_40 as LikeIcon } from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';
import sharePostListStore from '@/stores/share-post/list';

type LikeProps = Pick<SharePostListData, 'isLike' | 'postId'>;

const likeInfo = {
    fill: color.Red[500].toString(),
    stroke: color.Red[500].toString(),
};

const unLikeInfo = {
    fill: color.White.toString(),
    stroke: color.Black.toString(),
};

const makeLikeInfo = (isLike: boolean) => {
    return isLike ? likeInfo : unLikeInfo;
};

const Like = ({ postId, isLike }: LikeProps) => {
    const startLikeAnimation = sharePostListStore((state) => state.postsOfInfo[postId]?.startLikeAnimation);
    const [filledLikeColor, setFilledLikeColor] = useState<boolean>(isLike);
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const { fill, stroke } = makeLikeInfo(filledLikeColor);

    useEffect(() => {
        if (startLikeAnimation) {
            setFilledLikeColor(true);
            scale.value = withSequence(
                withTiming(0.7, { duration: 140 }),
                withTiming(1.3, { duration: 140 }),
                withTiming(1, { duration: 140 }),
            );
        }
    }, [scale, startLikeAnimation]);

    const handleLikeClick = () => {
        setFilledLikeColor((state) => !state);
    };

    return (
        <TouchableWithoutFeedback onPress={handleLikeClick}>
            <Animated.View style={animatedStyle}>
                <LikeIcon fill={fill} stroke={stroke} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default Like;
