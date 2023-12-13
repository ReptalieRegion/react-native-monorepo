import { color, Typo } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    View,
    type LayoutChangeEvent,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
} from 'react-native';
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import useCalendarHandler from '../../hooks/useCalendarHandler';
import useCalendarState from '../../hooks/useCalendarState';
import { flashListItems, getMarkedDates } from '../../mock/data';
import type { CalendarListItem, DateType } from '../../type';
import Calendar from '../Calendar/Calendar';
import Header, { type HeaderActions } from '../Header';
import { dayStyle, headerStyles, markingStyle } from '../style';
import WeekCalendar from '../WeekCalendar/WeekCalendar';

import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import useFlashListScroll from '@/hooks/@common/useFlashListScroll';

dayjs.locale('ko');

type ExpandableCalendarViewState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

interface ExpandableCalendarViewActions {}

type ExpandableCalendarViewProps = ExpandableCalendarViewState & ExpandableCalendarViewActions & HeaderActions;

export default function ExpandableCalendarView({ date, maxDate, minDate, dayNames, hideHeader }: ExpandableCalendarViewProps) {
    const marked = useRef(getMarkedDates());
    const calendarState = useCalendarState();
    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);
    const { addMonth, subMonth } = useCalendarHandler(initData);

    // 주간,월간 캘린더와 리스트의 목표 위치 초기화
    const dayHeight = useMemo(() => dayStyle.wrapper.height, []);
    const headerHeight = useMemo(() => headerStyles.wrapper.height, []);
    const calendarHeight = useMemo(
        () => dayHeight * calendarState.weekCountInMonth,
        [calendarState.weekCountInMonth, dayHeight],
    );
    const weekCalendarGoalTranslateY = useMemo(
        () => dayHeight * (calendarState.selectedWeekNumber - 1),
        [calendarState.selectedWeekNumber, dayHeight],
    );
    const calendarGoalTranslateY = useMemo(
        () => -dayHeight * (calendarState.selectedWeekNumber - 1),
        [calendarState.selectedWeekNumber, dayHeight],
    );
    const listMinTranslateY = useMemo(() => headerHeight + dayHeight, [dayHeight, headerHeight]);
    const listGoalTranslateY = useMemo(
        () => headerHeight + dayHeight * calendarState.weekCountInMonth,
        [calendarState.weekCountInMonth, dayHeight, headerHeight],
    );

    // 애니메이션 임시 저장 변수
    const startContext = {
        weekCalendarTranslateY: useSharedValue(dayHeight * (calendarState.selectedWeekNumber - 1)),
        weekPageIndex: useSharedValue(-1),
        calendarTranslateY: useSharedValue(0),
        listTranslateY: useSharedValue(listMinTranslateY),
        listHeight: useSharedValue(0),
        layoutHeight: useSharedValue(Dimensions.get('screen').height),
        changeWeekCalendarGoalTranslateY: useSharedValue(weekCalendarGoalTranslateY),
    };

    // 애니메이션 적용할 변수
    const applyContext = {
        weekCalendarZIndex: useSharedValue(1),
        weekCalendarTranslateY: useSharedValue(0),
        calendarZIndex: useSharedValue(0),
        calendarOpacity: useSharedValue(0),
        calendarTranslateY: useSharedValue(calendarGoalTranslateY),
        listTranslateY: useSharedValue(listMinTranslateY),
        listHeight: useSharedValue(500),
    };

    // 달이 변했을 때, 위치 초기화
    const lastMonth = useRef(calendarState.selectedDateString);
    const isNotSameMonth = !calendarState.selectedDate.isSame(lastMonth.current, 'month');
    const isShowWeek = applyContext.weekCalendarZIndex.value === 1;
    if (isNotSameMonth) {
        lastMonth.current = calendarState.selectedDateString;

        if (isShowWeek) {
            applyContext.calendarTranslateY.value = calendarGoalTranslateY;
            applyContext.listTranslateY.value = listMinTranslateY;
            startContext.weekPageIndex.value = -1;
        }

        if (applyContext.listTranslateY.value !== listGoalTranslateY && !isShowWeek) {
            applyContext.listTranslateY.value = listGoalTranslateY;
        }
    }

    // 날짜 선택 주 위치 변경 시 주간 캘린더 위치 변경
    if (applyContext.weekCalendarTranslateY.value !== weekCalendarGoalTranslateY && !isShowWeek) {
        applyContext.weekCalendarTranslateY.value = weekCalendarGoalTranslateY;
    }

    // 캘린더 위에 접기 속도
    const initialUpSpeedPercent = useMemo(
        () => (calendarState.selectedWeekNumber - 1) / (calendarState.weekCountInMonth - 1),
        [calendarState.selectedWeekNumber, calendarState.weekCountInMonth],
    );

    useEffect(() => {
        startContext.weekPageIndex.value = calendarState.selectedWeekNumber - 1;
        startContext.changeWeekCalendarGoalTranslateY.value = weekCalendarGoalTranslateY;
    }, [
        weekCalendarGoalTranslateY,
        calendarState.selectedDateString,
        calendarState.selectedWeekNumber,
        startContext.changeWeekCalendarGoalTranslateY,
        startContext.weekPageIndex.value,
        startContext.weekPageIndex,
    ]);

    // 주간 캘린더 스크롤 복구
    const weekCalendarRef = useRef<FlashList<DateType[]>>(null);
    const handleScrollToIndex = useCallback(() => {
        weekCalendarRef.current?.scrollToIndex({ index: calendarState.selectedWeekNumber - 1, animated: false });
    }, [calendarState.selectedWeekNumber]);

    // 캘린더 열기 애니메이션
    const openCalendar = useCallback(() => {
        'worklet';
        applyContext.listHeight.value = withTiming(startContext.layoutHeight.value - headerHeight - calendarHeight);
        applyContext.weekCalendarZIndex.value = 0;
        applyContext.calendarZIndex.value = 1;
        applyContext.listTranslateY.value = withTiming(listGoalTranslateY);
        applyContext.calendarTranslateY.value = withTiming(0);
        applyContext.weekCalendarTranslateY.value = withTiming(weekCalendarGoalTranslateY);
        startContext.changeWeekCalendarGoalTranslateY.value = weekCalendarGoalTranslateY;
        startContext.weekPageIndex.value = -1;
        applyContext.calendarOpacity.value = 1;
        runOnJS(handleScrollToIndex)();
    }, [
        applyContext.weekCalendarZIndex,
        applyContext.calendarZIndex,
        applyContext.listTranslateY,
        applyContext.calendarTranslateY,
        applyContext.weekCalendarTranslateY,
        applyContext.calendarOpacity,
        applyContext.listHeight,
        listGoalTranslateY,
        weekCalendarGoalTranslateY,
        startContext.changeWeekCalendarGoalTranslateY,
        startContext.weekPageIndex,
        startContext.layoutHeight.value,
        headerHeight,
        calendarHeight,
        handleScrollToIndex,
    ]);

    // 캘린더 닫기 애니메이션
    const closeCalendar = useCallback(() => {
        'worklet';
        applyContext.listHeight.value = withTiming(startContext.layoutHeight.value - headerHeight - dayHeight);
        applyContext.weekCalendarZIndex.value = 1;
        applyContext.calendarZIndex.value = 0;
        applyContext.listTranslateY.value = withTiming(listMinTranslateY);
        applyContext.calendarTranslateY.value = withTiming(
            startContext.weekPageIndex.value === -1 ? calendarGoalTranslateY : -dayHeight * startContext.weekPageIndex.value,
            {},
            (isFinished) => {
                if (isFinished) {
                    applyContext.calendarOpacity.value = 0;
                }
            },
        );
        applyContext.weekCalendarTranslateY.value = withTiming(0);
    }, [
        applyContext.calendarOpacity,
        applyContext.calendarTranslateY,
        applyContext.calendarZIndex,
        applyContext.listHeight,
        applyContext.listTranslateY,
        applyContext.weekCalendarTranslateY,
        applyContext.weekCalendarZIndex,
        calendarGoalTranslateY,
        dayHeight,
        headerHeight,
        listMinTranslateY,
        startContext.layoutHeight.value,
        startContext.weekPageIndex.value,
    ]);

    // 캘린더 제스쳐
    const gesture = Gesture.Pan()
        .onStart(() => {
            startContext.listHeight.value = applyContext.listHeight.value;
            startContext.calendarTranslateY.value = applyContext.calendarTranslateY.value;
            startContext.listTranslateY.value = applyContext.listTranslateY.value;
            startContext.weekCalendarTranslateY.value = applyContext.weekCalendarTranslateY.value;
        })
        .onChange((event) => {
            const isDownSwipe = event.velocityY > 0;
            const upSpeedPercent =
                startContext.weekPageIndex.value === -1
                    ? initialUpSpeedPercent
                    : startContext.weekPageIndex.value / (calendarState.weekCountInMonth - 1);
            if (isDownSwipe) {
                applyContext.weekCalendarTranslateY.value = Math.max(
                    Math.min(
                        startContext.weekCalendarTranslateY.value + event.translationY * upSpeedPercent,
                        startContext.changeWeekCalendarGoalTranslateY.value,
                    ),
                    0,
                );
                applyContext.calendarTranslateY.value = Math.max(
                    Math.min(startContext.calendarTranslateY.value + event.translationY * upSpeedPercent, 0),
                    startContext.weekPageIndex.value === -1
                        ? calendarGoalTranslateY
                        : -dayHeight * startContext.weekPageIndex.value,
                );
                applyContext.listTranslateY.value = Math.min(
                    Math.max(startContext.listTranslateY.value + event.translationY, listMinTranslateY),
                    listGoalTranslateY,
                );

                applyContext.calendarOpacity.value = applyContext.listTranslateY.value / listGoalTranslateY;
                applyContext.listHeight.value = Math.min(
                    Math.max(
                        startContext.listHeight.value - event.translationY,
                        startContext.layoutHeight.value - headerHeight - calendarHeight,
                    ),
                    startContext.layoutHeight.value - headerHeight - dayHeight,
                );
            } else {
                applyContext.weekCalendarTranslateY.value = Math.min(
                    Math.max(startContext.weekCalendarTranslateY.value + event.translationY * upSpeedPercent, 0),
                    startContext.changeWeekCalendarGoalTranslateY.value,
                );
                applyContext.calendarTranslateY.value = Math.min(
                    Math.max(
                        startContext.calendarTranslateY.value + event.translationY * upSpeedPercent,
                        startContext.weekPageIndex.value === -1
                            ? calendarGoalTranslateY
                            : -dayHeight * startContext.weekPageIndex.value,
                    ),
                    0,
                );
                applyContext.listTranslateY.value = Math.max(
                    Math.min(startContext.listTranslateY.value + event.translationY, listGoalTranslateY),
                    listMinTranslateY,
                );

                applyContext.calendarOpacity.value = 1 - listMinTranslateY / applyContext.listTranslateY.value;
                applyContext.listHeight.value = Math.max(
                    Math.min(
                        startContext.listHeight.value - event.translationY,
                        startContext.layoutHeight.value - headerHeight - dayHeight,
                    ),
                    startContext.layoutHeight.value - headerHeight - calendarHeight,
                );
            }
        })
        .onEnd((event) => {
            const isDownSwipe = event.velocityY > -50;
            if (isDownSwipe) {
                openCalendar();
                return;
            }

            const isUpSwipe = event.velocityY < 50;
            if (isUpSwipe) {
                closeCalendar();
                return;
            }
        });

    const handleChangeCalendarTranslateY = useCallback(
        (index: number) => {
            startContext.weekPageIndex.value = index;
            startContext.changeWeekCalendarGoalTranslateY.value = dayHeight * index;
            if (applyContext.weekCalendarZIndex.value === 1) {
                applyContext.calendarTranslateY.value = -dayHeight * index;
            }
        },
        [
            applyContext.calendarTranslateY,
            applyContext.weekCalendarZIndex.value,
            dayHeight,
            startContext.changeWeekCalendarGoalTranslateY,
            startContext.weekPageIndex,
        ],
    );

    const calendarAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: applyContext.calendarOpacity.value,
            zIndex: applyContext.calendarZIndex.value,
            transform: [{ translateY: applyContext.calendarTranslateY.value }],
        }),
        [applyContext.calendarZIndex.value, applyContext.calendarTranslateY.value],
    );

    const weekAnimatedStyle = useAnimatedStyle(
        () => ({
            zIndex: applyContext.weekCalendarZIndex.value,
            transform: [{ translateY: applyContext.weekCalendarTranslateY.value }],
        }),
        [applyContext.weekCalendarZIndex.value, applyContext.weekCalendarTranslateY.value],
    );
    /** Animation 끝 */

    /** Calendar 시작 */
    const weekCalendarWrapperStyle = useMemo(() => [weekStyles.container, weekAnimatedStyle], [weekAnimatedStyle]);
    const calendarWrapperStyle = useMemo(() => [weekStyles.calendarContainer, calendarAnimatedStyle], [calendarAnimatedStyle]);

    const markedDates = useMemo(
        () => ({
            ...marked.current,
            [calendarState.selectedDateString]: {
                ...marked.current[calendarState.selectedDateString],
                markingStyle: markingStyle,
            },
        }),
        [calendarState.selectedDateString],
    );

    const renderCalendar = useCallback(() => {
        return (
            <Animated.View style={calendarWrapperStyle}>
                <Calendar markedDates={markedDates} hideHeader />
            </Animated.View>
        );
    }, [calendarWrapperStyle, markedDates]);

    const renderWeekCalendar = useCallback(() => {
        return (
            <Animated.View style={weekCalendarWrapperStyle}>
                <WeekCalendar
                    ref={weekCalendarRef}
                    markedDates={markedDates}
                    onChangePage={handleChangeCalendarTranslateY}
                    hideHeader
                />
            </Animated.View>
        );
    }, [markedDates, weekCalendarWrapperStyle, handleChangeCalendarTranslateY]);
    /** Calendar 끝 */

    /** Header 시작 */
    const renderHeader = useCallback(() => {
        const isPossibleNextMonth = calendarState.maxDate
            ? calendarState.selectedDate.isBefore(calendarState.maxDate, 'month')
            : true;
        const isPossiblePrevMonth = calendarState.minDate
            ? calendarState.selectedDate.isAfter(calendarState.minDate, 'month')
            : true;
        const isSameYear = dayjs().year() === calendarState.selectedDate.year();

        return (
            <Header
                dayNames={dayNames}
                label={isSameYear ? calendarState.selectedDate.format('MM월') : calendarState.selectedDate.format('YY년 MM월')}
                isPossibleNextMonth={isPossibleNextMonth}
                isPossiblePrevMonth={isPossiblePrevMonth}
                onPressLeft={subMonth}
                onPressRight={addMonth}
            />
        );
    }, [calendarState.maxDate, calendarState.selectedDate, calendarState.minDate, dayNames, subMonth, addMonth]);
    /** Header 끝 */

    /** List 시작 */
    const { flashListRef, scrollToIndex } = useFlashListScroll<CalendarListItem>();
    const startScrollY = useRef(0);

    const flashRenderItem: ListRenderItem<CalendarListItem> = useCallback(({ item }) => {
        if (typeof item === 'string') {
            return (
                <View style={listStyles.title}>
                    <Typo color="sub-placeholder">{dayjs(item).format('D일 ddd요일')}</Typo>
                </View>
            );
        }

        const handleItemPress = () => {
            Alert.alert(item.memo);
        };

        return (
            <TouchableOpacity onPress={handleItemPress} style={listStyles.item}>
                <Avatar image={item.image} size={50} />
                <View style={listStyles.contentContainer}>
                    <Typo variant="title3">{item.name}</Typo>
                    <ConditionalRenderer
                        condition={!!item.memo}
                        trueContent={
                            <Typo
                                variant="body3"
                                color="placeholder"
                                textBreakStrategy="highQuality"
                                lineBreakMode="clip"
                                lineBreakStrategyIOS="hangul-word"
                                numberOfLines={1}
                            >
                                {item.memo}
                            </Typo>
                        }
                    />
                </View>
            </TouchableOpacity>
        );
    }, []);

    // 선택한 날짜 인덱스 찾아서 스크롤
    useEffect(() => {
        const index = flashListItems.findIndex((item) => typeof item === 'string' && item === calendarState.selectedDateString);
        if (index !== -1) {
            scrollToIndex({ index: index, animated: true });
        }
    }, [calendarState.selectedDateString, scrollToIndex]);

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (startScrollY.current === 0) {
                const isDownScroll = event.nativeEvent.contentOffset.y <= 0;
                if (isDownScroll) {
                    openCalendar();
                } else {
                    closeCalendar();
                }
            }
            startScrollY.current = event.nativeEvent.contentOffset.y;
        },
        [closeCalendar, openCalendar],
    );

    const listAnimatedStyle = useAnimatedStyle(() => ({
        height: applyContext.listHeight.value,
        zIndex: 2,
        transform: [{ translateY: applyContext.listTranslateY.value }],
    }));
    const listWrapperStyle = useMemo(() => [listStyles.wrapper, listAnimatedStyle], [listAnimatedStyle]);

    const list = useCallback(() => {
        return (
            <Animated.View style={listWrapperStyle}>
                <FlashList
                    ref={flashListRef}
                    contentContainerStyle={contentContainerStyle}
                    data={flashListItems}
                    renderItem={flashRenderItem}
                    keyExtractor={(item) => (typeof item === 'string' ? item : item.date.concat(item.name))}
                    onScroll={handleScroll}
                    getItemType={(item) => (typeof item === 'string' ? 'title' : 'content')}
                    estimatedItemSize={90}
                />
            </Animated.View>
        );
    }, [listWrapperStyle, flashListRef, flashRenderItem, handleScroll]);
    /** List 끝 */

    const handleGetLayoutHeight = useCallback(
        (event: LayoutChangeEvent) => {
            const height = event.nativeEvent.layout.height;
            startContext.layoutHeight.value = height;
            applyContext.listHeight.value = height - headerHeight - dayHeight;
        },
        [applyContext.listHeight, dayHeight, headerHeight, startContext.layoutHeight],
    );

    const calendarHeightStyle = useMemo(() => [{ height: calendarHeight }, styles.wrapper], [calendarHeight]);

    return (
        <View style={styles.wrapper} onLayout={handleGetLayoutHeight}>
            {!hideHeader && renderHeader()}
            <GestureDetector gesture={gesture}>
                <View style={calendarHeightStyle}>
                    {renderCalendar()}
                    {renderWeekCalendar()}
                </View>
            </GestureDetector>
            {list()}
        </View>
    );
}

const contentContainerStyle: ContentStyle = {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: color.White.toString(),
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
    },
});

const listStyles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 90,
        backgroundColor: color.White.toString(),
    },
    title: {
        height: 20,
        backgroundColor: color.White.toString(),
    },
    contentContainer: {
        width: 200,
    },
});

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
