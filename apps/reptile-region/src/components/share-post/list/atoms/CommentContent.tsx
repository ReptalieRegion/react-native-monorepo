import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { RootStackParamList } from '<RootRoutes>';
import type { SharePostListData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';

type CommentContentProps = {
    post: Pick<SharePostListData['post'], 'commentCount' | 'id'>;
};

const CommentContent = ({ post }: CommentContentProps) => {
    const { commentCount } = post;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>>();

    const handleClickComment = () => {
        navigation.navigate('bottom-tab', {
            screen: 'share-post/comment',
            params: { post },
        });
    };

    if (commentCount === 0) {
        return null;
    }

    return (
        <View style={styles.textTouchArea}>
            <TouchableWithoutFeedback onPress={handleClickComment}>
                <Text style={styles.grayFont}>댓글 {post.commentCount}개 모두 보기</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    textTouchArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    grayFont: {
        color: color.Gray[500].toString(),
    },
});

export default CommentContent;
