import { color } from '@crawl/design-system';
import React, { useMemo, useState } from 'react';
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

const White = color.White.toString();
const Gray500 = color.Gray[200].toString();

export default function CalendarListItem({ children, containerStyle, onLongPress, ...props }: CalendarListItemProps) {
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const [backgroundColor, setBackgroundColor] = useState(White);

    const handlePress = () => {
        onLongPress?.();
    };

    const handlePressIn = () => {
        scaleX.value = withTiming(0.97, userConfig);
        scaleY.value = withTiming(0.97, userConfig);
        setBackgroundColor(Gray500);
    };

    const handlePressOut = () => {
        scaleX.value = withTiming(1, userConfig);
        scaleY.value = withTiming(1, userConfig);
        setBackgroundColor(White);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor,
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }));

    const containerWrapperStyle = useMemo(
        () => [listStyles.itemContainer, animatedStyle, containerStyle],
        [animatedStyle, containerStyle],
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
