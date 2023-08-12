import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { useInfiniteFetchReplyComments } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';

interface ReplyCommentButtonProps {
    onPress?: (hasNextPage: boolean | undefined) => void;
    props: Pick<SharePostCommentData, 'replyCommentCount' | 'id'>;
}

const ReplyCommentButton = ({ onPress, props: { replyCommentCount, id } }: ReplyCommentButtonProps) => {
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const { isFetching, hasNextPage, fetchNextPage } = useInfiniteFetchReplyComments({
        commentId: id,
        postId: '1',
        enabled: isButtonClicked,
    });

    const handlePress = () => {
        if (hasNextPage) {
            fetchNextPage();
            onPress?.(hasNextPage);
            return;
        }

        if (!isButtonClicked) {
            onPress?.(true);
            setIsButtonClicked(true);
        }
    };

    return replyCommentCount !== 0 ? (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.padding, styles.center]}>
                <View style={styles.border} />
                {isFetching ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.text}>
                        {!isButtonClicked || hasNextPage ? `댓글 ${replyCommentCount}개 보기` : '댓글 숨기기'}
                    </Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    ) : null;
};

const styles = StyleSheet.create({
    padding: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    border: {
        borderColor: color.Gray[700].toString(),
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        width: 30,
    },
    text: {
        fontSize: 12,
        color: color.Gray[700].toString(),
    },
});

export default ReplyCommentButton;
