import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import createEmptyArray from '@/utils/array/createEmptyArray';

const NUM_COLUMNS = 3;

export default function SharePostsDetailListSkeleton() {
    const { width } = useWindowDimensions();
    const itemWidth = width / NUM_COLUMNS - 2;
    const imageStyle = {
        width: itemWidth,
        height: itemWidth,
        margin: 1,
    };

    return (
        <View style={styles.container}>
            {createEmptyArray(15).map((_, index) => (
                <SkeletonPlaceholder direction="right" key={index.toString() + 'detail'}>
                    <View style={imageStyle} />
                </SkeletonPlaceholder>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
    },
});
