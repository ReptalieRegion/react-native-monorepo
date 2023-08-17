import { isString } from 'lodash-es';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useKeyboard from './useKeyboard';

export interface UseBottomSheetGestureProps {
    snapInfo?: {
        startIndex: number;
        pointsFromTop: Array<number | string>;
    };
    onClose: () => void;
}

const FAST_SWIPE_VELOCITY_THRESHOLD = 500;

const getPixelValue = (snapPoint: number | string, inset: number) => {
    if (isString(snapPoint) && snapPoint.endsWith('%')) {
        const percentage = parseFloat(snapPoint);
        return (Dimensions.get('window').height * percentage) / 100 - inset;
    }

    return Number(snapPoint);
};

const useBottomSheetGestureAnimation = ({
    snapInfo = { startIndex: 0, pointsFromTop: ['30%', '50%'] },
    onClose,
}: UseBottomSheetGestureProps) => {
    const { top } = useSafeAreaInsets();
    const startY = useSharedValue(0);
    const translateY = useSharedValue(0);
    const height = useSharedValue(0);
    const lock = useSharedValue(false);
    const { isKeyboardShow, userConfig, handleKeyboardHeight } = useKeyboard();
    const closeAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    const snapAnimatedStyles = useAnimatedStyle(() => ({
        height: height.value,
    }));

    const snapPointsASC = snapInfo.pointsFromTop.map((snapPoint) => getPixelValue(snapPoint, top)).sort((a, b) => a - b);
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
            runOnJS(onClose)();
        }
    });

    useDerivedValue(() => {
        if (userConfig.value !== null && isKeyboardShow.value && !lock.value) {
            height.value = handleKeyboardHeight(snapPointsASC[snapPointsASC.length - 1], userConfig.value);
        }

        lock.value = isKeyboardShow.value;
    }, [isKeyboardShow.value]);

    return { gesture: panGesture, snapAnimatedStyles, closeAnimatedStyles };
};

export default useBottomSheetGestureAnimation;
