import { Typo, color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import Animated, {
    KeyboardState,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type TitleAndDescriptionProps } from '../../atoms/TitleAndDescription/TitleAndDescription';

import { headerHeight } from '@/constants/global';

type CreateTemplateState = {
    contents: ReactNode;
    button?: ReactNode;
    contentsAlign?: 'center' | 'top';
};

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps;

const paddingHorizontal = 20;

export default function CreateTemplate({ title, contents, button, contentsAlign = 'center' }: CreateTemplateProps) {
    const dimensions = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const keyboard = useAnimatedKeyboard();
    const titleHeight = useSharedValue(32 + headerHeight);

    const contentsAnimation = useAnimatedStyle(() => {
        const isCenter = contentsAlign === 'center';
        if (isCenter) {
            return {
                flex: 1,
                paddingHorizontal,
                marginTop: -20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: titleHeight.value,
            };
        }

        return {
            flex: 1,
            paddingHorizontal,
            paddingBottom: titleHeight.value,
        };
    }, [dimensions, titleHeight.value]);

    const buttonAnimationIOS = useAnimatedStyle(() => {
        const { height, state } = keyboard;
        if (state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING) {
            return {
                transform: [{ translateY: -height.value + bottom }],
            };
        }

        if (state.value === KeyboardState.CLOSED || state.value === KeyboardState.CLOSING) {
            return {
                transform: [{ translateY: withTiming(0, { duration: 100 }) }],
            };
        }
        return {
            bottom,
        };
    }, [keyboard, bottom]);

    const buttonAnimationAndroid = useAnimatedStyle(() => {
        const { height, state } = keyboard;
        if (state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING) {
            return {
                transform: [{ translateY: -height.value + bottom }],
            };
        }

        if (
            state.value === KeyboardState.UNKNOWN ||
            state.value === KeyboardState.CLOSED ||
            state.value === KeyboardState.CLOSING
        ) {
            return {
                bottom: 0,
                transform: [{ translateY: -20 }],
            };
        }
        return {
            bottom,
        };
    }, [keyboard, bottom]);

    const buttonAnimation = Platform.select({
        ios: buttonAnimationIOS,
        android: buttonAnimationAndroid,
    });

    const handleLayout = (event: LayoutChangeEvent) => {
        titleHeight.value = event.nativeEvent.layout.height;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.title} onLayout={handleLayout}>
                <Typo variant="heading1">{title}</Typo>
            </View>
            <Animated.View style={contentsAnimation}>{contents}</Animated.View>
            <Animated.View style={[styles.button, buttonAnimation]}>{button}</Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.White.toString(),
    },
    title: {
        paddingVertical: 40,
        paddingHorizontal,
    },
    button: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: color.White.toString(),
    },
});
