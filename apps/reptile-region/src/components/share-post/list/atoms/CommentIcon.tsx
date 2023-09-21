import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Comment } from '@/assets/icons';

type CommentIconType = {
    onPress: () => void;
};

export default function CommentIcon({ onPress }: CommentIconType) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Comment />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    },
});
