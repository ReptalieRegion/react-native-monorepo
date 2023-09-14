import React, { PropsWithChildren, useCallback } from 'react';
import { Insets, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { BottomSheetAnimationStateContext, BottomSheetAnimationActionContext } from '../contexts/BottomSheetAnimationContext';
import { BottomSheetAnimationAction, BottomSheetAnimationState, SnapInfo } from '../types/bottom-sheet';
import { getPixel } from '../utils/calc-pixel';

type BottomSheetProviderProps = {
    onClose: () => void;
    snapInfo: SnapInfo;
    insets?: Insets;
};

const BottomSheetProvider = ({ children, snapInfo, insets, onClose }: PropsWithChildren<BottomSheetProviderProps>) => {
    const dimensions = useWindowDimensions();
    const numberPointsFromTop = snapInfo.pointsFromTop.map((snapPoint) =>
        getPixel({ baseHeight: dimensions.height - (insets?.top ?? 0), snapPoint }),
    );
    const sortedPointsFromTop = [...numberPointsFromTop].sort();
    const height = useSharedValue(numberPointsFromTop[snapInfo.startIndex]);
    const translateY = useSharedValue(0);

    const bottomSheetClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const updateHeight = useCallback(
        (newHeight: number) => {
            height.value = newHeight;
        },
        [height],
    );

    const updateTranslateY = useCallback(
        (newTranslateY: number) => {
            translateY.value = newTranslateY;
        },
        [translateY],
    );

    const animationState: BottomSheetAnimationState = {
        insets,
        height,
        translateY,
        snapInfo: { startIndex: snapInfo.startIndex, pointsFromTop: sortedPointsFromTop },
        onClose,
    };

    const animationActions: BottomSheetAnimationAction = {
        bottomSheetClose,
        updateHeight,
        updateTranslateY,
    };

    return (
        <BottomSheetAnimationActionContext.Provider value={animationActions}>
            <BottomSheetAnimationStateContext.Provider value={animationState}>
                {children}
            </BottomSheetAnimationStateContext.Provider>
        </BottomSheetAnimationActionContext.Provider>
    );
};

export default BottomSheetProvider;
