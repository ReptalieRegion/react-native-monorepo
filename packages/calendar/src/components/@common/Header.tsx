import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptic from 'react-native-haptic-feedback';

import { LeftArrow, RightArrow } from '../../assets/icons';
import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';

import { headerStyles } from './style';
import type { HeaderProps } from './type';

export default function Header({
    dayNames = ['일', '월', '화', '수', '목', '금', '토'],
    containerStyle,
    labelStyle = {
        variant: 'title3',
        color: 'default',
    },
    monthFormat,
    onPressMonth,
    onPressLeft,
    onPressRight,
}: HeaderProps) {
    const { maxDate, minDate, selectedDate } = useCalendarState();
    const { subMonth, addMonth } = useCalendarHandler();
    const isPossibleNextMonth = maxDate ? selectedDate.isBefore(maxDate, 'month') : true;
    const isPossiblePrevMonth = minDate ? selectedDate.isAfter(minDate, 'month') : true;
    const isSameYear = dayjs().year() === selectedDate.year();
    const label = monthFormat
        ? monthFormat(selectedDate.toDate())
        : isSameYear
          ? selectedDate.format('MM월')
          : selectedDate.format('YY년 MM월');

    const headerWrapperStyle = useMemo(() => [containerStyle, headerStyles.wrapper], [containerStyle]);

    const handlePressPrevMonth = useCallback(() => {
        if (!isPossiblePrevMonth) {
            return;
        }

        if (onPressLeft) {
            onPressLeft();
        } else {
            subMonth();
        }
        Haptic.trigger('impactLight');
    }, [isPossiblePrevMonth, onPressLeft, subMonth]);

    const handlePressNextMonth = useCallback(() => {
        if (!isPossibleNextMonth) {
            return;
        }

        if (onPressRight) {
            onPressRight();
        } else {
            addMonth();
        }
        Haptic.trigger('impactLight');
    }, [isPossibleNextMonth, onPressRight, addMonth]);

    return (
        <View style={headerWrapperStyle}>
            <View style={headerStyles.iconContainer}>
                <TouchableOpacity onPress={handlePressPrevMonth}>
                    <LeftArrow fill={isPossiblePrevMonth ? color.DarkGray[500].toString() : color.Gray[500].toString()} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressMonth}>
                    <Typo variant={labelStyle.variant} color={labelStyle.color}>
                        {label}
                    </Typo>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressNextMonth}>
                    <RightArrow fill={isPossibleNextMonth ? color.DarkGray[500].toString() : color.Gray[500].toString()} />
                </TouchableOpacity>
            </View>
            <DayNames dayNames={dayNames} />
        </View>
    );
}

const DayNames = React.memo(({ dayNames }: { dayNames: string[] }) => {
    return (
        <View style={headerStyles.dayNameWrapper}>
            {dayNames.map((dayName) => (
                <View key={dayName} style={headerStyles.dayName}>
                    <Typo textAlign="center" variant="title4">
                        {dayName}
                    </Typo>
                </View>
            ))}
        </View>
    );
});
