import { debounce } from 'lodash-es';
import React, { ReactNode, createContext, useRef, useState, useCallback, useMemo, useContext } from 'react';
import { FlatListProps, NativeScrollEvent, NativeScrollPoint, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { FlatList, NativeViewGestureHandlerProps } from 'react-native-gesture-handler';

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

const FlatListContext = createContext<FlatListContextValue>(defaultValue);

type GestureFlatList<ItemT> = React.PropsWithChildren<
    FlatListProps<ItemT> & React.RefAttributes<FlatList<ItemT>> & NativeViewGestureHandlerProps
>;

type FixedChildren = {
    renderItem: ReactNode;
    position: {
        bottom?: number | string | undefined;
        top?: number | string | undefined;
        left?: number | string | undefined;
        right?: number | string | undefined;
    };
};

interface FlatListContextComponentProps<ItemT> extends GestureFlatList<ItemT> {
    fixedChildren?: FixedChildren;
}

const FlatListComponent = <ItemT extends any>(props: GestureFlatList<ItemT>, ref: React.Ref<FlatList<ItemT>> | undefined) => {
    return <FlatList ref={ref} {...props} />;
};

const MemoizedFlatList = <ItemT extends any>() =>
    React.memo(React.forwardRef<FlatList<ItemT>, FlatListProps<ItemT>>(FlatListComponent));

const FixedChildrenComponent = ({ fixedChildren }: { fixedChildren?: FixedChildren }) => {
    if (fixedChildren === undefined) {
        return null;
    }

    return <View style={[styles.fixedContainer, { ...fixedChildren.position }]}>{fixedChildren.renderItem}</View>;
};

const FlatListContextComponent = <ItemT extends any>({
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    renderItem,
    keyExtractor,
    data,
    contentContainerStyle,
    refreshControl,
    scrollEventThrottle,
    fixedChildren,
    initialNumToRender,
    maxToRenderPerBatch,
    horizontal,
}: FlatListContextComponentProps<ItemT>) => {
    const flatListRef = useRef<FlatList<ItemT>>(null);
    const contentOffsetRef = useRef<NativeScrollPoint>();
    const [horizontalDirection, setHorizontalDirection] = useState<HorizontalDirectionState>('none');
    const [verticalDirection, setVerticalDirection] = useState<VerticalDirectionState>('none');
    const [overScrollingState, setOverScrollingState] = useState<OverScrollingState>('none');
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const MemoizedFlatListComponent = useMemo(() => MemoizedFlatList<ItemT>(), []);

    const scrollIntoView: ScrollIntoView = ({ offset, animated = true }) => {
        flatListRef.current?.scrollToOffset({
            offset,
            animated,
        });
    };

    const calcScrollDirection = useCallback(
        (currentContentOffset: NativeScrollPoint) => {
            if (horizontal) {
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
        [horizontal],
    );

    const calcOverScrollingDirection = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        const isOverScrollingTop = offsetY <= 0;
        const isOverScrollingBottom = offsetY + layoutHeight >= contentHeight;
        setOverScrollingState(isOverScrollingTop ? 'top' : isOverScrollingBottom ? 'bottom' : 'none');
    }, []);

    const scrollStart = useCallback(() => {
        setIsScrolling(true);
    }, []);

    const debouncedScrollEnd = useMemo(
        () =>
            debounce(() => {
                setIsScrolling(false);
            }, 500),
        [], // dependencies 배열
    );

    const scrollEnd = useCallback(debouncedScrollEnd, [debouncedScrollEnd]);

    const handleScrollBeginDrag = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            scrollStart();
            onScrollBeginDrag?.(event);
        },
        [onScrollBeginDrag, scrollStart],
    );

    const handleScrollEndDrag = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            scrollEnd();
            onScrollEndDrag?.(event);
        },
        [onScrollEndDrag, scrollEnd],
    );

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const contentOffset = event.nativeEvent.contentOffset;
            calcScrollDirection(contentOffset);
            calcOverScrollingDirection(event);
            contentOffsetRef.current = contentOffset;
            onScroll?.(event);
        },
        [calcOverScrollingDirection, calcScrollDirection, onScroll],
    );

    return (
        <FlatListContext.Provider
            value={{ horizontalDirection, isScrolling, overScrollingState, scrollIntoView, verticalDirection }}
        >
            <MemoizedFlatListComponent
                ref={flatListRef}
                horizontal={horizontal}
                contentContainerStyle={contentContainerStyle}
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={refreshControl}
                initialNumToRender={initialNumToRender}
                maxToRenderPerBatch={maxToRenderPerBatch}
                scrollEventThrottle={scrollEventThrottle ?? 16}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBeginDrag}
                onScrollEndDrag={handleScrollEndDrag}
            />
            <FixedChildrenComponent fixedChildren={fixedChildren} />
        </FlatListContext.Provider>
    );
};

const styles = StyleSheet.create({
    fixedContainer: {
        position: 'absolute',
    },
});

export const useFlatList = () => {
    return useContext(FlatListContext);
};

export default FlatListContextComponent;
