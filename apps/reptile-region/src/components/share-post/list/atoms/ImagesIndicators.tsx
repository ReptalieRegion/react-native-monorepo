import { color } from 'design-system';
import React from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { DotIndicator } from '@/assets/icons';
import useSharePostListStore from '@/stores/share-post/useSharePostListStore';
import createEmptyArray from '@/utils/array/createEmptyArray';

type ImagesIndicatorsProps = {
    post: {
        id: string;
    };
    imageCount: number;
};

type ImageType = 'current' | 'other';

type ImageInfo = {
    [key in ImageType]: {
        color: ColorValue;
        scale: number;
    };
};

const IMAGE_INFO: ImageInfo = {
    current: {
        color: color.Teal[150].toString(),
        scale: 1,
    },
    other: {
        color: color.Gray[500].toString(),
        scale: 0.9,
    },
};

const makeIndicatorsStyles = (isCurrent: boolean) => {
    const type: ImageType = isCurrent ? 'current' : 'other';
    return IMAGE_INFO[type];
};

export default function ImagesIndicators({ post: { id: postId }, imageCount }: ImagesIndicatorsProps) {
    const imageIndex = useSharePostListStore((state) => state.postsOfInfo[postId]?.currentImageIndex ?? 0);

    return (
        <View style={styles.container}>
            {createEmptyArray(imageCount).map((_, index) => {
                const indicatorsStyle = makeIndicatorsStyles(index === imageIndex);

                return (
                    <View key={index} style={{ transform: [{ scale: indicatorsStyle.scale }] }}>
                        <DotIndicator fill={indicatorsStyle.color} />
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
});
