import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import useBottomSheetAnimatedAction from './useBottomSheetAnimatedAction';
import useBottomSheetAnimatedState from './useBottomSheetAnimatedState';

const FAST_SWIPE_VELOCITY_THRESHOLD = 500;

const useBottomSheetGestureAnimation = () => {
    const { snapInfo, height, translateY } = useBottomSheetAnimatedState();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();

    const startY = useSharedValue(0);

    const snapPointsASC = snapInfo.pointsFromTop;
    const snapPointsLastIndex = snapPointsASC.length - 1;
    const minSnapPoint = 0;
    const maxSnapPoint = snapPointsASC[snapPointsLastIndex];

    const panGesture = Gesture.Pan()
        .onStart(() => {
            startY.value = height.value;
        })
        .onChange((event) => {
            const nextHeight = Math.max(minSnapPoint, Math.min(maxSnapPoint, startY.value - event.translationY));
            height.value = nextHeight;
        })
        .onEnd((event) => {
            const handleFastSwipeDown = () => {
                if (height.value < snapPointsASC[0]) {
                    translateY.value = withTiming(height.value);
                    return;
                }

                for (const snapPoint of [...snapPointsASC].reverse()) {
                    if (height.value > snapPoint) {
                        height.value = withTiming(snapPoint);
                        return;
                    }
                }
            };

            const handleFastSwipeUp = () => {
                for (const snapPoint of snapPointsASC) {
                    if (height.value < snapPoint) {
                        height.value = withTiming(snapPoint);
                        return;
                    }
                }
            };

            const handleSlowSwipe = () => {
                const closestSnapPoint = snapPointsASC.reduce((prev, curr) =>
                    Math.abs(curr - height.value) < Math.abs(prev - height.value) ? curr : prev,
                );
                height.value = withTiming(closestSnapPoint);
            };

            const isFastSwipe = Math.abs(event.velocityY) > FAST_SWIPE_VELOCITY_THRESHOLD;
            const isDownSwipe = event.velocityY > 0;
            const isUpSwipe = event.velocityY < 0;

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

    useDerivedValue(() => {
        const isClose = height.value !== 0 && translateY.value === height.value;
        if (isClose) {
            runOnJS(bottomSheetClose)();
        }
    });

    return panGesture;
};

export default useBottomSheetGestureAnimation;
