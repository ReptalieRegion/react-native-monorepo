import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CommentHeader = () => {
    return (
        <View style={[styles.center, styles.border]}>
            <Text style={[styles.text, styles.padding]}>댓글</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: color.Gray[250].toString(),
    },
    padding: {
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CommentHeader;
