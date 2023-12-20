import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function EntityListSkeleton() {
    const { width } = useWindowDimensions();
    const imageSize = (width - 30) * 0.5;

    return (
        <View style={styles.wrapper}>
            {range(20).map((_, index) => (
                <SkeletonPlaceholder key={index} direction="right">
                    <View style={styles.container}>
                        <View style={{ ...styles.image, width: imageSize, height: imageSize }} />
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
        paddingTop: 10,
        backgroundColor: color.White.toString(),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 10,
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
