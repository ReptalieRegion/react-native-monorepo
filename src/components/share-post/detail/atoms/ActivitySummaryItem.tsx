import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { color } from '@/components/common/tokens/colors';

interface ActivitySummaryItemProps {
    onPress?: () => void;
    content: string;
    count: number;
}

const ActivitySummaryItem = ({ onPress, content, count }: ActivitySummaryItemProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.fontSize}>{content}</Text>
                <Text style={[styles.fontSize, styles.count]}>{count}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    fontSize: {
        fontSize: 14,
        lineHeight: 20,
    },
    count: {
        color: color.Green[750].toString(),
    },
});

export default ActivitySummaryItem;
