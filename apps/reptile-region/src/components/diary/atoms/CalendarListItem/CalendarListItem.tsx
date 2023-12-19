import { color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import React, { useMemo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import type { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type CalendarListItemState = {
    containerStyle: ViewStyle;
    pressInBackground: string;
    children: React.ReactNode;
};

interface CalendarListItemActions {}

type CalendarListItemProps = CalendarListItemState & CalendarListItemActions & Omit<GenericTouchableProps, 'containerStyle'>;

const userConfig = {
    duration: 100,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
};

export default function ScaleListItem({
    children,
    pressInBackground,
    containerStyle,
    onLongPress,
    ...props
}: CalendarListItemProps) {
    const { state, off, on } = useOnOff();
    const scale = useSharedValue(1);

    const handlePress = () => {
        onLongPress?.();
    };

    const handlePressIn = () => {
        scale.value = withTiming(0.98, userConfig);
        on();
    };

    const handlePressOut = () => {
        scale.value = withTiming(1, userConfig);
        off();
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const containerWrapperStyle = useMemo(
        () => [
            listStyles.itemContainer,
            animatedStyle,
            containerStyle,
            { backgroundColor: state ? pressInBackground : undefined },
        ],
        [animatedStyle, containerStyle, pressInBackground, state],
    );

    return (
        <TouchableWithoutFeedback
            onLongPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={listStyles.item}
            {...props}
        >
            <Animated.View style={containerWrapperStyle}>{children}</Animated.View>
        </TouchableWithoutFeedback>
    );
}

const listStyles = StyleSheet.create({
    item: {
        width: '100%',
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        borderRadius: 20,
        backgroundColor: color.White.toString(),
    },
});
