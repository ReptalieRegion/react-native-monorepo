import { color } from '@crawl/design-system';
import { range } from '@crawl/utils';
import React from 'react';
import type { ColorValue } from 'react-native';
import { StyleSheet, View } from 'react-native';

import useImageIndicator from '../../hooks/useImageIndicator';

import { DotIndicator } from '@/assets/icons';

type ImageIndicatorsProps = {
    imageCount: number;
};

export default function ImageIndicators({ imageCount }: ImageIndicatorsProps) {
    const { indicatorIndex } = useImageIndicator();

    return (
        <View style={styles.container}>
            {range(imageCount).map((_, index) => {
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

function makeIndicatorsStyles(isCurrentIndex: boolean): { color: ColorValue; scale: number } {
    if (isCurrentIndex) {
        return {
            color: color.Teal[150].toString(),
            scale: 1,
        };
    }

    return {
        color: color.Gray[500].toString(),
        scale: 0.9,
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
});
