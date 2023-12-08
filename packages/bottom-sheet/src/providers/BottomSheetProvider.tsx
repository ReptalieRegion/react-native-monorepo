import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetAnimationActionContext, BottomSheetAnimationStateContext } from '../contexts/BottomSheetAnimationContext';
import type { BottomSheetAnimationAction, BottomSheetAnimationState, SnapInfo } from '../types/bottom-sheet';
import { getPixel } from '../utils/calc-pixel';

type BottomSheetProviderProps = {
    onClose: () => void;
    snapInfo: SnapInfo;
};

const BottomSheetProvider = ({ children, snapInfo, onClose }: PropsWithChildren<BottomSheetProviderProps>) => {
    const dimensions = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const numberPointsFromTop = snapInfo.pointsFromTop.map((snapPoint) =>
        getPixel({ baseHeight: dimensions.height - top, snapPoint }),
    );
    const sortedPointsFromTop = [...numberPointsFromTop].sort();
    const height = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const bottomSheetClose = useCallback(() => {
        translateY.value = withTiming(height.value);
        opacity.value = withTiming(0, { duration: 250 }, (finished) => finished && runOnJS(onClose)());
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

    useEffect(() => {
        height.value = withTiming(numberPointsFromTop[snapInfo.startIndex]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BottomSheetAnimationActionContext.Provider value={animationActions}>
            <BottomSheetAnimationStateContext.Provider value={animationState}>
                {children}
            </BottomSheetAnimationStateContext.Provider>
        </BottomSheetAnimationActionContext.Provider>
    );
};

export default BottomSheetProvider;
