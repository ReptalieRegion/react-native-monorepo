import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

import { color } from '@/components/common/tokens/colors';

interface TagProps {
    onPress?: (event: GestureResponderEvent) => void;
    content: string;
}

const Tag = ({ onPress, content }: TagProps) => {
    return (
        <Text style={styles.color} onPress={onPress} suppressHighlighting={true}>
            {content + ' '}
        </Text>
    );
};

const styles = StyleSheet.create({
    color: {
        color: color.Green['750'].toString(),
        fontWeight: '500',
        textAlignVertical: 'bottom',
    },
});

export default Tag;
