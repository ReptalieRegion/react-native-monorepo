import { color } from '@reptile-region/design-system';
import { range } from '@reptile-region/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PushLogSkeleton() {
    return (
        <View style={styles.container}>
            {range(10)
                .fill('')
                .map((_, index) => (
                    <SkeletonPlaceholder key={index} direction="right">
                        <View style={styles.row}>
                            <View style={styles.circle} />
                            <View style={styles.textContainer}>
                                <View style={{ ...styles.text, ...styles.title }} />
                                <View style={{ ...styles.text, ...styles.content }} />
                            </View>
                            <View style={styles.image} />
                        </View>
                    </SkeletonPlaceholder>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        flexDirection: 'column',
    },
    row: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        height: 70,
    },
    circle: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        width: 40,
        height: 40,
    },
    textContainer: {
        gap: 5,
    },
    title: {
        width: 60,
    },
    content: {
        width: 220,
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 14,
    },
    image: {
        width: 40,
        height: 40,
        marginLeft: 'auto',
    },
});
