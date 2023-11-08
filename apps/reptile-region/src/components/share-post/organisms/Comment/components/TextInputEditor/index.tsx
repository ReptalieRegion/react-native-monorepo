import { TouchableTypo, color } from '@reptile-region/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Keyboard, StyleSheet, View, useWindowDimensions } from 'react-native';

import type { SubmitType } from '../../contexts/CommentContext';
import useComment from '../../hooks/useComment';
import useCommentActions from '../../hooks/useCommentActions';

import { ConditionalRenderer } from '@/components/@common/atoms';
import { TagTextInput, useTag, useTagHandler } from '@/components/@common/organisms/TagTextInput';
import { POST_MAX_CONTENT_LENGTH } from '@/env/constants';

export type CommentTextInputProps = {
    isLoadingSubmit: boolean;
};

export interface CommentTextInputActions {
    onSubmit({ id, submitType, contents }: { id: string; submitType: SubmitType; contents: string }): void;
}

export default function CommentTextInputEditor({ isLoadingSubmit, onSubmit }: CommentTextInputProps & CommentTextInputActions) {
    const { width } = useWindowDimensions();
    const { contents, selection } = useTag();
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
        <View style={[styles.bottom, { width }]}>
            <View style={[styles.textInputContainer, { width: (width - 30 - 20) * 0.85 }]}>
                <TagTextInput
                    value={contents}
                    defaultValue={contents}
                    selection={selection}
                    style={styles.textInput}
                    placeholder="댓글을 입력하세요..."
                    maxLength={POST_MAX_CONTENT_LENGTH}
                    multiline
                />
                <View style={styles.submitButtonContainer}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: color.White.toString(),
        padding: 8,
        borderTopColor: color.Gray[250].toString(),
        borderTopWidth: 0.5,
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
        borderColor: color.Gray[250].toString(),
        borderWidth: 0.5,
        borderRadius: 12,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        padding: 0,
        fontSize: 14,
        maxHeight: 84,
    },
    submitButtonContainer: {
        height: 20,
    },
});
