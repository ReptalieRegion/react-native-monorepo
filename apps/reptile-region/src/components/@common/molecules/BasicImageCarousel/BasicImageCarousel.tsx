import { FlashList, type FlashListProps } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { ConditionalRenderer } from '../../atoms';

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
        | 'ListEmptyComponent'
    > & {
        ListEmptyComponent: React.ReactNode;
    };
};

interface BasicImageCarouselActions {}

type BasicImageCarouselProps<TData> = BasicImageCarouselState<TData> & BasicImageCarouselActions;

export default function BasicImageCarousel<TData>({
    carouselProps: { gap, offset, width },
    listProps: { ListEmptyComponent, ...restListProps },
}: BasicImageCarouselProps<TData>) {
    const [_, setCurrentIndex] = useState(0);

    const calcCurrentIndex = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
        },
        [width],
    );

    return (
        /**
         * TODO: data없다가 추가 되었을 때, ListEmptyComponent 컴포넌트와 크기가 다르면 렌더링이 안되서 임시 적용
         * https://github.com/Shopify/flash-list/issues/784
         */
        <ConditionalRenderer
            condition={restListProps.data?.length === 0}
            trueContent={ListEmptyComponent ? ListEmptyComponent : null}
            falseContent={
                <FlashList
                    {...restListProps}
                    contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
                    onScroll={calcCurrentIndex}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    snapToAlignment="start"
                    snapToInterval={width + gap}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                />
            }
        />
    );
}
