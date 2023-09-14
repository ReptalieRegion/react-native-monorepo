import { Insets, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

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
    snapInfo: {
        startIndex: number;
        pointsFromTop: number[];
    };
    onClose: () => void;
};

export type BottomSheetAnimationAction = {
    bottomSheetClose: () => void;
    updateHeight: (height: number) => void;
    updateTranslateY: (translateY: number) => void;
};
