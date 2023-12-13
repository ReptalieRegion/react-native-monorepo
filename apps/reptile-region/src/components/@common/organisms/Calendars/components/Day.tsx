import { Typo, type TextColorType } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import type { DateType, DotStyle, MarkingStyle } from '../type';

type DayState = {
    date: DateType;
    textColor?: TextColorType;
    markingStyle?: MarkingStyle;
    dotStyle?: DotStyle;
};

interface DayActions {
    onPress?(): void;
}

type DayProps = DayState & DayActions;

export default React.memo(function Day({ date, textColor = 'default', markingStyle, dotStyle, onPress }: DayProps) {
    return (
        <Animated.View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} style={styles.dayContainer}>
                <View style={[markingStyle, styles.circle, styles.markingBase]}>
                    <Typo color={textColor} variant="title4">
                        {date.date}
                    </Typo>
                </View>
                <View style={[styles.circle, dotStyle]} />
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 50,
        maxHeight: 50,
    },
    circle: {
        borderRadius: 9999,
    },
    markingBase: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        gap: 5,
    },
});
