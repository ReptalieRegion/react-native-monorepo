import { ExpandableCalendar } from '@crawl/calendar';
import { Typo, color } from '@crawl/design-system';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';

import useOverlayActionMenuBottomSheet from './bottom-sheet/ActionMenu/useOverlayActionMenu';
import useOverlaySelectDate from './bottom-sheet/SelectDate/useOverlaySelectDate';
import CalendarListItem from './components/CalendarListItem';
import type { CalendarFlashListItem, CalendarItem } from './hooks/queries/useFetchCalendarList';
import useCalendarListActions from './hooks/useCalendarListActions';

import { PostWriteIcon } from '@/assets/icons';
import { Avatar, ConditionalRenderer, FadeInCellRenderComponent } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import FloatingActionButtonGroup from '@/components/@common/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import FloatingActionButtons from '@/components/@common/organisms/FloatingActionButtons/providers/FloatingActionButtons';
import PageWrapper from '@/components/PageWrapper';

export default function ExpandableCalendarScreen() {
    const {
        calendarListData,
        searchDate,
        todayString,
        handleChangeMonth,
        handlePressCalendarItem,
        handlePressWriteFloatingButton,
        subMonth,
    } = useCalendarListActions();
    const openSelectDateBottomSheet = useOverlaySelectDate();
    const openActionMenuBottomSheet = useOverlayActionMenuBottomSheet();

    const keyExtractor = useCallback(
        (item: CalendarFlashListItem) =>
            item.type === 'TITLE' ? item.dateString : item.calendar.date.concat(item.entity.name),
        [],
    );

    const getItemType = useCallback((item: CalendarFlashListItem) => item.type, []);

    const renderItem: ListRenderItem<CalendarFlashListItem> = useCallback(
        ({ item }) => {
            switch (item.type) {
                case 'TITLE':
                    return (
                        <View style={listStyles.title}>
                            <Typo color="sub-placeholder">{item.label}</Typo>
                        </View>
                    );
                case 'CALENDAR_ITEM':
                    return (
                        <CalendarListItem
                            pressInBackground={color.Gray[100].toString()}
                            containerStyle={listStyles.itemContainer}
                            onPress={() =>
                                handlePressCalendarItem({
                                    calendar: { id: item.calendar.id },
                                    entity: { id: item.entity.id },
                                    searchDate: dayjs(item.dateString).startOf('month').format('YYYY-MM-DD'),
                                })
                            }
                            onLongPress={() => {
                                Haptic.trigger('impactLight');
                                openActionMenuBottomSheet({
                                    calendar: {
                                        id: item.calendar.id,
                                        date: item.calendar.date,
                                        memo: item.calendar.memo,
                                        markType: item.calendar.markType,
                                    },
                                    searchDate: dayjs(item.dateString).startOf('month').format('YYYY-MM-DD'),
                                });
                            }}
                        >
                            <Avatar image={item.entity.image} size={60} />
                            <View style={listStyles.contentWrapper}>
                                <View>
                                    <Typo
                                        variant="title3"
                                        textAlign="left"
                                        textBreakStrategy="highQuality"
                                        lineBreakMode="clip"
                                        lineBreakStrategyIOS="hangul-word"
                                        numberOfLines={1}
                                    >
                                        {item.entity.name}
                                    </Typo>
                                </View>
                                <View>
                                    <ConditionalRenderer
                                        condition={!!item.calendar.memo}
                                        trueContent={
                                            <Typo
                                                variant="body2"
                                                color="placeholder"
                                                textBreakStrategy="highQuality"
                                                lineBreakMode="clip"
                                                lineBreakStrategyIOS="hangul-word"
                                                numberOfLines={1}
                                            >
                                                {item.calendar.memo}
                                            </Typo>
                                        }
                                    />
                                </View>
                                <View style={listStyles.tagWrapper}>
                                    {item.calendar.markType.map((type) => (
                                        <Typo key={type} color="primary" textAlign="left" variant="body3">
                                            #{type}
                                        </Typo>
                                    ))}
                                </View>
                            </View>
                        </CalendarListItem>
                    );
            }
        },
        [handlePressCalendarItem, openActionMenuBottomSheet],
    );

    const renderListFooterComponent = useCallback(() => {
        const prevMonth = searchDate.subtract(1, 'month');
        const isPrevMonthYearSameCurrentYear = dayjs().year() === prevMonth.year();
        const label = isPrevMonthYearSameCurrentYear
            ? prevMonth.format('M월 기록 더보기')
            : prevMonth.format('YY년 M월 기록 더보기');

        return (
            <View style={listStyles.buttonWrapper}>
                <ConfirmButton
                    text={label}
                    size="small"
                    variant="cancel"
                    onPress={() => {
                        Haptic.trigger('impactLight');
                        subMonth();
                    }}
                />
            </View>
        );
    }, [searchDate, subMonth]);

    const renderListEmptyComponent = useCallback(() => {
        return (
            <View style={listStyles.emptyWrapper}>
                <Typo color="sub-placeholder">{searchDate.format('M월')}에는 기록된 내용이 없어요</Typo>
            </View>
        );
    }, [searchDate]);

    const memoizedExpandableCalendar = useMemo(() => {
        return (
            <ExpandableCalendar<CalendarItem>
                calendarProps={{
                    date: todayString,
                    minDate: '1997-01-01',
                    maxDate: todayString,
                    markedDates: calendarListData?.markedDates,
                    onChangeMonth: handleChangeMonth,
                    onPressMonth: () => openSelectDateBottomSheet({ searchDate }),
                }}
                listProps={{
                    data: calendarListData?.list,
                    contentContainerStyle: contentContainerStyle,
                    estimatedItemSize: 40,
                    CellRendererComponent: FadeInCellRenderComponent,
                    renderItem: renderItem,
                    keyExtractor: keyExtractor,
                    getItemType: getItemType,
                    ListEmptyComponent: renderListEmptyComponent,
                    ListFooterComponent: renderListFooterComponent,
                }}
            />
        );
    }, [
        todayString,
        calendarListData?.markedDates,
        calendarListData?.list,
        handleChangeMonth,
        renderItem,
        keyExtractor,
        getItemType,
        renderListEmptyComponent,
        renderListFooterComponent,
        openSelectDateBottomSheet,
        searchDate,
    ]);

    return (
        <PageWrapper style={styles.wrapper}>
            {memoizedExpandableCalendar}
            <FloatingActionButtons>
                <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                    <FloatingActionButtonGroup.Button
                        name="primary"
                        Icon={PostWriteIcon}
                        iconStyle={primaryIcon}
                        onPress={handlePressWriteFloatingButton}
                    />
                </FloatingActionButtonGroup>
            </FloatingActionButtons>
        </PageWrapper>
    );
}

const contentContainerStyle: ContentStyle = {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: color.White.toString(),
};

const primaryIcon = {
    width: 50,
    height: 50,
    backgroundColor: color.Teal[150].toString(),
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
});

const listStyles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    item: {
        width: '100%',
    },
    itemContainer: {
        paddingHorizontal: 10,
    },
    contentWrapper: {
        justifyContent: 'center',
        flex: 1,
        height: 90,
    },
    title: {
        height: 20,
        backgroundColor: color.White.toString(),
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        gap: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 60,
    },
    emptyWrapper: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
    },
});
