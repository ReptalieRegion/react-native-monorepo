import { ScrollContext } from '@/contexts/scroll/ScrollContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    TextInputKeyPressEventData,
    TextInputSelectionChangeEventData,
    Keyboard,
} from 'react-native';

type TSelectionInfo = {
    start: number;
    end: number;
};

const MAX_CHARACTER_COUNT = 500;

const WritingComponent = () => {
    const { scrollIntoView, isScrolling, scrollInfo } = useContext(ScrollContext);
    const textInputRef = useRef<TextInput>(null);
    const textAreaView = useRef<View>(null);
    const [text, setText] = useState<string>('');
    const [textInputHeight, setTextInputHeight] = useState<number>(200);
    const selectionRef = useRef<TSelectionInfo>({ start: 0, end: 0 });
    const pressOutInfoRef = useRef<{ pageY: number; locationY: number }>({ pageY: 0, locationY: 0 });

    useEffect(() => {
        const scrollIntoViewMountEvent = Keyboard.addListener('keyboardDidShow', async () => {
            const keyboardMetrics = Keyboard.metrics();
            if (!keyboardMetrics) {
                return;
            }
            const { screenY } = keyboardMetrics;
            const { pageY } = pressOutInfoRef.current;
            if (screenY < pageY + 16) {
                const newY = scrollInfo.contentOffset.y + pageY / 2;
                scrollIntoView({ y: newY });
            }
        });

        return () => {
            scrollIntoViewMountEvent.remove();
        };
    }, [scrollInfo, scrollIntoView]);

    const handleTextChange = (inputText: string) => {
        setText(inputText);
    };

    const handleSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        selectionRef.current = event.nativeEvent.selection;
    };

    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const { start, end } = selectionRef.current;
        const { key } = event.nativeEvent;
        if (start === end) {
            return;
        }

        const textSize = text.length;
        if (key.length > 1) {
            const newText = text.slice(0, start) + text.slice(end, textSize);
            setText(newText);
            return;
        }

        const newText = text.slice(0, start) + key + text.slice(end, textSize);
        setText(newText);
        selectionRef.current = { start: textSize, end: textSize };
    };

    const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const { height } = event.nativeEvent.contentSize;
        const minHeight = Math.max(200, height);
        const resizeHeight = minHeight - textInputHeight < 17 ? minHeight + 17 : minHeight;

        setTextInputHeight(resizeHeight);
        if (resizeHeight !== textInputHeight) {
            handleScrollBottom(resizeHeight - textInputHeight);
        }
    };

    const handleScrollBottom = async (addHeight: number) => {
        const newY = scrollInfo.contentOffset.y + addHeight;
        scrollIntoView({ y: newY, animated: false });
    };

    return (
        <View style={styles.container}>
            <View ref={textAreaView} style={[styles.textareaContainer, { height: textInputHeight + 45 }]}>
                <TextInput
                    scrollEnabled={false}
                    editable={!isScrolling}
                    ref={textInputRef}
                    style={[styles.textarea, { height: textInputHeight }]}
                    placeholder="일상을 공유해 주세요."
                    value={text}
                    multiline={true}
                    maxLength={MAX_CHARACTER_COUNT}
                    onPressOut={(event) =>
                        (pressOutInfoRef.current = {
                            pageY: event.nativeEvent.pageY,
                            locationY: event.nativeEvent.locationY,
                        })
                    }
                    onKeyPress={handleKeyPress}
                    onChangeText={handleTextChange}
                    onSelectionChange={handleSelectionChange}
                    onContentSizeChange={handleContentSizeChange}
                />
            </View>
            <View style={styles.characterCountContainer}>
                <Text style={styles.characterCountText}>{`${text.length} / ${MAX_CHARACTER_COUNT}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    textareaContainer: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    textarea: {
        overflow: 'hidden',
    },
    characterCountContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
    },
    characterCountText: {
        fontSize: 12,
        color: 'gray',
    },
});

export default WritingComponent;
