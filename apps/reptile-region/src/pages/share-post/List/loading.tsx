import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import createEmptyArray from '@/utils/array/createEmptyArray';

export default function SharePostListSkeleton() {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {createEmptyArray(4)
                .fill('')
                .map((_, index) => (
                    <SkeletonPlaceholder key={index} direction="right">
                        <View>
                            <View style={styles.profile}>
                                <View style={styles.circle} />
                                <View style={styles.name} />
                            </View>
                            <View style={styles.imageContainer} />
                            <View style={styles.textContainer}>
                                <View style={{ ...styles.text, width: width * 0.6 }} />
                                <View style={{ ...styles.text, width: width * 0.8 }} />
                                <View style={{ ...styles.text, width: width * 0.9 }} />
                                <View style={{ ...styles.text, width: width * 0.7 }} />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: color.White.toString(),
        flexDirection: 'column',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 5,
    },
    circle: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        width: 30,
        height: 30,
    },
    name: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        width: 60,
        height: 10,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        marginBottom: 10,
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 6,
    },
    textContainer: {
        gap: 10,
        marginBottom: 10,
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 10,
    },
});
