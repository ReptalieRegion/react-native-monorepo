import { Typo, color } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ALERT_STYLES } from './token';

import { ConditionalRenderer } from '@/components/@common/atoms';

type ButtonType = {
    text: string;
    style?: keyof typeof ALERT_STYLES;
    onPress?(): void;
};

type AlertState = {
    title?: string;
    contents?: string;
    buttons: ButtonType[];
};

interface AlertActions {
    onClose(): void;
}

export type AlertProps = AlertState & AlertActions;

export default function Alert({ title, contents, buttons, onClose }: AlertProps) {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.95);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 150 });
        scale.value = withTiming(1, { duration: 150 });
    }, [opacity, scale]);

    const wrapperStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const containerStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <TouchableWithoutFeedback style={styles.wrapper} containerStyle={styles.wrapper} onPress={onClose}>
            <Animated.View style={[styles.wrapper, wrapperStyles]} exiting={FadeOut}>
                <Animated.View style={[styles.container, containerStyles]}>
                    <View style={styles.titleWrapper}>
                        <ConditionalRenderer condition={!!title} trueContent={<Typo variant="title3">{title}</Typo>} />
                        <ConditionalRenderer condition={!!contents} trueContent={<Typo variant="body2">{contents}</Typo>} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        {buttons.map(({ text, style, onPress }) => {
                            const textStyle = style ? ALERT_STYLES[style] : ALERT_STYLES.default;
                            return (
                                <TouchableOpacity
                                    key={text}
                                    onPress={() => {
                                        onPress?.();
                                        onClose();
                                    }}
                                >
                                    <Typo color={textStyle.color} variant={textStyle.variant}>
                                        {text}
                                    </Typo>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    container: {
        width: '85%',
        backgroundColor: color.White.toString(),
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    titleWrapper: {
        gap: 5,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 25,
        gap: 25,
    },
});
