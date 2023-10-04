import { FlashList } from '@shopify/flash-list';
import { useCallback, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type ScrollDirection = 'UP' | 'DOWN' | 'TOP';

export type ScrollIntoView = (props: { offset: number; animated?: boolean }) => void;

export type ScrollToTop = (animated?: boolean) => void;

const useFlashListScroll = <T>() => {
    const flashListRef = useRef<FlashList<T>>(null);
    const prevScrollYRef = useRef(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('TOP');

    const scrollIntoView: ScrollIntoView = useCallback(({ offset, animated = false }) => {
        flashListRef.current?.scrollToOffset({ offset, animated });
    }, []);

    const scrollToTop: ScrollToTop = useCallback((animated = false) => {
        flashListRef.current?.scrollToOffset({ offset: 0, animated });
        setScrollDirection('TOP');
    }, []);

    const determineScrollDirection = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const prevScrollY = prevScrollYRef.current;
        if (currentScrollY <= 0 || currentScrollY > prevScrollY) {
            setScrollDirection('DOWN');
        } else if (currentScrollY < prevScrollY) {
            setScrollDirection('UP');
        }

        prevScrollYRef.current = currentScrollY;
    }, []);

    return {
        flashListRef,
        scrollDirection,
        scrollToTop,
        scrollIntoView,
        determineScrollDirection,
    };
};

export default useFlashListScroll;
