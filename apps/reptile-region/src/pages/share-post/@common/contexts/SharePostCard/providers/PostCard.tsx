import type { ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { HeartAnimationActionsContext, HeartAnimationStateContext } from '../contexts/HeartAnimation';

import { ImageCarousel, useImageCarouselHandler } from '@/components/@common/organisms/ImageCarousel';

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
