import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useGestures } from '../hooks/useGestures';
import { useImageLayout } from '../hooks/useImageLayout';
import type { ImageZoomProps } from '../types';

export default function ImageZoom({
    uri = '',
    minScale,
    maxScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    containerStyle,
    imageStyle,
    initial,
    onLayout,
}: ImageZoomProps) {
    const imageRatio = imageStyle.height / imageStyle.width;
    const viewRatio = containerStyle.height / containerStyle.width;
    const imageWidth = imageRatio > viewRatio ? containerStyle.width : containerStyle.height / imageRatio;
    const imageHeight = imageRatio > viewRatio ? containerStyle.width * imageRatio : containerStyle.height;
    const imageSize = useMemo(() => ({ width: imageWidth, height: imageHeight }), [imageHeight, imageWidth]);

    const newInitial = initial
        ? {
              x: initial.x,
              y: initial.y,
              focalX: initial.focalX,
              focalY: initial.focalY,
              scale: initial.scale,
          }
        : {
              x: imageRatio > viewRatio ? 0 : (containerStyle.width - imageWidth) / 2,
              y: imageRatio < viewRatio ? 0 : (containerStyle.height - imageHeight) / 2,
              focalX: 0,
              focalY: 0,
              scale: 1,
          };
    const { center, onImageLayout } = useImageLayout({ onLayout });

    const { animatedStyle, gestures } = useGestures({
        originImageSize: imageStyle,
        imageUri: uri,
        imageSize,
        screenSize: containerStyle,
        initial: newInitial,
        center,
        minScale,
        maxScale,
        minPanPointers,
        maxPanPointers,
        isPanEnabled,
        isPinchEnabled,
        onInteractionStart,
        onInteractionEnd,
        onPinchStart,
        onPinchEnd,
        onPanStart,
        onPanEnd,
    });

    const wrapperStyle = useMemo(() => [containerStyle, styles.wrapper], [containerStyle]);
    const imageWrapper = useMemo(() => [imageSize, animatedStyle], [animatedStyle, imageSize]);

    return (
        <View style={wrapperStyle}>
            <Animated.View style={imageWrapper}>
                <GestureDetector gesture={gestures}>
                    <Image style={imageSize} source={{ uri }} onLayout={onImageLayout} />
                </GestureDetector>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
    },
});
