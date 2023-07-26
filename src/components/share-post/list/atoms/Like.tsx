import React, { useEffect, useState } from 'react';

import { ISharePostsData } from '<SharePostAPI>';
import sharePostListStore from '@/stores/share-post/list';
import Like_40 from '@/assets/icons/Like_40';
import { TouchableOpacity } from 'react-native';
import { color } from '@/components/common/tokens/colors';

type ILikeProps = Pick<ISharePostsData, 'isLike' | 'postId'>;

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

const Like = ({ postId, isLike }: ILikeProps) => {
    const startLikeAnimation = sharePostListStore((state) => state.postsOfInfo[postId]?.startLikeAnimation);
    const [filledLikeColor, setFilledLikeColor] = useState<boolean>(isLike);
    const { fill, stroke } = makeLikeInfo(filledLikeColor);

    useEffect(() => {
        if (startLikeAnimation) {
            setFilledLikeColor(true);
        }
    }, [startLikeAnimation]);

    const handleLikeClick = () => {
        setFilledLikeColor((state) => !state);
    };

    return (
        <TouchableOpacity onPress={handleLikeClick} activeOpacity={1}>
            <Like_40 fill={fill} stroke={stroke} />
        </TouchableOpacity>
    );
};
export default Like;
