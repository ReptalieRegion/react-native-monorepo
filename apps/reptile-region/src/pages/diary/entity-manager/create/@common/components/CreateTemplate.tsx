import { Typo, color } from '@crawl/design-system';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, type ReactNode } from 'react';
import { Keyboard, Platform, StyleSheet, View, useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import Animated, {
    KeyboardState,
    useAnimatedKeyboard,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type TitleAndDescriptionProps } from '../../../../../../components/diary/atoms/TitleAndDescription/TitleAndDescription';

import { HEADER_HEIGHT } from '@/constants/global';
import type { EntityManagerCreateNavigationProp } from '@/types/routes/props/diary/entity';

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
    const gestureStart = useSharedValue(0);
    const keyboardMaxHeight = useSharedValue(0);
    const keyboard = useAnimatedKeyboard();
    const titleHeight = useSharedValue(32 + HEADER_HEIGHT);

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

    const navigation = useNavigation<EntityManagerCreateNavigationProp>();

    useEffect(() => {
        const transitionStart = navigation.addListener('transitionStart', () => {
            gestureStart.value = 1;
        });
        const transitionEnd = navigation.addListener('transitionEnd', () => {
            gestureStart.value = 0;
        });
        const show = Keyboard.addListener('keyboardDidShow', (event) => {
            keyboardMaxHeight.value = event.endCoordinates.height;
        });

        return () => {
            show.remove();
            transitionStart();
            transitionEnd();
        };
    }, [gestureStart, keyboardMaxHeight, navigation]);

    const buttonAnimationIOS = useAnimatedStyle(() => {
        const { height, state } = keyboard;

        if (gestureStart.value === 1) {
            return {
                bottom,
            };
        }

        if (state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING) {
            const newKeyboardHeight =
                keyboardMaxHeight.value === 0 ? height.value : Math.min(keyboardMaxHeight.value, height.value);
            return {
                transform: [{ translateY: -newKeyboardHeight + bottom }],
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
