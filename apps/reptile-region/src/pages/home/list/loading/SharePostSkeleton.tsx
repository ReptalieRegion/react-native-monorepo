import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SharePostLoading({ width, height, offset }: { width: number; height: number; offset: number }) {
    return (
        <View style={{ ...styles.wrapper, paddingLeft: offset }}>
            {range(3)
                .fill('')
                .map((_, index) => (
                    <SkeletonPlaceholder key={index} direction="right">
                        <View style={styles.container}>
                            <View style={{ width, height, ...styles.imageContainer }} />
                            <View style={styles.text} />
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
    container: {
        gap: 15,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 6,
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 10,
        width: 80,
    },
});
