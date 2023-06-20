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
    TouchableOpacity,
    Keyboard,
} from 'react-native';

type TSelectionInfo = {
    start: number;
    end: number;
};

const MAX_CHARACTER_COUNT = 500;

const WritingComponent = () => {
    const { scrollIntoViewTextInput, isScrolling } = useContext(ScrollContext);
    const textInputRef = useRef<TextInput>(null);
    const [text, setText] = useState<string>('');
    const [textInputHeight, setTextInputHeight] = useState<number>(200);
    const selectionRef = useRef<TSelectionInfo>({ start: 0, end: 0 });

    useEffect(() => {
        const scrollIntoViewEvent = Keyboard.addListener('keyboardWillShow', () => {
            scrollIntoViewTextInput(textInputRef);
        });

        return () => {
            scrollIntoViewEvent.remove();
        };
    }, [scrollIntoViewTextInput, isScrolling]);

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
        setTextInputHeight(Math.max(200, height + 50));
        handleScrollBottom();
    };

    const handleScrollBottom = () => {
        scrollIntoViewTextInput(textInputRef);
    };

    const handleTextInputFocus = () => {
        if (!isScrolling) {
            textInputRef.current?.focus();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} onPress={handleTextInputFocus}>
                <TextInput
                    pointerEvents="none"
                    ref={textInputRef}
                    style={[styles.textarea, { height: textInputHeight }]}
                    placeholder="일상을 공유해 주세요."
                    value={text}
                    multiline={true}
                    maxLength={MAX_CHARACTER_COUNT}
                    onKeyPress={handleKeyPress}
                    onChangeText={handleTextChange}
                    onSelectionChange={handleSelectionChange}
                    onContentSizeChange={handleContentSizeChange}
                />
            </TouchableOpacity>
            <View style={styles.characterCountContainer}>
                <Text style={styles.characterCountText}>{`${text.length} / ${MAX_CHARACTER_COUNT}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
    },
    textarea: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 30,
        paddingVertical: 30,
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
