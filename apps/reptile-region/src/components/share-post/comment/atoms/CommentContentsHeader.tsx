import { useNavigation } from '@react-navigation/native';
import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SharePostNavigationProp } from '<SharePostRoutes>';

type CommentContentsHeaderProps = {
    user: {
        nickname: string;
    };
    comment: {
        isModified: boolean;
    };
};

const CommentContentsHeader = ({ user, comment }: CommentContentsHeaderProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const handleProfileClick = () => {
        navigation.push('share-post/modal/detail', { nickname: user.nickname });
    };

    return (
        <TouchableOpacity onPress={handleProfileClick}>
            <View style={styles.container}>
                <Text style={styles.nickname}>{user.nickname}</Text>
                {comment.isModified ? <Text style={styles.modify}>(수정됨)</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    nickname: {
        fontWeight: '500',
    },
    modify: {
        fontSize: 10,
        color: color.Gray[500].toString(),
    },
});

export default CommentContentsHeader;
