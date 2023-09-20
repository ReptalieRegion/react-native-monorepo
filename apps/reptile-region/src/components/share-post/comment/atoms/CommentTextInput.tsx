import { TouchableTypo, color } from 'design-system';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TagTextInput, useTag } from 'tag-text-input';

type CommentTextInputProps = {
    autoFocus?: boolean;
    onSubmit: (contents: string) => void;
};

const MAX_CHARACTER_COUNT = 500;

const CommentTextInput = ({ onSubmit }: CommentTextInputProps) => {
    const { contents } = useTag();

    const handleSubmit = useCallback(() => onSubmit(contents), [contents, onSubmit]);

    return (
        <View style={[styles.bottom]}>
            <View style={styles.textInputContainer}>
                <TagTextInput
                    value={contents}
                    style={styles.textInput}
                    placeholder="댓글을 입력하세요..."
                    maxLength={MAX_CHARACTER_COUNT}
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
