import { Keyboard } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { KeyboardState, runOnJS, useAnimatedKeyboard, useSharedValue, withTiming } from 'react-native-reanimated';

import useBottomSheetAnimatedAction from './useBottomSheetAnimatedAction';
import useBottomSheetAnimatedState from './useBottomSheetAnimatedState';

const FAST_SWIPE_VELOCITY_THRESHOLD = 500;

const useBottomSheetGestureAnimation = () => {
    const {
        snapInfo: { pointsFromTop },
        height,
        translateY,
    } = useBottomSheetAnimatedState();
    const keyboard = useAnimatedKeyboard();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();

    const startY = useSharedValue(0);
    const startTranslateY = useSharedValue(0);

    const snapPointsLastIndex = pointsFromTop.length - 1;
    const minSnapPoint = 0;
    const maxSnapPoint = pointsFromTop[snapPointsLastIndex];

    const keyboardDismiss = () => {
        Keyboard.dismiss();
    };

    const panGesture = Gesture.Pan()
        .onStart(() => {
            startY.value = height.value;
            startTranslateY.value = translateY.value;
        })
        .onChange((event) => {
            if (keyboard.state.value === KeyboardState.OPEN) {
                runOnJS(keyboardDismiss)();
                return;
            }

            if (keyboard.state.value === KeyboardState.UNKNOWN || keyboard.state.value === KeyboardState.CLOSED) {
                const isMinHeight = height.value < pointsFromTop[0];

                if (!isMinHeight) {
                    const nextHeight = Math.max(minSnapPoint, Math.min(maxSnapPoint, startY.value - event.translationY));
                    height.value = nextHeight;
                } else {
                    translateY.value = Math.max(0, startTranslateY.value + event.translationY);
                }
            }
        })
        .onEnd((event) => {
            const handleFastSwipeDown = () => {
                if (height.value < pointsFromTop[0]) {
                    runOnJS(bottomSheetClose)();
                    return;
                }

                for (const snapPoint of [...pointsFromTop].reverse()) {
                    if (height.value > snapPoint) {
                        height.value = withTiming(snapPoint);
                        return;
                    }
                }
            };

            const handleFastSwipeUp = () => {
                for (const snapPoint of pointsFromTop) {
                    if (height.value < snapPoint) {
                        height.value = withTiming(snapPoint);
                        return;
                    }
                }
            };

            const handleSlowSwipe = () => {
                const closestSnapPoint = pointsFromTop.reduce((prev, curr) =>
                    Math.abs(curr - height.value) < Math.abs(prev - height.value) ? curr : prev,
                );
                height.value = withTiming(closestSnapPoint);
            };

            const isFastSwipe = Math.abs(event.velocityY) > FAST_SWIPE_VELOCITY_THRESHOLD;
            const isDownSwipe = event.velocityY > 0;
            const isUpSwipe = event.velocityY < 0;
            translateY.value = withTiming(0);

            if (isFastSwipe && isDownSwipe) {
                handleFastSwipeDown();
                return;
            }

            if (isFastSwipe && isUpSwipe) {
                handleFastSwipeUp();
                return;
            }

            handleSlowSwipe();
        });

    return panGesture;
};

export default useBottomSheetGestureAnimation;
