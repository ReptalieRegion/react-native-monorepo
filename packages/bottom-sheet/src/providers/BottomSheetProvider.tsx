import type { PropsWithChildren } from 'react';
import React, { useCallback, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetAnimationActionContext, BottomSheetAnimationStateContext } from '../contexts/BottomSheetAnimationContext';
import type { BottomSheetAnimationAction, BottomSheetAnimationState, SnapInfo } from '../types/bottom-sheet';
import { getPixel } from '../utils/calc-pixel';

type BottomSheetProviderState = {
    snapInfo: SnapInfo;
};

interface BottomSheetProviderActions {
    onClose: () => void;
}

type BottomSheetProviderProps = BottomSheetProviderState & BottomSheetProviderActions;

export default function BottomSheetProvider({ children, snapInfo, onClose }: PropsWithChildren<BottomSheetProviderProps>) {
    const dimensions = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const numberPointsFromTop = useMemo(
        () => snapInfo.pointsFromTop.map((snapPoint) => getPixel({ baseHeight: dimensions.height - top, snapPoint })),
        [dimensions.height, snapInfo.pointsFromTop, top],
    );
    const sortedPointsFromTop = [...numberPointsFromTop].sort();

    const height = useSharedValue(sortedPointsFromTop[snapInfo.startIndex]);
    const translateY = useSharedValue(sortedPointsFromTop[snapInfo.startIndex]);
    const opacity = useSharedValue(0);

    const bottomSheetClose = useCallback(() => {
        return new Promise<void>((resolve) => {
            translateY.value = withTiming(height.value);
            opacity.value = withTiming(0, { duration: 250 }, (finished) => {
                if (finished) {
                    runOnJS(resolve)();
                    runOnJS(onClose)();
                }
            });
        });
    }, [height.value, onClose, opacity, translateY]);

    const animationState: BottomSheetAnimationState = {
        height,
        translateY,
        opacity,
        snapInfo: { startIndex: snapInfo.startIndex, pointsFromTop: sortedPointsFromTop },
        onClose,
    };

    const animationActions: BottomSheetAnimationAction = {
        bottomSheetClose,
    };

    return (
        <BottomSheetAnimationActionContext.Provider value={animationActions}>
            <BottomSheetAnimationStateContext.Provider value={animationState}>
                {children}
            </BottomSheetAnimationStateContext.Provider>
        </BottomSheetAnimationActionContext.Provider>
    );
}
