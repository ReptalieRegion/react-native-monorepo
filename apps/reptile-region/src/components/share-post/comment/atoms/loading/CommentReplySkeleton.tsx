import { color } from 'design-system';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import createEmptyArray from '@/utils/array/createEmptyArray';

const { width } = Dimensions.get('screen');
const SKELETON_ITEM_COLOR = color.Gray[200].toString();

const CommentReplySkeleton = () => {
    return (
        <View style={styles.subContainer}>
            <SkeletonPlaceholder direction="right">
                <View style={styles.viewContainer}>
                    <View style={styles.circle} />
                    <View style={styles.textContainer}>
                        <View style={styles.name} />
                        <View style={{ ...styles.text, width: width * 0.85 - 40 }} />
                        <View style={{ ...styles.text, width: width * 0.6 - 40 }} />
                        <View style={{ ...styles.text, width: width * 0.2 - 40 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            {createEmptyArray(10).map((_, index) => (
                <SkeletonPlaceholder key={index} direction="right">
                    <View style={[styles.viewContainer, styles.replyComment]}>
                        <View style={styles.circle} />
                        <View style={styles.textContainer}>
                            <View style={styles.name} />
                            <View style={{ ...styles.text, width: width * 0.85 - 40 }} />
                            <View style={{ ...styles.text, width: width * 0.6 - 40 }} />
                            <View style={{ ...styles.text, width: width * 0.2 - 40 }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        minHeight: 2,
        flexDirection: 'column',
        gap: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    viewContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    replyComment: {
        paddingLeft: 40,
    },
    circle: {
        borderRadius: 9999,
        backgroundColor: SKELETON_ITEM_COLOR,
        width: 30,
        height: 30,
    },
    name: {
        borderRadius: 9999,
        backgroundColor: SKELETON_ITEM_COLOR,
        width: 60,
        height: 14,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        marginBottom: 10,
        backgroundColor: SKELETON_ITEM_COLOR,
        borderRadius: 6,
    },
    textContainer: {
        gap: 5,
        width: '100%',
        marginBottom: 10,
    },
    text: {
        borderRadius: 9999,
        backgroundColor: SKELETON_ITEM_COLOR,
        height: 14,
    },
});

export default CommentReplySkeleton;
