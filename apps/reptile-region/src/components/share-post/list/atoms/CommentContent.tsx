import { useNavigation } from '@react-navigation/native';
import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { SharePostListData } from '<SharePostAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';

type CommentContentProps = {
    post: Pick<SharePostListData['post'], 'commentCount' | 'id'>;
};

const CommentContent = ({ post }: CommentContentProps) => {
    const { commentCount } = post;
    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const handleClickComment = () => {
        navigation.push('share-post/bottom-sheet/comment', { screen: 'main', params: { post } });
    };

    if (commentCount === 0) {
        return null;
    }

    return (
        <View style={styles.textTouchArea}>
            <TouchableTypo variant="body2" color="placeholder" onPress={handleClickComment}>
                댓글 {post.commentCount}개 모두 보기
            </TouchableTypo>
        </View>
    );
};

const styles = StyleSheet.create({
    textTouchArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default CommentContent;
