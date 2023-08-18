import { useEffect } from 'react';
import { Keyboard, KeyboardEvent, KeyboardEventName, Platform } from 'react-native';
import { useAnimatedStyle, useSharedValue, useWorkletCallback, withSpring, withTiming } from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';
import { WithTimingConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/timing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getKeyboardAnimationConfigs } from '@/utils/keyboard/getKeyboardAnimationConfigs';

const KEYBOARD_EVENT_MAPPER = {
    KEYBOARD_SHOW: Platform.select({
        ios: 'keyboardWillShow',
        android: 'keyboardDidShow',
        default: '',
    }) as KeyboardEventName,
    KEYBOARD_HIDE: Platform.select({
        ios: 'keyboardWillHide',
        android: 'keyboardDidHide',
        default: '',
    }) as KeyboardEventName,
};

const useKeyboard = () => {
    const { bottom } = useSafeAreaInsets();
    const isKeyboardShow = useSharedValue<boolean>(false);
    const userConfig = useSharedValue<WithTimingConfig | SpringConfig | null>(null);
    const keyboardHeight = useSharedValue(bottom);
    const keyboardStyle = useAnimatedStyle(() => ({
        paddingBottom: keyboardHeight.value,
    }));

    const handleKeyboardHeight = useWorkletCallback((height: number, configs: WithTimingConfig | SpringConfig) => {
        if ('easing' in configs) {
            return withTiming(height, configs);
        }

        return withSpring(height, configs);
    }, []);

    const handleKeyboardEvent = useWorkletCallback(
        ({ duration, easing, endCoordinates }: KeyboardEvent, type: 'SHOW' | 'HIDE') => {
            const isShow = type === 'SHOW';
            isKeyboardShow.value = isShow;

            const configs = getKeyboardAnimationConfigs(easing, duration);
            userConfig.value = configs;

            const newHeight = isShow ? endCoordinates.height : bottom;
            keyboardHeight.value = handleKeyboardHeight(newHeight, configs);
        },
        [keyboardHeight],
    );

    useEffect(() => {
        const handleOnKeyboardShow = (event: KeyboardEvent) => {
            handleKeyboardEvent(event, 'SHOW');
        };

        const handleOnKeyboardHide = (event: KeyboardEvent) => {
            handleKeyboardEvent(event, 'HIDE');
        };

        const subscriptions = [
            Keyboard.addListener(KEYBOARD_EVENT_MAPPER.KEYBOARD_SHOW, handleOnKeyboardShow),
            Keyboard.addListener(KEYBOARD_EVENT_MAPPER.KEYBOARD_HIDE, handleOnKeyboardHide),
        ];

        return () => {
            subscriptions.forEach((subscription) => subscription.remove());
        };
    }, [handleKeyboardEvent, isKeyboardShow]);

    return {
        isKeyboardShow,
        keyboardHeight,
        keyboardStyle,
        userConfig,
        handleKeyboardHeight,
    };
};

export default useKeyboard;
