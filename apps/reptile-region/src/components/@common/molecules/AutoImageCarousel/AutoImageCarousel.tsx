import { useInterval } from '@crawl/react-hooks';
import { useIsFocused } from '@react-navigation/native';
import { FlashList, type FlashListProps } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

type AutoImageCarouselState = {
    cardStyle?: {
        width: number;
        height: number;
    };
    renderIndicator?(currentIndex: number): React.JSX.Element;
};

interface AutoImageCarouselActions {}

type AutoImageCarouselProps<TData> = AutoImageCarouselState & AutoImageCarouselActions & FlashListProps<TData>;

export default function AutoImageCarousel<TData>({
    cardStyle = { width: 400, height: 200 },
    renderIndicator,
    ...props
}: AutoImageCarouselProps<TData>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef<FlashList<TData>>(null);

    const { pause, resume } = useInterval(() => {
        console.log('hi');
        setCurrentIndex((prev) => (prev === (props.data?.length ?? 0) - 1 ? 0 : prev + 1));
    }, 4000);

    const isFocused = useIsFocused();
    const isStopAutoCarousel = props.data?.length === 1;

    useEffect(() => {
        if (!isFocused) {
            pause();
        } else {
            resume();
        }
    }, [isFocused, pause, resume]);

    useEffect(() => {
        if (isStopAutoCarousel) {
            pause();
        }
    }, [isStopAutoCarousel, pause]);

    useEffect(() => {
        ref.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
        });
    }, [currentIndex]);

    const calcCurrentIndex = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / cardStyle.width));
        },
        [cardStyle.width],
    );

    return (
        <View style={styles.wrapper}>
            <FlashList
                ref={ref}
                {...props}
                onTouchStart={pause}
                onTouchEnd={isStopAutoCarousel ? undefined : resume}
                onTouchCancel={isStopAutoCarousel ? undefined : resume}
                estimatedItemSize={cardStyle.width}
                estimatedListSize={cardStyle}
                onMomentumScrollEnd={calcCurrentIndex}
                horizontal
                pagingEnabled
                keyboardShouldPersistTaps={'always'}
                showsHorizontalScrollIndicator={false}
            />
            {renderIndicator?.(currentIndex)}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
});
