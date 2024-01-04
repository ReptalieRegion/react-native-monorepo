import { TouchableTypo, color } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { ActivityIndicator, Keyboard, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import useComment from '../hooks/useComment';
import useCommentActions from '../hooks/useCommentHandler';
import type { SubmitType } from '../types';

import { ConditionalRenderer } from '@/components/@common/atoms';
import useAlert from '@/components/overlay/Alert/useAlert';
import { TagTextInput, useTag, useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

export type CommentTextInputProps = {
    maxLength: number;
    isLoadingSubmit: boolean;
};

export interface CommentTextInputActions {
    onSubmit({ id, submitType, contents }: { id: string; submitType: SubmitType; contents: string }): void;
}

export default function CommentTextInputEditor({
    maxLength = 500,
    isLoadingSubmit,
    onSubmit,
}: CommentTextInputProps & CommentTextInputActions) {
    const { width } = useWindowDimensions();
    const paddingBottom = useSharedValue(0);
    const animated = useAnimatedStyle(() => ({
        paddingBottom: paddingBottom.value,
    }));
    const { contents, selection } = useTag();
    const { id, submitType } = useComment();
    const { tagTextInputFocus, changeText } = useTagHandler();
    const { setCreateCommentSubmitType } = useCommentActions();
    const openAlert = useAlert();

    useEffect(() => {
        const resetSubmitType = () => {
            changeText('');
            setCreateCommentSubmitType();
        };

        const keyboardShow = Platform.select({
            ios: Keyboard.addListener('keyboardWillShow', () => {
                paddingBottom.value = withSpring(8);
            }),
            android: Keyboard.addListener('keyboardDidShow', () => {
                paddingBottom.value = withTiming(8);
            }),
        });

        const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
            if (submitType === 'UPDATE') {
                openAlert({
                    contents: '수정사항을 삭제할까요?',
                    buttons: [
                        {
                            text: '계속 작성',
                            style: 'cancel',
                            onPress: tagTextInputFocus,
                        },
                        {
                            text: '삭제',
                            onPress: resetSubmitType,
                        },
                    ],
                });
            }
        });

        return () => {
            keyboardHide.remove();
            keyboardShow?.remove();
        };
    }, [submitType, paddingBottom, setCreateCommentSubmitType, tagTextInputFocus, changeText, openAlert]);

    const handleSubmit = () => {
        onSubmit({ id, submitType, contents });
    };

    return (
        <Animated.View style={[styles.bottom, { width }, animated]}>
            <View style={[styles.textInputContainer, { width: (width - 30 - 20) * 0.85 }]}>
                <TagTextInput
                    value={contents}
                    defaultValue={contents}
                    selection={selection}
                    style={styles.textInput}
                    placeholder="댓글을 입력하세요..."
                    maxLength={maxLength}
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
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: color.White.toString(),
        paddingTop: 8,
        paddingHorizontal: 8,
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
