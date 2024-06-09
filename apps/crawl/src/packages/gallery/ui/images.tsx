import React, { useState } from 'react';
import { Image, StyleSheet, type ImageStyle, type StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

interface IGalleryImage {
    uri: string;
    imageStyles: StyleProp<ImageStyle>;
    blurStyles: StyleProp<ImageStyle>;
    imageWidth: number;
}

export default function GalleryImage({ uri, imageStyles, blurStyles }: IGalleryImage) {
    const source = { uri };

    // state
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Animated.View style={styles.imageWrapper}>
            <Image
                source={source}
                style={imageStyles}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && <Animated.View style={blurStyles} />}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    imageWrapper: {
        position: 'relative',
    },
});
