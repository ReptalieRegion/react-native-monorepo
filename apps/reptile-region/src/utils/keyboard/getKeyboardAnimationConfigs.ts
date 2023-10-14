import { Platform } from 'react-native';
import type { KeyboardEventEasing } from 'react-native';
import { Easing } from 'react-native-reanimated';

const ANIMATION_CONFIGS_IOS = {
    stiffness: 1000,
    velocity: 0,
    mass: 3,
    damping: 500,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
};

const ANIMATION_CONFIGS_ANDROID = {
    duration: 250,
    easing: Easing.out(Easing.exp),
};

const ANIMATION_CONFIGS = (duration: number) => {
    return Platform.OS === 'ios' ? ANIMATION_CONFIGS_IOS : { ...ANIMATION_CONFIGS_ANDROID, duration };
};

export const getKeyboardAnimationConfigs = (easing: KeyboardEventEasing, duration: number) => {
    switch (easing) {
        case 'keyboard':
            return ANIMATION_CONFIGS(duration);
        case 'easeIn':
            return {
                easing: Easing.in(Easing.ease),
                duration,
            };
        case 'easeOut':
            return {
                easing: Easing.out(Easing.ease),
                duration,
            };
        case 'easeInEaseOut':
            return {
                easing: Easing.inOut(Easing.ease),
                duration,
            };
        case 'linear':
            return {
                easing: Easing.linear,
                duration,
            };
    }
};
