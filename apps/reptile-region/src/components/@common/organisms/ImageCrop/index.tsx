import type { ImageCropData } from '@react-native-community/image-editor';
import ImageEditor from '@react-native-community/image-editor';
import { Image } from 'expo-image';
import { useRef } from 'react';
import React, { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ImageCropState = {
    image: {
        uri: string;
        width: number;
        height: number;
    };
    width: number;
    height: number;
    maxScale: number;
};

interface ImageCropActions {
    onCropped(props: { originalUri: string; croppedUri: string }): void;
}

type ImageCropProps = ImageCropState & ImageCropActions;

export default function ImageCrop({ image, width, height, maxScale, onCropped }: ImageCropProps) {
    const imageRatio = image.height / image.width;
    const viewRatio = height / width;
    const imageWidth = imageRatio > viewRatio ? width : height / imageRatio;
    const imageHeight = imageRatio > viewRatio ? width * imageRatio : height;

    const savedTranslation = {
        x: useSharedValue(1),
        y: useSharedValue(1),
        scale: useSharedValue(1),
    };

    const translation = {
        x: useSharedValue(imageRatio > viewRatio ? 0 : (width - imageWidth) / 2),
        y: useSharedValue(imageRatio > viewRatio ? (height - imageHeight) / 2 : 0),
        scale: useSharedValue(1),
    };

    // console.log(
    //     `\nimageWidth: ${imageWidth}\nimageHeight: ${imageHeight}\nwidth: ${width}\nheight: ${height}\nx: ${
    //         imageRatio > viewRatio ? 0 : (width - imageWidth) / 2
    //     }`,
    // );

    const lastUri = useRef(image.uri);
    if (lastUri.current !== image.uri) {
        translation.x.value = imageRatio > viewRatio ? 0 : (width - imageWidth) / 2;
        translation.y.value = imageRatio > viewRatio ? (height - imageHeight) / 2 : 0;
        translation.scale.value = 1;
        savedTranslation.x.value = 1;
        savedTranslation.y.value = 1;
        savedTranslation.scale.value = 1;
    }

    const calcOffsetX = (scaleWidth: number) => {
        const currentOffsetX = translation.x.value;

        if (currentOffsetX < -(imageWidth - width + scaleWidth)) {
            return -(imageWidth - width + scaleWidth);
        }

        if (currentOffsetX > scaleWidth) {
            return scaleWidth;
        }

        return currentOffsetX;
    };

    const calcOffsetY = (scaleHeight: number) => {
        const currentOffsetY = translation.y.value;

        if (currentOffsetY < -(imageWidth - height + scaleHeight)) {
            return -(imageWidth - height + scaleHeight);
        }

        if (currentOffsetY > scaleHeight) {
            return scaleHeight;
        }

        return currentOffsetY;
    };

    const calcScale = () => {
        const currentScale = translation.scale.value;
        if (currentScale > maxScale) {
            return maxScale;
        }

        if (currentScale < 1) {
            return 1;
        }

        return currentScale;
    };

    const makeImageCropData = ({
        clampedScale,
        scaleWidth,
        scaleHeight,
        offsetX,
        offsetY,
    }: {
        clampedScale: number;
        scaleWidth: number;
        scaleHeight: number;
        offsetX: number;
        offsetY: number;
    }): ImageCropData => {
        const { x, y } =
            image.width / width < image.height / height
                ? { x: image.width / clampedScale, y: (image.width / clampedScale) * viewRatio }
                : { x: image.height / clampedScale / viewRatio, y: image.height / clampedScale };

        return {
            size: {
                width: x,
                height: y,
            },
            offset: {
                x: (-(offsetX - scaleWidth) / width) * x * clampedScale,
                y: (-(offsetY - scaleHeight) / height) * y * clampedScale,
            },
        };
    };

    const handleEnd = async () => {
        if (!width || !height || !maxScale) {
            return;
        }

        const clampedScale = Math.min(maxScale, Math.max(1, translation.scale.value));
        const scaleWidth = (width * clampedScale - width) / (2 * clampedScale);
        const scaleHeight = (height * clampedScale - height) / (2 * clampedScale);
        const offsetX = calcOffsetX(scaleWidth);
        const offsetY = calcOffsetY(scaleHeight);
        const scale = calcScale();

        translation.x.value = withSpring(offsetX);
        translation.y.value = withSpring(offsetY);
        translation.scale.value = withSpring(scale);

        const cropData = makeImageCropData({ clampedScale, scaleHeight, scaleWidth, offsetX, offsetY });
        const url = await ImageEditor.cropImage(image.uri, cropData);
        onCropped({ originalUri: image.uri, croppedUri: url });
    };

    const panGesture = Gesture.Pan()
        .onStart(() => {
            savedTranslation.x.value = translation.x.value;
            savedTranslation.y.value = translation.y.value;
        })
        .onChange((event) => {
            translation.x.value = savedTranslation.x.value + event.translationX;
            translation.y.value = savedTranslation.y.value + event.translationY;
        })
        .onEnd(() => {
            runOnJS(handleEnd)();
        });

    const panStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translation.x.value }, { translateY: translation.y.value }],
    }));

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            translation.scale.value = savedTranslation.scale.value * event.scale;
        })
        .onEnd((event) => {
            savedTranslation.scale.value = event.scale;
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
                                        source={{ uri: image.uri }}
                                        style={{ width: imageWidth, height: imageHeight }}
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
