import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackDrop from '../../BackDrop';
import { UIPromptsDefaultProps } from '<UIPrompts>';

export interface BottomSheetContainerProps {
    children: ReactNode;
    height?: string | number | undefined;
    backDropColor?: string;
    backgroundColor?: string;
}

const { width } = Dimensions.get('screen');

const BottomSheetContainer = ({
    height = 120,
    backDropColor,
    backgroundColor = '#FFFFFF',
    children,
    uiPromptsClose,
}: BottomSheetContainerProps & UIPromptsDefaultProps) => {
    const { bottom } = useSafeAreaInsets();

    return (
        <BackDrop uiPromptsClose={uiPromptsClose} backDropColor={backDropColor}>
            <TouchableWithoutFeedback>
                <View style={[styles.container]}>
                    <View style={{ paddingBottom: bottom, backgroundColor, width, height }}>{children}</View>
                </View>
            </TouchableWithoutFeedback>
        </BackDrop>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
    },
});

export default BottomSheetContainer;
