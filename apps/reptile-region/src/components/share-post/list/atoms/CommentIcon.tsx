import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { RootStackParamList } from '<RootRoutes>';
import type { SharePostListData } from '<SharePostAPI>';
import { Comment } from '@/assets/icons';

type CommentIconType = {
    post: Pick<SharePostListData['post'], 'id'>;
};

const CommentIcon = ({ post }: CommentIconType) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>>();

    const handleClickComment = () => {
        navigation.navigate('bottom-tab', { screen: 'share-post/comment', params: { post } });
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
