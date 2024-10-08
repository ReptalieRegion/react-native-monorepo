import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { StrokeCamera } from '@/assets/icons';
import { HEADER_HEIGHT } from '@/constants/global';

type ImageThumbnailEmptyListProps = {
    height: number;
};

export default function ImageThumbnailEmptyList({ height }: ImageThumbnailEmptyListProps) {
    const wrapperStyles = StyleSheet.compose(styles.wrapper, { height });

    return (
        <View style={wrapperStyles}>
            <View style={styles.circle}>
                <StrokeCamera width={80} height={80} stroke={iconColor} />
            </View>
            <Typo variant="title1">게시물 없음</Typo>
        </View>
    );
}

const iconColor = color.DarkGray[400].toString();

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        height: Dimensions.get('screen').height - 200 - HEADER_HEIGHT,
    },
    circle: {
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: iconColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 130,
    },
});
