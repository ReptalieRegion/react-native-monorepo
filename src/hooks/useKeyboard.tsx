import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, KeyboardEventName, Platform } from 'react-native';
import { useAnimatedStyle, useSharedValue, useWorkletCallback, withSpring, withTiming } from 'react-native-reanimated';
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
    const [isKeyboardWillShow, setIsKeyboardWillShow] = useState<boolean>(false);
    const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
    const keyboardHeight = useSharedValue(bottom);
    const keyboardStyle = useAnimatedStyle(() => ({
        paddingBottom: keyboardHeight.value,
    }));

    const handleKeyboardEvent = useWorkletCallback(
        (event: KeyboardEvent, type: 'SHOW' | 'HIDE') => {
            const {
                duration,
                easing,
                endCoordinates: { height },
            } = event;

            const newHeight = type === 'SHOW' ? height : bottom;
            const configs = getKeyboardAnimationConfigs(easing, duration);

            if ('easing' in configs) {
                keyboardHeight.value = withTiming(newHeight, configs);
            } else {
                keyboardHeight.value = withSpring(newHeight, configs);
            }
        },
        [keyboardHeight],
    );

    useEffect(() => {
        const openKeyboard = () => {
            setIsKeyboardShow(true);
        };

        const closeKeyboard = () => {
            setIsKeyboardShow(false);
        };

        const willOpenKeyboard = () => {
            setIsKeyboardWillShow(true);
        };

        const handleOnKeyboardShow = (event: KeyboardEvent) => {
            handleKeyboardEvent(event, 'SHOW');
        };

        const handleOnKeyboardHide = (event: KeyboardEvent) => {
            handleKeyboardEvent(event, 'HIDE');
        };

        const subscriptions = [
            Keyboard.addListener(KEYBOARD_EVENT_MAPPER.KEYBOARD_SHOW, handleOnKeyboardShow),
            Keyboard.addListener(KEYBOARD_EVENT_MAPPER.KEYBOARD_HIDE, handleOnKeyboardHide),
            Keyboard.addListener('keyboardWillShow', willOpenKeyboard),
            Keyboard.addListener('keyboardDidShow', openKeyboard),
            Keyboard.addListener('keyboardDidHide', closeKeyboard),
        ];

        return () => {
            subscriptions.forEach((subscription) => subscription.remove());
        };
    }, [handleKeyboardEvent]);

    return {
        isKeyboardShow,
        isKeyboardWillShow,
        keyboardHeight,
        keyboardStyle,
    };
};

export default useKeyboard;
