import { TouchableTypo, color } from 'design-system';
import React, { useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { Keyboard } from 'react-native';
import { TagTextInput, useTag, useTagHandler } from 'tag-text-input';

import useComment from '../../hooks/useComment';
import useCommentActions from '../../hooks/useCommentActions';

import { SubmitType } from '<context/share-post/comment>';

export type CommentTextInputProps = {
    onSubmit({ id, submitType, contents }: { id: string; submitType: SubmitType; contents: string }): void;
};

const MAX_CHARACTER_COUNT = 500;

export default function CommentTextInputEditor({ onSubmit }: CommentTextInputProps) {
    const { contents } = useTag();
    const { id, submitType } = useComment();
    const { tagTextInputFocus, changeText } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();

    useEffect(() => {
        const resetSubmitType = () => {
            changeText('');
            setCreateCommentSubmitType();
        };

        const keyboard = Keyboard.addListener('keyboardDidHide', () => {
            if (submitType === 'UPDATE') {
                Alert.alert('계속 작성할까요?', '', [
                    {
                        text: '삭제',
                        onPress: resetSubmitType,
                        style: 'cancel',
                    },
                    {
                        text: '계속 작성',
                        onPress: tagTextInputFocus,
                    },
                ]);
            }
        });

        return () => {
            keyboard.remove();
        };
    }, [submitType, changeText, setCreateCommentSubmitType, tagTextInputFocus]);

    const handleSubmit = () => {
        onSubmit({ id, submitType, contents });
    };

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
}

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
