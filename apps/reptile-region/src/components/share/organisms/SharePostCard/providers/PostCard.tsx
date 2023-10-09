import { FlashList } from '@shopify/flash-list';
import React, { ReactNode, useRef, useState } from 'react';

import { ImageCarousel, ImageHeart, Interactive } from '../components';
import { HeartAnimationActionsContext, HeartAnimationStateContext } from '../contexts/HeartAnimation';
import { ImageCarouselStateContext } from '../contexts/ImageCarousel';
import { ImageIndicatorActionsContext, ImagesIndicatorStateContext } from '../contexts/ImagesIndicators';

import { ImageType } from '<image>';
import PostContents from '@/components/share/molecules/PostContents';
import PostHeader from '@/components/share/molecules/PostHeader';

type PostCardProps = {
    uuid: string;
    children: ReactNode;
};

export default function PostCard({ children, uuid }: PostCardProps) {
    const lastId = useRef(uuid);
    const [isStartHeartAnimation, setIsStartHeartAnimation] = useState<boolean>(false);
    const [indicatorIndex, setIndicatorIndex] = useState<number>(0);
    const imageCarouselRef = useRef<FlashList<ImageType>>(null);

    if (lastId.current !== uuid) {
        lastId.current = uuid;
        imageCarouselRef.current?.scrollToIndex({ index: 0 });
        setIsStartHeartAnimation(false);
        setIndicatorIndex(0);
    }

    const startHeartAnimation = () => {
        setIsStartHeartAnimation(true);
    };

    const stopHeartAnimation = () => {
        setIsStartHeartAnimation(false);
    };

    const calcIndicatorIndex = (baseWidth: number, width: number) => {
        setIndicatorIndex(Math.round(width / baseWidth));
    };

    return (
        <ImageCarouselStateContext.Provider value={{ imageCarouselRef }}>
            <HeartAnimationActionsContext.Provider value={{ startHeartAnimation, stopHeartAnimation }}>
                <ImageIndicatorActionsContext.Provider value={{ calcIndicatorIndex }}>
                    <HeartAnimationStateContext.Provider value={{ isStartHeartAnimation }}>
                        <ImagesIndicatorStateContext.Provider value={{ indicatorIndex }}>
                            {children}
                        </ImagesIndicatorStateContext.Provider>
                    </HeartAnimationStateContext.Provider>
                </ImageIndicatorActionsContext.Provider>
            </HeartAnimationActionsContext.Provider>
        </ImageCarouselStateContext.Provider>
    );
}

PostCard.Header = PostHeader;

PostCard.ImageCarousel = ImageCarousel;

PostCard.ImageHeart = ImageHeart;

PostCard.Interactive = Interactive;

PostCard.Contents = PostContents;
