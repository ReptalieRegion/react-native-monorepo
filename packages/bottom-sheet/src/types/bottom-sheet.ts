import type { Insets, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type BackDropStyle = Pick<ViewStyle, 'backgroundColor'>;

export type ContainerStyle = Pick<
    ViewStyle,
    'borderTopRightRadius' | 'borderTopLeftRadius' | 'borderTopStartRadius' | 'borderTopEndRadius'
>;

export type SnapInfo = {
    startIndex: number;
    pointsFromTop: Array<number | string>;
};

export type BottomSheetAnimationState = {
    insets?: Insets;
    height: SharedValue<number>;
    translateY: SharedValue<number>;
    opacity: SharedValue<number>;
    snapInfo: {
        startIndex: number;
        pointsFromTop: number[];
    };
    onClose: () => void;
};

export type BottomSheetAnimationAction = {
    bottomSheetClose: () => void;
};
