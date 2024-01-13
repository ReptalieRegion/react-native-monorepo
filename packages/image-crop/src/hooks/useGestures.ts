import { useRef } from 'react';
import type {
    GestureUpdateEvent,
    PanGestureHandlerEventPayload,
    PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { ImageZoomUseGesturesProps } from '../types';

export const useGestures = ({
    originImageSize,
    imageUri,
    imageSize,
    screenSize,
    initial,
    center,
    minScale = 1,
    maxScale = 5,
    minPanPointers = 2,
    maxPanPointers = 2,
    isPanEnabled = true,
    isPinchEnabled = true,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
}: ImageZoomUseGesturesProps) => {
    const viewRatio = screenSize.height / screenSize.width;
    const isInteracting = useRef(false);
    const isPanning = useRef(false);
    const isPinching = useRef(false);

    const prevTranslate = { x: useSharedValue(0), y: useSharedValue(0) };
    const prevScale = useSharedValue(1);

    const scale = useSharedValue(1);
    const initialFocal = { x: useSharedValue(0), y: useSharedValue(0) };
    const focal = { x: useSharedValue(0), y: useSharedValue(0) };
    const translate = { x: useSharedValue(0), y: useSharedValue(0) };

    const prevUri = useRef(imageUri);
    if (prevUri.current !== imageUri && initial) {
        prevUri.current = imageUri;
        translate.x.value = initial.x;
        translate.y.value = initial.y;
        focal.x.value = initial.focalX;
        focal.y.value = initial.focalY;
        scale.value = initial.scale;
    }

    const onInteractionStarted = () => {
        if (!isInteracting.current) {
            isInteracting.current = true;
            onInteractionStart?.();
        }
    };

    const getTranslate = ({
        translateX,
        translateY,
        focalX,
        focalY,
    }: {
        translateX: number;
        translateY: number;
        focalX: number;
        focalY: number;
    }) => {
        'worklet';
        const clampedScale = Math.min(Math.max(1, scale.value), maxScale);
        const scaleWidth = (imageSize.width * clampedScale - imageSize.width) / 2;
        const scaleHeight = (imageSize.height * clampedScale - imageSize.height) / 2;

        const leftTranslateX = scaleWidth;
        const rightTranslateX = -(imageSize.width - screenSize.width + scaleWidth);

        const topTranslateY = scaleHeight;
        const bottomTranslateY = -(imageSize.height - screenSize.height + scaleHeight);

        const changeTranslateX = Math.max(rightTranslateX, Math.min(leftTranslateX, translateX));
        const changeTranslateY = Math.max(bottomTranslateY, Math.min(topTranslateY, translateY));

        const changeFocal = {
            x: focalX,
            y: focalY,
        };

        if (changeTranslateX + focalX > leftTranslateX) {
            changeFocal.x = leftTranslateX - changeTranslateX;
        } else if (changeTranslateX + focalX < rightTranslateX) {
            changeFocal.x = rightTranslateX - changeTranslateX;
        }

        if (changeTranslateY + focalY > topTranslateY) {
            changeFocal.y = topTranslateY - changeTranslateY;
        } else if (changeTranslateY + focalY < bottomTranslateY) {
            changeFocal.y = bottomTranslateY - changeTranslateY;
        }

        return {
            scaleWidth,
            scaleHeight,
            clampedScale,
            changeTranslateX,
            changeTranslateY,
            changeFocal,
        };
    };

    const onInteractionEnded = () => {
        if (isInteracting.current && !isPinching.current && !isPanning.current) {
            isInteracting.current = false;

            const { clampedScale, changeTranslateX, changeTranslateY, changeFocal } = getTranslate({
                translateX: translate.x.value,
                translateY: translate.y.value,
                focalX: focal.x.value,
                focalY: focal.y.value,
            });

            scale.value = withTiming(clampedScale);
            translate.x.value = withTiming(changeTranslateX);
            translate.y.value = withTiming(changeTranslateY);
            focal.x.value = withTiming(changeFocal.x);
            focal.y.value = withTiming(changeFocal.y);

            const size = {
                width: 0,
                height: 0,
            };

            if (imageSize.width / screenSize.width < imageSize.height / screenSize.height) {
                size.width = originImageSize.width / clampedScale;
                size.height = size.width * viewRatio;
            } else {
                size.height = originImageSize.height / clampedScale;
                size.width = size.height / viewRatio;
            }

            const offset = {
                x:
                    ((imageSize.width * (clampedScale - 1)) / 2 - (changeTranslateX + changeFocal.x)) *
                    (originImageSize.width / (clampedScale * imageSize.width)),
                y:
                    ((imageSize.height * (clampedScale - 1)) / 2 - (changeTranslateY + changeFocal.y)) *
                    (originImageSize.height / (clampedScale * imageSize.height)),
            };

            onInteractionEnd?.(imageUri, {
                size,
                offset,
                translation: {
                    x: changeTranslateX,
                    y: changeTranslateY,
                    focalX: changeFocal.x,
                    focalY: changeFocal.y,
                    scale: clampedScale,
                },
            });
        }
    };

    const onPinchStarted = () => {
        onInteractionStarted();
        isPinching.current = true;
        onPinchStart?.();
    };

    const onPinchEnded = () => {
        isPinching.current = false;
        onPinchEnd?.();
        onInteractionEnded();
    };

    const onPanStarted = () => {
        onInteractionStarted();
        isPanning.current = true;
        onPanStart?.();
    };

    const onPanEnded = () => {
        isPanning.current = false;
        onPanEnd?.();
        onInteractionEnded();
    };

    const panGesture = Gesture.Pan()
        .enabled(isPanEnabled)
        .minPointers(minPanPointers)
        .maxPointers(maxPanPointers)
        .onStart(() => {
            runOnJS(onPanStarted)();
            prevTranslate.x.value = translate.x.value;
            prevTranslate.y.value = translate.y.value;
        })
        .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            const { changeFocal, changeTranslateX, changeTranslateY } = getTranslate({
                translateX: prevTranslate.x.value + event.translationX,
                translateY: prevTranslate.y.value + event.translationY,
                focalX: focal.x.value,
                focalY: focal.y.value,
            });

            focal.x.value = changeFocal.x;
            focal.y.value = changeFocal.y;
            translate.x.value = changeTranslateX;
            translate.y.value = changeTranslateY;
        })
        .onEnd(() => {
            runOnJS(onPanEnded)();
        });

    const pinchGesture = Gesture.Pinch()
        .enabled(isPinchEnabled)
        .onStart((event) => {
            runOnJS(onPinchStarted)();
            prevScale.value = scale.value;
            initialFocal.x.value = event.focalX;
            initialFocal.y.value = event.focalY;
        })
        .onUpdate((event: GestureUpdateEvent<PinchGestureHandlerEventPayload>) => {
            const { changeFocal, changeTranslateX, changeTranslateY } = getTranslate({
                translateX: translate.x.value,
                translateY: translate.y.value,
                focalX: (center.x - initialFocal.x.value) * (scale.value - 1),
                focalY: (center.y - initialFocal.y.value) * (scale.value - 1),
            });

            scale.value = Math.min(Math.max(minScale, event.scale * prevScale.value), maxScale);
            translate.x.value = changeTranslateX;
            translate.y.value = changeTranslateY;
            focal.x.value = changeFocal.x;
            focal.y.value = changeFocal.y;
        })
        .onEnd(() => {
            runOnJS(onPinchEnded)();
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translate.x.value },
            { translateY: translate.y.value },
            { translateX: focal.x.value },
            { translateY: focal.y.value },
            { scale: scale.value },
        ],
    }));

    const gestures = Gesture.Simultaneous(pinchGesture, panGesture);

    return { gestures, animatedStyle };
};
