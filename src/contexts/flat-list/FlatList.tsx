import { debounce } from 'lodash-es';
import React, { ReactNode, createContext, useRef, useState, useCallback } from 'react';
import { FlatListProps, NativeScrollEvent, NativeScrollPoint, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { FlatList, NativeViewGestureHandlerProps } from 'react-native-gesture-handler';

interface FlatListContextComponentProps<ItemT>
    extends React.PropsWithChildren<
        FlatListProps<ItemT> & React.RefAttributes<FlatList<ItemT>> & NativeViewGestureHandlerProps
    > {
    fixedChildren?: {
        renderItem: ReactNode;
        position: {
            bottom?: number | string | undefined;
            top?: number | string | undefined;
            left?: number | string | undefined;
            right?: number | string | undefined;
        };
    };
}

type HorizontalDirectionState = 'left' | 'right' | 'none';
type VerticalDirectionState = 'top' | 'bottom' | 'none';
type OverScrollingState = 'top' | 'bottom' | 'none';
type ScrollIntoView = ({ offset, animated = true }: { offset: number; animated?: boolean }) => void;

interface FlatListContextValue {
    horizontalDirection: HorizontalDirectionState;
    verticalDirection: VerticalDirectionState;
    overScrollingState: OverScrollingState;
    isScrolling: boolean;
    scrollIntoView: ScrollIntoView;
}

const defaultValue: FlatListContextValue = {
    horizontalDirection: 'none',
    verticalDirection: 'none',
    overScrollingState: 'none',
    isScrolling: false,
    scrollIntoView: () => {},
};

export const FlatListContext = createContext<FlatListContextValue>(defaultValue);

export const FlatListContextComponent = <ItemT = any,>({
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    scrollEventThrottle,
    fixedChildren,
    ...flatRestProps
}: FlatListContextComponentProps<ItemT>) => {
    const flatListRef = useRef<FlatList<ItemT>>(null);
    const contentOffsetRef = useRef<NativeScrollPoint>();
    const [horizontalDirection, setHorizontalDirection] = useState<HorizontalDirectionState>('none');
    const [verticalDirection, setVerticalDirection] = useState<VerticalDirectionState>('none');
    const [overScrollingState, setOverScrollingState] = useState<OverScrollingState>('none');
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const scrollIntoView: ScrollIntoView = ({ offset, animated = true }) => {
        flatListRef.current?.scrollToOffset({
            offset,
            animated,
        });
    };

    const calcScrollDirection = useCallback(
        (currentContentOffset: NativeScrollPoint) => {
            if (flatRestProps.horizontal) {
                const prevX = contentOffsetRef.current?.x ?? 0;
                const currentX = currentContentOffset.x;
                const isLefScroll = currentX - prevX < 0;
                const isRightScroll = currentX - prevX > 0;
                setHorizontalDirection(isLefScroll ? 'left' : isRightScroll ? 'right' : 'none');
            } else {
                const prevTop = contentOffsetRef.current?.y ?? 0;
                const currentY = currentContentOffset.y;
                const isUpScroll = currentY - prevTop < 0;
                const isDownScroll = currentY - prevTop > 0;
                setVerticalDirection(isUpScroll ? 'top' : isDownScroll ? 'bottom' : 'none');
            }
        },
        [flatRestProps.horizontal],
    );

    const calcOverScrollingDirection = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        const isOverScrollingTop = offsetY <= 0;
        const isOverScrollingBottom = offsetY + layoutHeight >= contentHeight;
        setOverScrollingState(isOverScrollingTop ? 'top' : isOverScrollingBottom ? 'bottom' : 'none');
    }, []);

    const scrollStart = () => {
        setIsScrolling(true);
    };

    const scrollEnd = debounce(() => {
        setIsScrolling(false);
    }, 500);

    const handleScrollBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollStart();
        onScrollBeginDrag?.(event);
    };

    const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollEnd();
        onScrollEndDrag?.(event);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset;
        calcScrollDirection(contentOffset);
        calcOverScrollingDirection(event);
        contentOffsetRef.current = contentOffset;
        onScroll?.(event);
    };

    return (
        <FlatListContext.Provider
            value={{ horizontalDirection, verticalDirection, isScrolling, overScrollingState, scrollIntoView }}
        >
            <FlatList
                ref={flatListRef}
                {...flatRestProps}
                scrollEventThrottle={scrollEventThrottle ?? 16}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBeginDrag}
                onScrollEndDrag={handleScrollEndDrag}
            />
            {fixedChildren !== undefined && (
                <View style={[styles.fixedContainer, { ...fixedChildren.position }]}>{fixedChildren.renderItem}</View>
            )}
        </FlatListContext.Provider>
    );
};

const styles = StyleSheet.create({
    fixedContainer: {
        position: 'absolute',
    },
});
