import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type ScrollDirection = 'UP' | 'DOWN' | 'TOP';

export type ScrollIntoView = (props: { offset: number; animated?: boolean }) => void;

export type ScrollToTop = (animated?: boolean) => void;

export type ScrollToIndex = (params: {
    animated?: boolean | null | undefined;
    index: number;
    viewOffset?: number | undefined;
    viewPosition?: number | undefined;
}) => void;

interface UseFlashListScrollActions {
    onScrollUp?(): void;
    onScrollDown?(): void;
}

type UseFlashListScrollProps = UseFlashListScrollActions;

export default function useFlashListScroll<T>(props?: UseFlashListScrollProps) {
    const flashListRef = useRef<FlashList<T>>(null);
    const prevDirection = useRef<ScrollDirection>('TOP');
    const prevScrollYRef = useRef(0);

    const scrollIntoView: ScrollIntoView = useCallback(({ offset, animated = false }) => {
        flashListRef.current?.scrollToOffset({ offset, animated });
    }, []);

    const scrollToTop: ScrollToTop = useCallback((animated = false) => {
        flashListRef.current?.scrollToOffset({ offset: 0, animated });
    }, []);

    const scrollToIndex: ScrollToIndex = useCallback(({ index, animated, viewOffset, viewPosition }) => {
        flashListRef.current?.scrollToIndex({ index, animated, viewOffset, viewPosition });
    }, []);

    const determineScrollDirection = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (!props?.onScrollDown || !props?.onScrollUp) {
                return;
            }
            const currentScrollY = event.nativeEvent.contentOffset.y;
            const prevScrollY = prevScrollYRef.current;
            if ((currentScrollY <= 0 || currentScrollY > prevScrollY) && prevDirection.current !== 'DOWN') {
                prevDirection.current = 'DOWN';
                props.onScrollDown();
            } else if (currentScrollY < prevScrollY && prevDirection.current !== 'UP') {
                prevDirection.current = 'UP';
                props.onScrollUp();
            }

            prevScrollYRef.current = currentScrollY;
        },
        [props],
    );

    return useMemo(
        () => ({
            flashListRef,
            scrollToTop,
            scrollIntoView,
            scrollToIndex,
            determineScrollDirection,
        }),
        [determineScrollDirection, scrollIntoView, scrollToIndex, scrollToTop],
    );
}
