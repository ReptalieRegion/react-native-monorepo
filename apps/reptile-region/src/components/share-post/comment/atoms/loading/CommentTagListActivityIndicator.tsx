import { color } from 'design-system';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import useTag from '@/hooks/useTag';

const CommentTagListActivityIndicator = () => {
    const { keyword } = useTag();
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <Text style={styles.text}>{keyword} 검색 중</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
        padding: 20,
    },
    text: {
        fontSize: 14,
        color: color.Gray[500].toString(),
    },
});

export default CommentTagListActivityIndicator;
