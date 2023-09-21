import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function UserDetailPanelSkeleton() {
    return (
        <SkeletonPlaceholder direction="right">
            <View style={styles.container}>
                <View style={styles.avatar} />
                <View style={styles.nickname} />
                <View style={styles.activitySummaryContainer}>
                    <View style={styles.activitySummaryItem} />
                </View>
                <View style={styles.follow} />
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        height: 195,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 9999,
    },
    nickname: {
        height: 14,
        width: '20%',
        borderRadius: 10,
    },
    activitySummaryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    activitySummaryItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    activitySummaryItem: {
        height: 14,
        width: '40%',
        borderRadius: 10,
    },
    follow: {
        height: 14,
        width: '15%',
        borderRadius: 10,
    },
});
