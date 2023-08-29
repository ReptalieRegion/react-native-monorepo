import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
    WithTimingConfig,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import type { IconProps } from '<Icon>';
import { color } from '@/components/common/tokens/colors';

const userConfig: WithTimingConfig = {
    duration: 200,
};

const BottomTabBarButton = ({
    isFocused,
    onPress,
    Icon,
    name,
}: {
    isFocused: boolean;
    onPress: () => void;
    Icon: (props: IconProps) => React.JSX.Element;
    name: string;
}) => {
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }));

    const handlePressInIcon = () => {
        scaleX.value = withTiming(0.9, userConfig);
        scaleY.value = withTiming(0.9, userConfig);
    };

    const handlePressOutIcon = () => {
        scaleX.value = withSequence(withTiming(1.25, userConfig), withTiming(1.0, userConfig));
        scaleY.value = withSequence(withTiming(1.15, userConfig), withTiming(1.0, userConfig));
    };

    return (
        <View style={styles.iconContainer}>
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={handlePressInIcon}
                onPressOut={handlePressOutIcon}
                containerStyle={styles.touchContainer}
            >
                <View style={styles.icon}>
                    <Animated.View style={animatedStyle}>
                        <Icon fill={isFocused ? color.Teal[250].toString() : undefined} />
                    </Animated.View>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
    },
    touchContainer: {
        width: '100%',
    },
    icon: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
        marginTop: 6,
    },
});

export default BottomTabBarButton;
