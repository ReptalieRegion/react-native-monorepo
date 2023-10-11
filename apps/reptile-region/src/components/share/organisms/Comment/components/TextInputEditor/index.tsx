import { TouchableTypo, color } from 'design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, View } from 'react-native';
import { Keyboard } from 'react-native';

import type { SubmitType } from '../../contexts/CommentContext';
import useComment from '../../hooks/useComment';
import useCommentActions from '../../hooks/useCommentActions';

import { ConditionalRenderer } from '@/components/@common/atoms';
import { TagTextInput, useTag, useTagHandler } from '@/components/@common/organisms/TagTextInput';

export type CommentTextInputProps = {
    isLoadingSubmit: boolean;
};

export interface CommentTextInputActions {
    onSubmit({ id, submitType, contents }: { id: string; submitType: SubmitType; contents: string }): void;
}

const MAX_CHARACTER_COUNT = 500;

export default function CommentTextInputEditor({ isLoadingSubmit, onSubmit }: CommentTextInputProps & CommentTextInputActions) {
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
    }, [submitType, setCreateCommentSubmitType, tagTextInputFocus, changeText]);

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
                <ConditionalRenderer
                    condition={isLoadingSubmit}
                    trueContent={<ActivityIndicator size={'small'} color={color.Green[750].toString()} />}
                    falseContent={
                        <TouchableTypo variant="body2" color="primary" onPress={handleSubmit}>
                            등록
                        </TouchableTypo>
                    }
                />
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
