import { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';

const useScaleDownAndUp = () => {
    const scale = useSharedValue(1);

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const scaleDown = () => {
        scale.value = withTiming(0.85, { duration: 150, easing: Easing.bezier(0.4, 0, 0.2, 1) });
    };

    const scaleUp = () => {
        scale.value = withTiming(1, { duration: 150, easing: Easing.bezier(0.4, 0, 0.2, 1) });
    };

    return { scaleStyle, scaleDown, scaleUp };
};

export default useScaleDownAndUp;
