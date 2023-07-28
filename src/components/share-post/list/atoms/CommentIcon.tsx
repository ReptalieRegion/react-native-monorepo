import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Comment from '@/assets/icons/Comment';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';
import { SharePostsData } from '<SharePostAPI>';

type CommentIconType = Pick<SharePostsData, 'postId'>;

const CommentIcon = ({ postId }: CommentIconType) => {
    const navigation = useNavigation<SharePostListNavigationProp>();

    const handleClickComment = () => {
        console.log(postId);
        navigation.push('share-post/image-crop');
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleClickComment}>
                <View>
                    <Comment />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    },
});

export default CommentIcon;
