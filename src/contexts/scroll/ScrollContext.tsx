import React, { RefObject, useRef, useState } from 'react';
import { ReactNode, createContext } from 'react';
import {
    KeyboardAvoidingView,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IScrollContextComponentProps {
    children: ReactNode;
}

interface IScrollContextValue {
    scrollViewRef: RefObject<ScrollView> | null;
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
    scrollInfo: defaultScrollInfo,
    measureTextInputLayoutInScrollView: () => new Promise((resolve) => resolve({ height: 0, left: 0, top: 0, width: 0 })),
    scrollIntoView: () => {},
};

export const ScrollContext = createContext<IScrollContextValue>(defaultValue);

const ScrollContextComponent = ({ children }: IScrollContextComponentProps) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollInfoRef = useRef<IScrollInfo>(defaultScrollInfo);
    const insets = useSafeAreaInsets();
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

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

    const setContentOffset = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { y } = event.nativeEvent.contentOffset;
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
        <ScrollContext.Provider value={{ ...defaultValue, isScrolling }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={insets.bottom + insets.top + 20}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.contentContainer}
                    ref={scrollViewRef}
                    scrollEventThrottle={16}
                    onLayout={setScrollInfoLayout}
                    onScroll={setContentOffset}
                    onContentSizeChange={setScrollInfoContentSize}
                    onScrollBeginDrag={handleOnScrollBeginDrag}
                    onScrollEndDrag={handleOnScrollEndDrag}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </ScrollContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        flexGrow: 1,
    },
});

export default ScrollContextComponent;
