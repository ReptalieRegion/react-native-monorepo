import { color } from 'design-system';
import { TouchableTypo } from 'design-system';
import React, { useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import useTagTextInputStore from '@/stores/share-post/useTagTextInputStore';

type CommentTextInputProps = {
    autoFocus?: boolean;
    onSubmit: (contents: string) => void;
};

const MAX_CHARACTER_COUNT = 500;

const CommentTextInput = ({ onSubmit, autoFocus }: CommentTextInputProps) => {
    const textInputRef = useRef<TextInput>(null);

    const { contents, currentSelection, isFocus, setTextInputFocus, handleChangeSelection, handleChangeText } =
        useTagTextInputStore(
            (state) => ({
                contents: state.contentsInfo.contents,
                currentSelection: state.contentsInfo.selection,
                isFocus: state.isFocus,
                setTextInputFocus: state.setTextInputFocus,
                handleChangeSelection: state.handleChangeSelection,
                handleChangeText: state.handleChangeText,
            }),
            shallow,
        );

    const handleSubmit = useCallback(() => onSubmit(contents), [contents, onSubmit]);

    useEffect(() => {
        const focusTimeout = setTimeout(() => autoFocus && textInputRef.current?.focus(), 500);

        return () => {
            clearTimeout(focusTimeout);
        };
    }, [autoFocus]);

    useEffect(() => {
        if (isFocus) {
            textInputRef.current?.focus();
            setTextInputFocus(false);
        }
    }, [isFocus, setTextInputFocus]);

    return (
        <View style={[styles.bottom]}>
            <View style={styles.textInputContainer}>
                <TextInput
                    ref={textInputRef}
                    selection={currentSelection}
                    value={contents}
                    style={styles.textInput}
                    numberOfLines={4}
                    placeholder="댓글을 입력하세요..."
                    maxLength={MAX_CHARACTER_COUNT}
                    onChangeText={handleChangeText}
                    onSelectionChange={(event) => handleChangeSelection(event.nativeEvent.selection)}
                    multiline
                />
                <TouchableTypo variant="body2" color="primary" onPress={handleSubmit}>
                    등록
                </TouchableTypo>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: color.White.toString(),
        padding: 8,
        borderTopColor: color.Gray[250].toString(),
        borderTopWidth: 0.5,
        width: Dimensions.get('screen').width,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: (Dimensions.get('screen').width - 30 - 20) * 0.85,
        borderColor: color.Gray[250].toString(),
        borderWidth: 0.5,
        borderRadius: 12,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        paddingTop: 0,
        fontSize: 14,
        maxHeight: 84,
    },
});

export default CommentTextInput;
