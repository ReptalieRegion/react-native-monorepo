import React, { RefObject, useRef, useState } from 'react';
import { ReactNode, createContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IScrollContextComponentProps {
    children: ReactNode;
}

interface IScrollContextValue {
    scrollViewRef: RefObject<ScrollView> | null;
    isScrolling: boolean;
    scrollIntoViewTextInput: (ref: RefObject<TextInput>) => void;
}

const defaultValue: IScrollContextValue = {
    scrollViewRef: null,
    isScrolling: false,
    scrollIntoViewTextInput: () => {},
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

export const ScrollContext = createContext<IScrollContextValue>(defaultValue);

const ScrollContextComponent = ({ children }: IScrollContextComponentProps) => {
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const handleOnScrollBeginDrag = () => {
        setIsScrolling(true);
    };

    const handleOnScrollEndDrag = () => {
        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    };

    const scrollIntoViewTextInput = (ref: RefObject<TextInput>) => {
        const textInput = ref.current;
        const scrollView = scrollViewRef.current;
        if (textInput && scrollView) {
            textInput.measureLayout(scrollView.getInnerViewNode(), (...measure) => {
                const [, top, , height] = measure;
                scrollView.scrollTo({ y: height - top, animated: false });
            });
        }
    };

    return (
        <ScrollContext.Provider value={{ isScrolling, scrollViewRef, scrollIntoViewTextInput }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={insets.bottom + insets.top + 20}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.contentContainer}
                    ref={scrollViewRef}
                    onScrollBeginDrag={handleOnScrollBeginDrag}
                    onScrollEndDrag={handleOnScrollEndDrag}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </ScrollContext.Provider>
    );
};

export default ScrollContextComponent;
