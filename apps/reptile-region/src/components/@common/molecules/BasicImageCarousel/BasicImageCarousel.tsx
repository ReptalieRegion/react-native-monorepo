import { FlashList, type FlashListProps } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

type BasicImageCarouselState<TData> = {
    carouselProps: {
        offset: number;
        gap: number;
        width: number;
    };
    listProps: Omit<
        FlashListProps<TData>,
        | 'automaticallyAdjustContentInsets'
        | 'contentContainerStyle'
        | 'decelerationRate'
        | 'horizontal'
        | 'pagingEnabled'
        | 'snapToInterval'
        | 'snapToAlignment'
        | 'showsHorizontalScrollIndicator'
    >;
};

interface BasicImageCarouselActions {}

type BasicImageCarouselProps<TData> = BasicImageCarouselState<TData> & BasicImageCarouselActions;

export default function BasicImageCarousel<TData>({
    carouselProps: { gap, offset, width },
    listProps,
}: BasicImageCarouselProps<TData>) {
    const [_, setCurrentIndex] = useState(0);

    const calcCurrentIndex = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
        },
        [width],
    );

    return (
        <FlashList
            {...listProps}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
            onScroll={calcCurrentIndex}
            decelerationRate="fast"
            horizontal
            pagingEnabled
            snapToInterval={width + gap}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
        />
    );
}
