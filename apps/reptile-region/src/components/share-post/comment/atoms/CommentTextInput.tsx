import { RouteProp, useRoute } from '@react-navigation/native';
import { color } from 'design-system';
import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { SharePostCommentBottomSheetParamList, SharePostCommentProps, SharePostCommentReplyProps } from '<SharePostRoutes>';
import useCreateComment from '@/apis/share-post/comment/hooks/mutations/useCreateComment';
import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useTagAction from '@/hooks/useTagAction';
import useTagState from '@/hooks/useTagState';

const MAX_CHARACTER_COUNT = 500;

const CommentTextInput = () => {
    const ref = useRef<TextInput>(null);
    const { contents, currentSelection } = useTagState();

    const { handleChangeSelection, handleChangeText } = useTagAction();
    const { name, params } = useRoute<RouteProp<SharePostCommentBottomSheetParamList>>();

    const { mutate: commentMutate } = useCreateComment();
    const { mutate: commentReplyMutate } = useCreateCommentReply();

    const handleSubmit = () => {
        switch (name) {
            case 'main':
                const { post } = params as SharePostCommentProps;
                commentMutate({ contents, postId: post.id });
                break;
            case 'reply':
                const { comment } = params as SharePostCommentReplyProps;
                commentReplyMutate({ contents, commentId: comment.id });
                break;
        }
    };

    return (
        <View style={[styles.bottom]}>
            <View style={styles.textInputContainer}>
                <TextInput
                    selection={currentSelection}
                    ref={ref}
                    value={contents}
                    style={styles.textInput}
                    numberOfLines={4}
                    placeholder="댓글을 입력하세요..."
                    maxLength={MAX_CHARACTER_COUNT}
                    onChangeText={handleChangeText}
                    onSelectionChange={(event) => {
                        handleChangeSelection(event.nativeEvent.selection);
                    }}
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
    circle: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
});

export default CommentTextInput;
