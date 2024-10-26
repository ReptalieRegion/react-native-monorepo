import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function BlockUserListSkeleton() {
    return (
        <View style={styles.container}>
            {range(15)
                .fill('')
                .map((_, index) => (
                    <SkeletonPlaceholder key={index} direction="right">
                        <View style={styles.profile}>
                            <View style={styles.circle} />
                            <View style={styles.name} />
                            <View style={styles.follow} />
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
        gap: 10,
        marginBottom: 20,
    },
    circle: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        width: 50,
        height: 50,
    },
    name: {
        borderRadius: 30,
        backgroundColor: color.Gray[200].toString(),
        width: 150,
        height: 16,
    },
    follow: {
        marginLeft: 'auto',
        borderRadius: 30,
        width: 30,
        height: 30,
    },
});
