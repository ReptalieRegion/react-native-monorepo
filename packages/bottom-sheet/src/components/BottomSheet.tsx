import { color } from '@crawl/design-system';
import type { PropsWithChildren } from 'react';
import React, { useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { KeyboardState, runOnJS, useAnimatedKeyboard } from 'react-native-reanimated';

import BackDrop, { type BackDropProps } from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import type { SnapInfo } from '../types/bottom-sheet';

import BottomSheetContainer from './BottomSheetContainer';
import BottomSheetHeader, { type BottomSheetHeaderProps } from './BottomSheetHeader';

type BottomSheetState = {
    backDropStyle?: BackDropProps['style'];
    snapInfo: SnapInfo;
};

interface BottomSheetActions {
    onClose(): void;
}

export type BottomSheetProps = BottomSheetState & BottomSheetActions & BottomSheetHeaderProps;

export default function BottomSheet({
    backDropStyle = {
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    children,
    snapInfo,
    headerTitle,
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
        <>
            <BottomSheetProvider onClose={onClose} snapInfo={snapInfo}>
                <BackDrop style={backDropStyle} />
                <BottomSheetContainer>
                    <BottomSheetHeader header={header} headerTitle={headerTitle} />
                    {Platform.select({
                        ios: <GestureDetector gesture={gesture}>{children}</GestureDetector>,
                        android: <>{children}</>,
                    })}
                </BottomSheetContainer>
            </BottomSheetProvider>
        </>
    );
}
