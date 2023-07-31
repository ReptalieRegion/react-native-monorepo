import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackDrop, { BackDropStyle } from '../../BackDrop';
import { UIPromptsDefaultProps } from '<UIPrompts>';

export interface BottomSheetContainerProps {
    children: ReactNode;
    containerStyle?: Pick<ViewStyle, 'height' | 'backgroundColor'>;
    backDropStyle?: BackDropStyle;
}

const { width } = Dimensions.get('screen');

const BottomSheetContainer = ({
    containerStyle,
    backDropStyle,
    children,
    uiPromptsClose,
}: BottomSheetContainerProps & UIPromptsDefaultProps) => {
    const { bottom } = useSafeAreaInsets();

    return (
        <BackDrop uiPromptsClose={uiPromptsClose} backDropStyle={backDropStyle}>
            <TouchableWithoutFeedback>
                <View style={[styles.container]}>
                    <View style={[styles.viewContainer, { paddingBottom: bottom }, containerStyle]}>{children}</View>
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
    viewContainer: {
        width: width,
        height: 120,
        backgroundColor: '#FFF',
    },
});

export default BottomSheetContainer;
