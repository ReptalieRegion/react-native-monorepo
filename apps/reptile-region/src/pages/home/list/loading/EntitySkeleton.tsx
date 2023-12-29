import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function EntityListSkeleton({
    width,
    height,
    offset,
    marginVertical,
}: {
    width: number;
    height: number;
    offset: number;
    marginVertical: number;
}) {
    return (
        <View style={{ paddingLeft: offset, marginVertical, ...styles.wrapper }}>
            {range(3).map((_, index) => (
                <SkeletonPlaceholder key={index} direction="right">
                    <View style={styles.container}>
                        <View style={{ ...styles.image, width, height }} />
                        <View style={styles.textContainer}>
                            <View style={styles.textTop}>
                                <View style={{ ...styles.text, ...styles.tag }} />
                                <View style={{ ...styles.text, ...styles.gender }} />
                                <View />
                            </View>
                            <View style={{ ...styles.text, ...styles.name }} />
                            <View style={{ ...styles.text, ...styles.hatching }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        flexDirection: 'row',
        gap: 10,
    },
    cardContainer: {
        flex: 1,
        padding: 5,
    },
    image: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: color.Gray[200].toString(),
    },
    container: {
        gap: 10,
        paddingVertical: 10,
    },
    textContainer: {
        paddingHorizontal: 5,
        gap: 7,
    },
    textTop: {
        flexDirection: 'row',
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 12,
    },
    tag: {
        width: 70,
    },
    gender: {
        marginLeft: 'auto',
        width: 12,
        height: 12,
    },
    name: {
        width: 40,
    },
    hatching: {
        width: 70,
    },
});
