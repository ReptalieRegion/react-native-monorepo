import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function CommentSkeleton() {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.subContainer}>
            {range(6).map((_, index) => (
                <SkeletonPlaceholder key={index} direction="right">
                    <View style={styles.viewContainer}>
                        <View style={styles.circle} />
                        <View style={styles.textContainer}>
                            <View style={styles.name} />
                            <View style={{ ...styles.text, width: width * 0.85 - 40 }} />
                            <View style={{ ...styles.text, width: width * 0.6 - 40 }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        minHeight: 2,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        gap: 15,
        backgroundColor: color.White.toString(),
    },
    viewContainer: {
        flexDirection: 'row',
        gap: 10,
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
        height: 14,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        marginBottom: 10,
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 6,
    },
    textContainer: {
        gap: 5,
        width: '100%',
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 14,
    },
});
