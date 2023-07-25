import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Comment from '@/assets/icons/Comment';
import { useNavigation } from '@react-navigation/native';
import { SharePostListNavigationProp } from '<Routes>';

const CommentIcon = () => {
    const navigation = useNavigation<SharePostListNavigationProp>();

    const handleClickComment = () => {
        navigation.push('share-post/image-crop');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleClickComment} activeOpacity={1}>
                <Comment />
            </TouchableOpacity>
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
