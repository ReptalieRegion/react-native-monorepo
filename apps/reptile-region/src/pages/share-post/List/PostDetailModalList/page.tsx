import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import type { ImageType } from '<image>';
import { ImageCarousel } from '@/components/@common/organisms/ImageCarousel';

export default function SharePostDetailModalPage() {
    const images: ImageType[] = [];
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <ImageCarousel>
                <ImageCarousel.List images={images} width={width} height={350} keyboardShouldPersistTaps={'always'} />
                <ImageCarousel.Indicators imageCount={images.length} />
            </ImageCarousel>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
