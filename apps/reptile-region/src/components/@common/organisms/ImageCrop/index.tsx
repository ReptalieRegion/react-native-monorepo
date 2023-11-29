import { Image } from 'expo-image';
import { useRef } from 'react';
import React, { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import type { CropInfo } from '../CameraAlbum/types';

type ImageCropState = {
    image: {
        uri: string;
        width: number;
        height: number;
    };
    width: number;
    height: number;
    initPosition?: {
        x: number;
        y: number;
        scale: number;
    };
    minScale: number;
    maxScale: number;
};

interface ImageCropActions {
    getCropInfo?(originalUri: string, props: CropInfo): void;
}

type ImageCropProps = ImageCropState & ImageCropActions;

export default function ImageCrop({ image, width, height, maxScale, initPosition, getCropInfo }: ImageCropProps) {
    const lastImage = useRef(image.uri);
    const imageRatio = image.height / image.width;
    const viewRatio = height / width;
    const imageWidth = imageRatio > viewRatio ? width : height / imageRatio;
    const imageHeight = imageRatio > viewRatio ? width * imageRatio : height;

    const translation = {
        x: useSharedValue(imageRatio > viewRatio ? 0 : (width - imageWidth) / 2),
        y: useSharedValue(imageRatio > viewRatio ? (height - imageHeight) / 2 : 0),
        scale: useSharedValue(1),
    };

    if (initPosition && lastImage.current !== image.uri) {
        lastImage.current = image.uri;
        translation.x.value = initPosition.x;
        translation.y.value = initPosition.y;
        translation.scale.value = initPosition.scale;
    }

    const handleEnd = async () => {
        if (!width || !height || !maxScale) {
            return;
        }

        const clampedScale =
            translation.scale.value > maxScale ? maxScale : translation.scale.value < 1 ? 1 : translation.scale.value;
        const scaleWidth = (width * clampedScale - width) / (2 * clampedScale);
        const scaleHeight = (height * clampedScale - height) / (2 * clampedScale);

        let offsetX = translation.x.value;
        let offsetY = translation.y.value;

        if (translation.x.value < -(imageWidth - width + scaleWidth)) {
            translation.x.value = withSpring(-(imageWidth - width + scaleWidth));
            offsetX = -(imageWidth - width + scaleWidth);
        }
        if (translation.x.value > scaleWidth) {
            translation.x.value = withSpring(scaleWidth);
            offsetX = scaleWidth;
        }
        if (translation.y.value < -(imageHeight - height + scaleHeight)) {
            translation.y.value = withSpring(-(imageHeight - height + scaleHeight));
            offsetY = -(imageHeight - height + scaleHeight);
        }
        if (translation.y.value > scaleHeight) {
            translation.y.value = withSpring(scaleHeight);
            offsetY = scaleHeight;
        }
        if (translation.scale.value > maxScale) {
            translation.scale.value = withSpring(maxScale);
        }
        if (translation.scale.value < 1) {
            translation.scale.value = withSpring(1);
        }

        let x2 = 0;
        let y2 = 0;

        if (image.width / width < image.height / height) {
            x2 = image.width / clampedScale;
            y2 = x2 * viewRatio;
        } else {
            y2 = image.height / clampedScale;
            x2 = y2 / viewRatio;
        }

        offsetX -= scaleWidth;
        offsetY -= scaleHeight;

        offsetX = (-offsetX / width) * x2 * clampedScale; // px
        offsetY = (-offsetY / height) * y2 * clampedScale; // px

        getCropInfo?.(image.uri, {
            size: {
                width: x2,
                height: y2,
            },
            offset: {
                x: offsetX,
                y: offsetY,
            },
            x: translation.x.value,
            y: translation.y.value,
            scale: translation.scale.value,
        });
    };

    /** pan */
    const panContext = {
        x: useSharedValue(0),
        y: useSharedValue(0),
    };
    const panGesture = Gesture.Pan()
        .onStart(() => {
            panContext.x.value = translation.x.value;
            panContext.y.value = translation.y.value;
        })
        .onChange((event) => {
            translation.x.value = panContext.x.value + event.translationX;
            translation.y.value = panContext.y.value + event.translationY;
        })
        .onEnd(() => {
            runOnJS(handleEnd)();
        });

    const panStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translation.x.value }, { translateY: translation.y.value }],
    }));

    /** pinch */
    const pinchContext = {
        scale: useSharedValue(1),
        x: useSharedValue(0),
        y: useSharedValue(0),
    };

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            pinchContext.scale.value = translation.scale.value;
            pinchContext.x.value = translation.x.value;
            pinchContext.y.value = translation.y.value;
        })
        .onUpdate((event) => {
            translation.scale.value = pinchContext.scale.value * event.scale;
        })
        .onEnd(() => {
            runOnJS(handleEnd)();
        });

    const pinchStyle = useAnimatedStyle(() => ({
        transform: [{ scale: translation.scale.value }],
    }));

    return (
        <View style={[styles.container, { width, height }]}>
            <GestureDetector gesture={pinchGesture}>
                <Animated.View style={[{ width, height }, pinchStyle]}>
                    <View style={{ width, height }}>
                        <GestureDetector gesture={panGesture}>
                            <View style={{ width, height }}>
                                <Animated.View style={[{ width: imageWidth, height: imageHeight }, panStyle]}>
                                    <Image
                                        style={{ width: imageWidth, height: imageHeight }}
                                        recyclingKey={image.uri}
                                        source={{ uri: image.uri }}
                                        priority="high"
                                        contentFit="cover"
                                        placeholder={require('@/assets/images/default_image.png')}
                                        placeholderContentFit="cover"
                                    />
                                </Animated.View>
                            </View>
                        </GestureDetector>
                    </View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
