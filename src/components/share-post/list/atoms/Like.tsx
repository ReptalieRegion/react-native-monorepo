import React, { useEffect, useRef, useState } from 'react';

import { SharePostsData } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';
import Like_40 from '@/assets/icons/Like_40';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { color } from '@/components/common/tokens/colors';

type LikeProps = Pick<SharePostsData, 'isLike' | 'postId'>;

const likeInfo = {
    fill: color.Red[500].toString(),
    stroke: color.Red[500].toString(),
};

const unLikeInfo = {
    fill: color.White[50].toString(),
    stroke: color.Black[50].toString(),
};

const makeLikeInfo = (isLike: boolean) => {
    return isLike ? likeInfo : unLikeInfo;
};

const Like = ({ postId, isLike }: LikeProps) => {
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const startLikeAnimation = sharePostListStore((state) => state.postsOfInfo[postId]?.startLikeAnimation);
    const [filledLikeColor, setFilledLikeColor] = useState<boolean>(isLike);
    const { fill, stroke } = makeLikeInfo(filledLikeColor);

    useEffect(() => {
        if (startLikeAnimation) {
            setFilledLikeColor(true);
            Animated.sequence([
                Animated.timing(scaleAnimation, {
                    toValue: 0.7,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 1.3,
                    duration: 140,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 1,
                    duration: 140,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 1,
                    duration: 420,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [scaleAnimation, startLikeAnimation]);

    const handleLikeClick = () => {
        setFilledLikeColor((state) => !state);
    };

    return (
        <TouchableWithoutFeedback onPress={handleLikeClick}>
            <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
                <Like_40 fill={fill} stroke={stroke} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};
export default Like;
