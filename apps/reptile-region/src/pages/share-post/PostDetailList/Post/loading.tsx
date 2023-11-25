import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PostListSkeleton() {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <SkeletonPlaceholder direction="right">
                <View>
                    <View style={{ ...styles.profile, ...styles.padding }}>
                        <View style={styles.circle} />
                        <View style={styles.name} />
                    </View>
                    <View style={styles.imageContainer} />
                    <View style={{ ...styles.textContainer, ...styles.padding }}>
                        <View style={{ ...styles.text, width: width * 0.6 }} />
                        <View style={{ ...styles.text, width: width * 0.8 }} />
                        <View style={{ ...styles.text, width: width * 0.9 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: color.White.toString(),
        flexDirection: 'column',
    },
    padding: {
        paddingHorizontal: 15,
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
        height: 300,
        marginBottom: 10,
        backgroundColor: color.Gray[200].toString(),
        borderRadius: 6,
    },
    textContainer: {
        gap: 10,
        backgroundColor: color.White.toString(),
    },
    text: {
        borderRadius: 9999,
        backgroundColor: color.Gray[200].toString(),
        height: 10,
    },
});
