import { Animated, Easing } from 'react-native';

const useScaleDownAndUp = () => {
    const scale = new Animated.Value(1);

    const scaleDown = () => {
        Animated.timing(scale, {
            toValue: 0.85,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const scaleUp = () => {
        Animated.timing(scale, {
            toValue: 1,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    return { scale, scaleDown, scaleUp };
};

export default useScaleDownAndUp;
