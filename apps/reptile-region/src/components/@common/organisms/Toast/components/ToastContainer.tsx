import { Typo } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useToastHandler from '../hooks/useToastHandler';
import useToastState from '../hooks/useToastState';
import { createIcon, createToastStyles } from '../utils/toast-utils';

import { ConditionalRenderer } from '@/components/@common/atoms';

export default function ToastContainer() {
    const { width } = useWindowDimensions();
    const toastWidth = width * 0.95;
    const { top } = useSafeAreaInsets();
    const { show, contents, severity, title } = useToastState();
    const { closeToast } = useToastHandler();
    const toastStyles = createToastStyles(severity);
    const Icon = createIcon(severity);

    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    }));

    useEffect(() => {
        Haptic.trigger('impactLight');
        if (show) {
            translateY.value = withSpring(top, { duration: 1000 }, (firstFinished) => {
                if (firstFinished) {
                    translateX.value = withDelay(
                        200,
                        withTiming(width, { duration: 100 }, (secondFinished) => {
                            'worklet';
                            if (secondFinished) {
                                runOnJS(closeToast)();
                            }
                        }),
                    );
                }
            });

            return () => {
                translateX.value = 0;
                translateY.value = 0;
            };
        }

        return;
    }, [closeToast, show, top, translateX, translateY, width]);

    return (
        <ConditionalRenderer
            condition={show}
            trueContent={
                <View style={styles.container}>
                    <Animated.View
                        style={[
                            styles.toastContainer,
                            {
                                backgroundColor: toastStyles.background,
                                width: toastWidth,
                            },
                            animatedStyle,
                        ]}
                    >
                        <Icon fill={toastStyles.icon} />
                        <Typo variant={'body2'} color={toastStyles.text}>
                            {title}
                            {contents}
                        </Typo>
                    </Animated.View>
                </View>
            }
            falseContent={null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    toastContainer: {
        top: 0,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
