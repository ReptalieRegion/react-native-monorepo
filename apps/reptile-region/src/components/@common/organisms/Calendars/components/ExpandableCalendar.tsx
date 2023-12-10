import { Typo, color, type TextColorType } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions, type ViewStyle } from 'react-native';
import { AgendaList, Calendar, CalendarProvider, WeekCalendar, type DateData } from 'react-native-calendars';
import type { DayProps } from 'react-native-calendars/src/calendar/day';
import type { MarkedDates, Theme } from 'react-native-calendars/src/types';
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import useCalendarHandler from '../hooks/useCalendarHandler';
import useCalendarState from '../hooks/useCalendarState';
import { agendaItems, getMarkedDates } from '../mock/data';

import { LeftArrow, RightArrow } from '@/assets/icons';
import AgendaItem from '@/pages/diary/calender/AgendaItem';

dayjs.locale('ko');
const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * react-native-calendars 라이브러리에서 지원하지 않지만
 * dayNames 색상 변경하기 위해서 임시 적용
 * type error를 막기 위해 as 적용
 */
export const expandableCalendarTheme: Theme = {
    stylesheet: {
        calendar: {
            header: {
                dayTextAtIndex0: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex1: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex2: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex3: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex4: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex5: {
                    color: color.Gray[500].toString(),
                },
                dayTextAtIndex6: {
                    color: color.Gray[500].toString(),
                },
            },
            main: {
                week: {
                    margin: 0,
                },
            },
        },
    },
    todayTextColor: color.DarkGray[500].toString(),
    selectedDayTextColor: color.DarkGray[500].toString(),
    dayTextColor: color.DarkGray[500].toString(),
    selectedDayBackgroundColor: color.Gray[300].toString(),
    textDayHeaderFontSize: 16,
    textDayFontWeight: '600',
    textMonthFontSize: 16,
    textMonthFontWeight: '600',
    weekVerticalMargin: 10,
};

