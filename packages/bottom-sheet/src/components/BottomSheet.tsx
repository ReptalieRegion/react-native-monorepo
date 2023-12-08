import { color } from '@reptile-region/design-system';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { KeyboardState, runOnJS, useAnimatedKeyboard } from 'react-native-reanimated';

import BackDrop from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import type { BackDropStyle, ContainerStyle, SnapInfo } from '../types/bottom-sheet';

import BottomSheetContainer from './BottomSheetContainer';
import BottomSheetHeader, { type BottomSheetHeaderProps } from './BottomSheetHeader';

type BottomSheetProps = {
    onClose: () => void;
    backDropStyle?: BackDropStyle;
    containerStyle?: ContainerStyle;
    snapInfo: SnapInfo;
} & BottomSheetHeaderProps;

const BottomSheet = ({
    containerStyle = {
        borderTopRightRadius: 16,
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
        borderTopStartRadius: 16,
    },
    backDropStyle = { backgroundColor: color.DarkGray[500].alpha(0.3).toString() },
    children,
    snapInfo,
    header,
    onClose,
}: PropsWithChildren<BottomSheetProps>) => {
    const { state } = useAnimatedKeyboard();

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    const gesture = Gesture.Pan().onEnd(() => {
        if (state.value === KeyboardState.OPEN) {
            runOnJS(handleCloseKeyboard)();
        }
    });

    return (
        <BottomSheetProvider onClose={onClose} snapInfo={snapInfo}>
            <BackDrop style={backDropStyle} />
            <BottomSheetContainer style={{ ...containerStyle }}>
                <BottomSheetHeader header={header} />
                {Platform.select({
                    ios: (
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={styles.container}>{children}</Animated.View>
                        </GestureDetector>
                    ),
                    android: <Animated.View style={styles.container}>{children}</Animated.View>,
                })}
            </BottomSheetContainer>
        </BottomSheetProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BottomSheet;
