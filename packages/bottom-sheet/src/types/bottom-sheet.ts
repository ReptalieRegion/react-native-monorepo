import type { SharedValue } from 'react-native-reanimated';

type SnapInfo = {
    startIndex: number;
    pointsFromTop: Array<number | string>;
};

type BottomSheetAnimationState = {
    height: SharedValue<number>;
    translateY: SharedValue<number>;
    opacity: SharedValue<number>;
    snapInfo: {
        startIndex: number;
        pointsFromTop: number[];
    };
    onClose: () => void;
};

type BottomSheetAnimationAction = {
    bottomSheetClose: () => Promise<void>;
};

export type { BottomSheetAnimationAction, BottomSheetAnimationState, SnapInfo };