export default function ExpandableCalendar() {
    const marked = useRef(getMarkedDates());
    const currentDay = useRef(dayjs().format('YYYY-MM-DD'));

    const { selectedDate, weekCountInMonth, selectedWeekNumber } = useCalendarState();
    const selectedDateString = selectedDate.format('YYYY-MM-DD');
    const { addMonth, subMonth, setDate } = useCalendarHandler();

    const renderHeader = useCallback(() => {
        return (
            <View style={[headerStyles.headerWrapper, { height: 80 }]}>
                <View style={[styles.calendarHeader]}>
                    <TouchableOpacity onPress={subMonth}>
                        <LeftArrow fill={color.DarkGray[500].toString()} />
                    </TouchableOpacity>
                    <Typo>{selectedDate.format('MM월')}</Typo>
                    <TouchableOpacity onPress={addMonth}>
                        <RightArrow fill={color.DarkGray[500].toString()} />
                    </TouchableOpacity>
                </View>
                <View style={headerStyles.dayNamesContainer}>
                    {dayNames.map((dayName) => (
                        <View key={dayName} style={headerStyles.dayName}>
                            <Typo textAlign="center" variant="body3">
                                {dayName}
                            </Typo>
                        </View>
                    ))}
                </View>
            </View>
        );
    }, [subMonth, selectedDate, addMonth]);

    const dayComponent = useCallback(
        ({ date, state, marking }: DayProps & { date?: DateData | undefined }) => {
            const viewStyle: ViewStyle | undefined = marking?.selected
                ? {
                      borderRadius: 9999,
                      backgroundColor: marking.selectedColor,
                  }
                : undefined;
            const dotStyle: ViewStyle | undefined = marking?.marked
                ? {
                      backgroundColor: marking.dotColor,
                      borderRadius: 9999,
                  }
                : undefined;
            const typoColor: TextColorType = state === 'disabled' ? 'placeholder' : 'default';

            const handlePressDay = () => {
                if (state !== 'disabled' && date?.dateString) {
                    setDate(date.dateString);
                }
            };

            return (
                <Animated.View style={[dayStyles.wrapper, marking?.customTextStyle]}>
                    <TouchableOpacity onPress={handlePressDay} style={dayStyles.dayContainer}>
                        <View style={[dayStyles.day, viewStyle]}>
                            <Typo color={typoColor}>{date?.day}</Typo>
                        </View>
                        <View style={[dayStyles.dot, dotStyle]} />
                    </TouchableOpacity>
                </Animated.View>
            );
        },
        [setDate],
    );

    /** Animation */
    const { state: isShowWeek, off: hideWeek, on: showWeek } = useOnOff();
    const startTranslateY = useSharedValue(0);
    const startListTranslateY = useSharedValue(0);
    const translateY = useSharedValue(0);
    const listTranslateY = useSharedValue(0);

    const calenderGoalTranslateY = useMemo(() => -50 * (selectedWeekNumber - 1), [selectedWeekNumber]);
    const listGoalTranslateY = useMemo(
        () => -50 * (weekCountInMonth - selectedWeekNumber),
        [selectedWeekNumber, weekCountInMonth],
    );

    /** 달이 변했을 때, 위치 초기화 */
    const lastMonth = useRef(selectedDateString);

    if (!selectedDate.isSame(lastMonth.current, 'month') && isShowWeek) {
        lastMonth.current = selectedDateString;
        translateY.value = calenderGoalTranslateY;
        listTranslateY.value = listGoalTranslateY + calenderGoalTranslateY;
    }

    const gesture = Gesture.Pan()
        .onStart(() => {
            startTranslateY.value = translateY.value;
            startListTranslateY.value = listTranslateY.value;
        })
        .onChange((event) => {
            translateY.value = Math.min(Math.max(startListTranslateY.value + event.translationY, calenderGoalTranslateY), 0);
            listTranslateY.value = Math.min(
                Math.max(startListTranslateY.value + event.translationY, listGoalTranslateY + calenderGoalTranslateY),
                0,
            );

            const isDownSwipe = event.velocityY > 0;
            if (isDownSwipe) {
                runOnJS(hideWeek)();
            }
        })
        .onEnd((event) => {
            const isDownSwipe = event.velocityY > 0;
            if (isDownSwipe) {
                translateY.value = withTiming(0);
                listTranslateY.value = withTiming(0);
                runOnJS(hideWeek)();
                return;
            }

            const isUpSwipe = event.velocityY < 0;
            if (isUpSwipe) {
                translateY.value = withTiming(calenderGoalTranslateY);
                listTranslateY.value = withTiming(listGoalTranslateY + calenderGoalTranslateY);
                runOnJS(showWeek)();
                return;
            }
        });

    const { height } = useWindowDimensions();
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const markedDates: MarkedDates = useMemo(
        () => ({
            ...marked.current,
            [selectedDateString]: {
                ...marked.current[selectedDateString],
                selected: true,
                disableTouchEvent: true,
                selectedColor: color.Gray[300].toString(),
            },
        }),
        [selectedDateString],
    );

    const listAnimatedStyle = useAnimatedStyle(() => ({
        height: height - 380 + listTranslateY.value,
        transform: [{ translateY: listTranslateY.value }],
    }));
    console.log(height - 380 - listTranslateY.value);
    /** Animation */

    const renderItem = useCallback(({ item }: any) => {
        return <AgendaItem item={item} />;
    }, []);

    const weekCalendar = useCallback(() => {
        return (
            <View style={weekStyles.container}>
                <CalendarProvider date={selectedDateString} timelineLeftInset={0}>
                    <WeekCalendar
                        maxDate={currentDay.current}
                        firstDay={0}
                        theme={expandableCalendarTheme}
                        allowShadow={false}
                        dayComponent={dayComponent}
                        markedDates={markedDates}
                        style={[weekStyles.calendar, weekStyles.week]}
                        hideDayNames
                        hideArrows
                    />
                </CalendarProvider>
            </View>
        );
    }, [dayComponent, markedDates, selectedDateString]);

    const calendar = useCallback(() => {
        return (
            <Animated.View style={[weekStyles.calendarContainer, animatedStyle]}>
                <Calendar
                    initialDate={selectedDateString}
                    maxDate={currentDay.current}
                    firstDay={0}
                    headerStyle={headerStyles.noHeader}
                    theme={expandableCalendarTheme}
                    allowShadow={false}
                    style={weekStyles.calendar}
                    dayComponent={dayComponent}
                    markedDates={markedDates}
                    hideDayNames
                    hideArrows
                />
            </Animated.View>
        );
    }, [animatedStyle, markedDates, selectedDateString, dayComponent]);

    const list = useCallback(() => {
        return (
            <Animated.View style={listAnimatedStyle}>
                <AgendaList
                    style={{ height: height - 380 + listGoalTranslateY }}
                    sections={agendaItems}
                    onScroll={(event) => {
                        const { contentOffset } = event.nativeEvent;
                        if (contentOffset.y <= 0) {
                            hideWeek();
                            translateY.value = withTiming(0);
                            listTranslateY.value = withTiming(0);
                        }
                    }}
                    keyExtractor={(props) => dayjs(props.date).format('YYYY-MM-DD').concat(props.name)}
                    renderItem={renderItem}
                    dayFormatter={(day) => dayjs(day).locale('ko').format('D일 ddd요일')}
                    markToday={false}
                />
            </Animated.View>
        );
    }, [listAnimatedStyle, height, listGoalTranslateY, renderItem, hideWeek, translateY, listTranslateY]);

    return (
        <>
            {renderHeader()}
            <View>
                <GestureDetector gesture={gesture}>
                    <View style={{ height: 50 * weekCountInMonth }}>
                        {calendar()}
                        {isShowWeek && weekCalendar()}
                    </View>
                </GestureDetector>
            </View>
            {list()}
        </>
    );
}

const weekStyles = StyleSheet.create({
    calendarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 30,
    },
    calendar: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    week: {
        marginTop: 10,
        marginBottom: 10,
    },
});

const dayStyles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 30,
        maxHeight: 30,
    },
    dayContainer: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    day: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 5,
        height: 5,
    },
});

const headerStyles = StyleSheet.create({
    headerWrapper: {
        zIndex: 1,
        backgroundColor: color.White.toString(),
        paddingBottom: 10,
        height: 30,
    },
    noHeader: {
        height: 0,
    },
    dayNamesContainer: {
        flexDirection: 'row',
        paddingRight: 0,
    },
    dayName: {
        flex: 1,
        alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: color.White.toString(),
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    listWrapper: {
        flex: 1,
    },
});
