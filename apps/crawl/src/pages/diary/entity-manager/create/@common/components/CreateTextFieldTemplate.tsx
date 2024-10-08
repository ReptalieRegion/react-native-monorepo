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

import { type TitleAndDescriptionProps } from './TitleAndDescription';

import { HEADER_HEIGHT } from '@/constants/global';
import useSwipePage, { SwipeState } from '@/hooks/useSwipePage';
import type { EntityManagerCreateNavigationProp } from '@/types/routes/props/diary/entity';

type CreateTemplateState = {
    contents: ReactNode;
    button?: ReactNode;
    contentsAlign?: 'center' | 'top';
};

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps;

const paddingHorizontal = 20;

export default function CreateTextFieldTemplate({ title, contents, button, contentsAlign = 'center' }: CreateTemplateProps) {
    const dimensions = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const { swipeState } = useSwipePage();
    const keyboardMaxHeight = useSharedValue(0);
    const keyboard = useAnimatedKeyboard();
    const titleHeight = useSharedValue(bottom + HEADER_HEIGHT);

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
        const show = Keyboard.addListener('keyboardDidShow', (event) => {
            keyboardMaxHeight.value = event.endCoordinates.height;
        });

        return () => {
            show.remove();
        };
    }, [keyboardMaxHeight, navigation]);

    const buttonAnimationIOS = useAnimatedStyle(() => {
        const { height, state } = keyboard;

        if (swipeState.value === SwipeState.Start) {
            return {
                bottom,
            };
        }

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
                bottom: height.value + bottom,
            };
        }

        if (
            state.value === KeyboardState.UNKNOWN ||
            state.value === KeyboardState.CLOSED ||
            state.value === KeyboardState.CLOSING
        ) {
            return {
                bottom: bottom + 10,
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
