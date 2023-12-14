import { color } from '@crawl/design-system';
import type { PropsWithChildren } from 'react';
import React, { useCallback } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { KeyboardState, runOnJS, useAnimatedKeyboard } from 'react-native-reanimated';

import BackDrop, { type BackDropProps } from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import type { SnapInfo } from '../types/bottom-sheet';

import BottomSheetContainer, { type BottomSheetContainerProps } from './BottomSheetContainer';
import BottomSheetHeader, { type BottomSheetHeaderProps } from './BottomSheetHeader';

type BottomSheetState = {
    backDropStyle?: BackDropProps['style'];
    containerStyle?: BottomSheetContainerProps['style'];
    snapInfo: SnapInfo;
};

interface BottomSheetActions {
    onClose(): void;
}

type BottomSheetProps = BottomSheetState & BottomSheetActions & BottomSheetHeaderProps;

export default function BottomSheet({
    containerStyle = {
        borderTopRightRadius: 16,
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
        borderTopStartRadius: 16,
    },
    backDropStyle = {
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    children,
    snapInfo,
    header,
    onClose,
}: PropsWithChildren<BottomSheetProps>) {
    const { state } = useAnimatedKeyboard();

    const handleCloseKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

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
                            <View style={styles.container}>{children}</View>
                        </GestureDetector>
                    ),
                    android: <View style={styles.container}>{children}</View>,
                })}
            </BottomSheetContainer>
        </BottomSheetProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
