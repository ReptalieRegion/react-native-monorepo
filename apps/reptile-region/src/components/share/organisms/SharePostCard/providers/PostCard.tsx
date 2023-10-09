import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { ImageHeart, Interactive, PostCardImageCarousel } from '../components';
import { HeartAnimationActionsContext, HeartAnimationStateContext } from '../contexts/HeartAnimation';

import useImageCarouselHandler from '@/components/@common/organisms/ImageCarousel/hooks/useImageCarouselHandler';
import ImageCarousel from '@/components/@common/organisms/ImageCarousel/providers/ImageCarousel';
import PostContents from '@/components/share/molecules/PostContents';
import PostHeader from '@/components/share/molecules/PostHeader';

type PostCardProps = {
    uuid: string;
    children: ReactNode;
};

function UseEffectInit({ uuid }: { uuid: string }) {
    const { handleScrollCalcIndicator, scrollIntoView } = useImageCarouselHandler();
    const lastId = useRef(uuid);

    useEffect(() => {
        if (lastId.current !== uuid) {
            lastId.current = uuid;
            scrollIntoView({ offset: 0 });
            handleScrollCalcIndicator({ contentOffsetX: 0, imageWidth: 1 });
        }
    }, [handleScrollCalcIndicator, scrollIntoView, uuid]);

    return null;
}

export default function PostCard({ children, uuid }: PostCardProps) {
    const [isStartHeartAnimation, setIsStartHeartAnimation] = useState<boolean>(false);

    const startHeartAnimation = () => {
        setIsStartHeartAnimation(true);
    };

    const stopHeartAnimation = () => {
        setIsStartHeartAnimation(false);
    };

    return (
        <ImageCarousel>
            <HeartAnimationActionsContext.Provider value={{ startHeartAnimation, stopHeartAnimation }}>
                <HeartAnimationStateContext.Provider value={{ isStartHeartAnimation }}>
                    {children}
                    <UseEffectInit uuid={uuid} />
                </HeartAnimationStateContext.Provider>
            </HeartAnimationActionsContext.Provider>
        </ImageCarousel>
    );
}

PostCard.Header = PostHeader;

PostCard.ImageCarousel = PostCardImageCarousel;

PostCard.ImageHeart = ImageHeart;

PostCard.Interactive = Interactive;

PostCard.Contents = PostContents;
