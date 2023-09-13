import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { SharePostListData } from '<SharePostAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import { Comment } from '@/assets/icons';

type CommentIconType = {
    post: Pick<SharePostListData['post'], 'id'>;
};

const CommentIcon = ({ post }: CommentIconType) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const handleClickComment = () => {
        navigation.push('share-post/bottom-sheet/comment', { post });
    };

    return (
        <TouchableWithoutFeedback onPress={handleClickComment}>
            <View style={styles.container}>
                <Comment />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    },
});

export default CommentIcon;
