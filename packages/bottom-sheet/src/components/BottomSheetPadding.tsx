import { color } from '@crawl/design-system';
import React, { useCallback, useMemo, type PropsWithChildren } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { KeyboardState, runOnJS, useAnimatedKeyboard } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheetProvider from '../providers/BottomSheetProvider';

import BackDrop from './BackDrop';
import { type BottomSheetProps } from './BottomSheet';
import BottomSheetContainer, { type BottomSheetContainerProps } from './BottomSheetContainer';
import BottomSheetHeader from './BottomSheetHeader';

export default function BottomSheetPadding({
    backDropStyle = {
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    children,
    snapInfo,
    header,
    onClose,
}: PropsWithChildren<BottomSheetProps>) {
    const { state } = useAnimatedKeyboard();
    const { bottom } = useSafeAreaInsets();

    const handleCloseKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    const gesture = Gesture.Pan().onEnd(() => {
        if (state.value === KeyboardState.OPEN) {
            runOnJS(handleCloseKeyboard)();
        }
    });

    const containerStyle = useMemo(
        () => ({ ...styles.bottomSheetContainer, bottom: Platform.select({ ios: bottom, android: bottom + 10 }) }),
        [bottom],
    );

    return (
        <BottomSheetProvider onClose={onClose} snapInfo={snapInfo}>
            <BackDrop style={backDropStyle} />
            <BottomSheetContainer style={containerStyle} border={border}>
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

const border: BottomSheetContainerProps['border'] = {
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomStartRadius: 16,
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopStartRadius: 16,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheetContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        bottom: 20,
    },
});
