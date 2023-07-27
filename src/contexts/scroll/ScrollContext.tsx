import React, { RefObject, useRef, useState } from 'react';
import { ReactNode, createContext } from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

interface IScrollContextComponentProps {
    fixedChildren?: {
        renderItem: ReactNode;
        position: {
            bottom?: number | string | undefined;
            top?: number | string | undefined;
            left?: number | string | undefined;
            right?: number | string | undefined;
        };
    };
    children: ReactNode;
}
type ScrollDirectionType = 'UP' | 'DOWN' | '';

interface IScrollContextValue {
    scrollViewRef: RefObject<ScrollView> | null;
    scrollDirection: ScrollDirectionType;
    isScrolling: boolean;
    scrollInfo: IScrollInfo;
    measureTextInputLayoutInScrollView: (ref: RefObject<TextInput>) => Promise<IMeasureLayout>;
    scrollIntoView: (props: TScrollIntoViewProps) => void;
}

type TScrollIntoViewProps = {
    y: number;
    animated?: boolean;
};

interface IMeasureLayout {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface IScrollInfo {
    contentSize: {
        height: number;
        width: number;
    };
    layout: {
        keyboardNonExistsHeight: number;
        keyboardExistsHeight: number;
        height: number;
        width: number;
        x: number;
        y: number;
    };
    contentOffset: {
        y: number;
    };
}

const defaultScrollInfo: IScrollInfo = {
    contentSize: {
        height: 0,
        width: 0,
    },
    layout: {
        keyboardNonExistsHeight: Number.MIN_VALUE,
        keyboardExistsHeight: Number.MAX_VALUE,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    },
    contentOffset: {
        y: 0,
    },
};

const defaultValue: IScrollContextValue = {
    scrollViewRef: null,
    isScrolling: false,
    scrollDirection: '',
    scrollInfo: defaultScrollInfo,
    measureTextInputLayoutInScrollView: () => new Promise((resolve) => resolve({ height: 0, left: 0, top: 0, width: 0 })),
    scrollIntoView: () => {},
};

export const ScrollContext = createContext<IScrollContextValue>(defaultValue);

export const ScrollContextComponent = ({ children, fixedChildren }: IScrollContextComponentProps) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollInfoRef = useRef<IScrollInfo>(defaultScrollInfo);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<'UP' | 'DOWN' | ''>('');

    const handleOnScrollBeginDrag = () => {
        setIsScrolling(true);
    };

    const handleOnScrollEndDrag = () => {
        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    };

    const setScrollInfoContentSize = (width: number, height: number) => {
        scrollInfoRef.current.contentSize = { width, height };
    };

    const setScrollInfoLayout = (event: LayoutChangeEvent) => {
        const { height, width, y, x } = event.nativeEvent.layout;
        const { keyboardExistsHeight, keyboardNonExistsHeight } = scrollInfoRef.current.layout;
        scrollInfoRef.current.layout = {
            keyboardExistsHeight: Math.min(height, keyboardExistsHeight),
            keyboardNonExistsHeight: Math.max(height, keyboardNonExistsHeight),
            height,
            width,
            y,
            x,
        };
    };

    const getScrollDirection = ({ prevY, currentY }: { prevY: number; currentY: number }) => {
        const isUpScroll = currentY - prevY < 0;
        const isDownScroll = currentY - prevY > 0;
        setScrollDirection(isUpScroll ? 'UP' : isDownScroll ? 'DOWN' : '');
    };

    const setContentOffset = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { y } = event.nativeEvent.contentOffset;
        getScrollDirection({ prevY: defaultValue.scrollInfo.contentOffset.y, currentY: y });
        defaultValue.scrollInfo.contentOffset = { y };
    };

    defaultValue.scrollInfo = scrollInfoRef.current;

    defaultValue.measureTextInputLayoutInScrollView = (ref) => {
        return new Promise((resolve, reject) => {
            const textInput = ref.current;
            const scrollView = scrollViewRef.current;
            if (!textInput || !scrollView) {
                reject(new Error('Invalid ref provided'));
                return;
            }

            textInput.measureLayout(
                scrollView.getInnerViewNode(),
                (left, top, width, height) => {
                    resolve({ left, top, width, height });
                },
                () => {
                    reject(new Error('Failed to measure layout'));
                },
            );
        });
    };

    defaultValue.scrollIntoView = ({ y, animated = true }) => {
        scrollViewRef.current?.scrollTo({
            y,
            animated,
        });
    };

    return (
        <ScrollContext.Provider value={{ ...defaultValue, isScrolling, scrollDirection }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.contentContainer}
                ref={scrollViewRef}
                scrollEventThrottle={20}
                onLayout={setScrollInfoLayout}
                onScroll={setContentOffset}
                onContentSizeChange={setScrollInfoContentSize}
                onScrollBeginDrag={handleOnScrollBeginDrag}
                onScrollEndDrag={handleOnScrollEndDrag}
            >
                {children}
            </ScrollView>
            {fixedChildren !== undefined && (
                <View style={[styles.fixedContainer, { ...fixedChildren.position }]}>{fixedChildren.renderItem}</View>
            )}
        </ScrollContext.Provider>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
    },
    fixedContainer: {
        position: 'absolute',
    },
});
