import { TouchableTypo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useCommentActions from '../../hooks/useCommentActions';

import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

type ActionButton = {
    label: string;
    onPress(): void;
};

export type CommentActionButtonsProps = {
    comment: {
        id: string;
        contents: string;
        isMine: boolean;
    };
};

export interface CommentActionButtonsAction {
    onPressUpdateButton?(): void;
    onPressDeleteButton(): void;
    onPressWriteButton(): void;
    onPressDeclarationButton(): void;
}

export default function CommentActionButtons({
    comment,
    onPressDeclarationButton,
    onPressDeleteButton,
    onPressUpdateButton,
    onPressWriteButton,
}: CommentActionButtonsProps & CommentActionButtonsAction) {
    const { registerText, tagTextInputFocus } = useTagHandler();
    const { changeCommentSubmitType } = useCommentActions();
    const actionButtons: ActionButton[] = comment.isMine
        ? [
              {
                  label: '삭제',
                  onPress: onPressDeleteButton,
              },
              {
                  label: '수정',
                  onPress: () => {
                      registerText(comment.contents);
                      changeCommentSubmitType({ id: comment.id, submitType: 'UPDATE' });
                      tagTextInputFocus();
                      onPressUpdateButton?.();
                  },
              },
          ]
        : [
              {
                  label: '댓글 쓰기',
                  onPress: onPressWriteButton,
              },
              {
                  label: '신고 하기',
                  onPress: onPressDeclarationButton,
              },
          ];

    return (
        <View style={styles.container}>
            {actionButtons.map((actionButton, index) => (
                <TouchableTypo key={index} variant="body4" color="placeholder" onPress={actionButton.onPress}>
                    {actionButton.label}
                </TouchableTypo>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
