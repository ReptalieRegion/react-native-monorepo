import React, { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';

import BackDrop, { BackDropStyle } from '../../BackDrop';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import { color } from '@/components/common/tokens/colors';
import useKeyboard from '@/hooks/useKeyboard';

type TranslateStyle = {
    transform: {
        translateY: number;
    }[];
};
type AnimatedStyle = Pick<ViewStyle, 'height'>;
export type ConTainerStyle = Pick<ViewStyle, 'backgroundColor' | 'borderRadius'>;

export type BottomSheetContainerProps = {
    closeAnimatedStyles?: TranslateStyle;
    snapAnimatedStyles?: AnimatedStyle;
    containerStyle?: ConTainerStyle;
    backDropStyle?: BackDropStyle;
};

const { width } = Dimensions.get('screen');

const BottomSheetContainer = ({
    children,
    containerStyle,
    backDropStyle,
    snapAnimatedStyles,
    closeAnimatedStyles,
    uiPromptsClose,
}: PropsWithChildren<BottomSheetContainerProps & UIPromptsDefaultProps>) => {
    const { keyboardStyle } = useKeyboard();

    return (
        <>
            <BackDrop uiPromptsClose={uiPromptsClose} backDropStyle={backDropStyle} />
            <Animated.View style={[styles.container, closeAnimatedStyles]}>
                <Animated.View style={[styles.viewContainer, containerStyle, snapAnimatedStyles]}>
                    {children}
                    <Animated.View style={keyboardStyle}>
                        <View style={styles.bottom}>
                            <FastImage
                                style={styles.circle}
                                source={{
                                    uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F009%2F2022%2F06%2F08%2F0004974574_002_20220608070201911.jpg&type=a340',
                                    priority: FastImage.priority.normal,
                                    cache: FastImage.cacheControl.web,
                                }}
                            />
                            <TextInput placeholder="댓글을 입력하세요..." style={styles.textInput} autoFocus multiline />
                            <Text style={styles.submit}>등록</Text>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
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
    bottom: {
        zIndex: 101,
        backgroundColor: color.White.toString(),
        padding: 8,
        borderTopColor: color.Gray[250].toString(),
        borderTopWidth: 0.5,
        width: Dimensions.get('screen').width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    textInput: {
        padding: 10,
        width: (Dimensions.get('screen').width - 30 - 20) * 0.85,
        borderColor: color.Gray[250].toString(),
        borderWidth: 0.5,
        borderRadius: 20,
        height: 30,
        maxHeight: 100,
    },
    submit: {
        color: color.Green['750'].toString(),
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
});

export default BottomSheetContainer;
