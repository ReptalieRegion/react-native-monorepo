import { Typo, color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type TitleAndDescriptionProps } from '../../atoms/TitleAndDescription/TitleAndDescription';

import { headerHeight } from '@/constants/global';

type CreateTemplateState = {
    contents: ReactNode;
    button?: ReactNode;
    contentsAlign?: 'center' | 'top';
};

interface CreateTemplateActions {}

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps & CreateTemplateActions;

const paddingHorizontal = 20;

export default function CreateTemplate({ title, contents, button, contentsAlign = 'center' }: CreateTemplateProps) {
    const dimensions = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const { height, state } = useAnimatedKeyboard();
    const titleHeight = useSharedValue(32 + headerHeight);

    const buttonAnimation = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            justifyContent: 'flex-end',
            minHeight: titleHeight.value + headerHeight,
            width: isOpenState ? dimensions.width : undefined,
            transform: [{ translateY: -height.value }],
            paddingHorizontal: isOpenState ? 0 : paddingHorizontal,
        };
    }, [height.value, titleHeight.value, state.value, dimensions.width, bottom]);

    const isCenter = contentsAlign === 'center';
    const contentsStyles: ViewStyle = {
        flex: 1,
        paddingHorizontal,
        justifyContent: isCenter ? 'center' : undefined,
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        titleHeight.value = event.nativeEvent.layout.height;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.title} onLayout={handleLayout}>
                <Typo variant="heading1">{title}</Typo>
            </View>
            <View style={contentsStyles}>{contents}</View>
            <Animated.View style={buttonAnimation}>{button}</Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.White.toString(),
    },
    title: {
        paddingVertical: 40,
        paddingHorizontal,
    },
});
