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
    isBackdropClosable?: boolean;
    buttons?: ButtonType[];
};

interface AlertActions {
    onClose(): void;
}

export type AlertProps = AlertState & AlertActions;

export default function Alert({ title, contents, buttons, isBackdropClosable = true, onClose }: AlertProps) {
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
        <View style={styles.touchWrapper}>
            <TouchableWithoutFeedback
                style={styles.touchContainer}
                containerStyle={styles.touchContainer}
                onPress={isBackdropClosable ? onClose : undefined}
            >
                <Animated.View style={wrapperStyles} />
            </TouchableWithoutFeedback>
            <Animated.View style={styles.wrapper} exiting={FadeOut}>
                <Animated.View style={[styles.container, containerStyles]}>
                    <View style={styles.titleWrapper}>
                        <ConditionalRenderer condition={!!title} trueContent={<Typo variant="title3">{title}</Typo>} />
                        <ConditionalRenderer condition={!!contents} trueContent={<Typo variant="body2">{contents}</Typo>} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        {buttons?.map(({ text, style, onPress }) => {
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
        </View>
    );
}

const styles = StyleSheet.create({
    touchWrapper: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
