import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackDrop, { BackDropStyle } from '../../BackDrop';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import { color } from '@/components/common/tokens/colors';

export type ConTainerStyle = Pick<ViewStyle, 'height' | 'backgroundColor' | 'borderRadius'>;

export interface BottomSheetContainerProps {
    children: ReactNode;
    containerStyle?: ConTainerStyle;
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
        <>
            <BackDrop uiPromptsClose={uiPromptsClose} backDropStyle={backDropStyle} />
            <TouchableWithoutFeedback>
                <View style={[styles.container]}>
                    <View style={[styles.viewContainer, { paddingBottom: bottom }, containerStyle]}>{children}</View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});

export default BottomSheetContainer;
