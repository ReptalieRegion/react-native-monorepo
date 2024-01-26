import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NUM_COLUMNS = 3;

export default function SharePostsDetailListSkeleton() {
    const { width } = useWindowDimensions();
    const itemSize = width / NUM_COLUMNS - 2;

    return (
        <View style={styles.container}>
            <SkeletonPlaceholder backgroundColor={color.Gray[650].toString()} direction="right">
                <SkeletonPlaceholder.Item flexDirection="column">
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                        <SkeletonPlaceholder.Item width={itemSize} height={itemSize} margin={1} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
    },
});
