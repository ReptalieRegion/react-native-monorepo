import { color } from 'design-system';
import React from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import useImageIndicator from '../../hooks/useImageIndicator';

import { DotIndicator } from '@/assets/icons';
import createEmptyArray from '@/utils/array/createEmptyArray';

type ImageIndicatorsProps = {
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

export default function ImageIndicators({ imageCount }: ImageIndicatorsProps) {
    const { indicatorIndex } = useImageIndicator();

    return (
        <View style={styles.container}>
            {createEmptyArray(imageCount).map((_, index) => {
                const indicatorsStyle = makeIndicatorsStyles(index === indicatorIndex);

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
