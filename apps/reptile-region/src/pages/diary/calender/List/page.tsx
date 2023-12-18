import { ExpandableCalendar, useCalendar } from '@crawl/calendar';
import { Typo, color } from '@crawl/design-system';
import { useIsFocused, useRoute } from '@react-navigation/native';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';

import useFetchCalendar, {
    type CalendarFlashListItem,
    type CalendarItem,
} from '@/apis/diary/calendar/hooks/queries/useFetchCalendar';
import { PostWriteIcon } from '@/assets/icons';
import { Avatar, ConditionalRenderer, FadeInCellRenderComponent } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import ScaleListItem from '@/components/diary/atoms/CalendarListItem/CalendarListItem';
import FloatingActionButtonGroup from '@/components/share-post/organisms/FloatingActionButtons/components/FloatingActionButtonGroup';
import FloatingActionButtons from '@/components/share-post/organisms/FloatingActionButtons/providers/FloatingActionButtons';
import useCalendarNavigation from '@/hooks/diary/navigation/useCalendarNavigation';
import type { CalendarListRouteProp } from '@/types/routes/props/diary/calendar';

export default function ExpandableCalendarScreen() {
    const today = useRef(dayjs()).current;
    const todayString = today.format('YYYY-MM-DD');
    const { navigateCalendarCreate } = useCalendarNavigation();
    const [searchDate, setSearchDate] = useState(today);
    const { isLoading: isGlobalLoading, openLoading, closeLoading } = useGlobalLoading();
    const isFocused = useIsFocused();
    const { data, isLoading } = useFetchCalendar({ date: searchDate.toDate() });

    const { params } = useRoute<CalendarListRouteProp>();
    const { subMonth, setDate } = useCalendar();

    useEffect(() => {
        if (isFocused && isLoading) {
            openLoading();
        } else if (isGlobalLoading) {
            closeLoading();
        }
    }, [isFocused, isLoading, isGlobalLoading, openLoading, closeLoading]);

    useEffect(() => {
        const initialDateString = params?.initialDateString;
        if (initialDateString) {
            setDate(params.initialDateString);
        }
    }, [params?.initialDateString, setDate]);

    const handleChangeSearchDate = useCallback((dateString: string) => {
        setSearchDate(dayjs(dateString));
    }, []);

    const renderItem: ListRenderItem<CalendarFlashListItem> = useCallback(({ item }) => {
        switch (item.type) {
            case 'TITLE':
                return (
                    <View style={listStyles.title}>
                        <Typo color="sub-placeholder">{item.label}</Typo>
                    </View>
                );
            case 'CALENDAR_ITEM':
                const handleLongPress = () => {
                    Haptic.trigger('impactLight');
                };

                return (
                    <ScaleListItem
                        pressInBackground={color.Gray[100].toString()}
                        containerStyle={listStyles.itemContainer}
                        onLongPress={handleLongPress}
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
                    </ScaleListItem>
                );
        }
    }, []);

    const keyExtractor = useCallback(
        (item: CalendarFlashListItem) =>
            item.type === 'TITLE' ? item.dateString : item.calendar.date.concat(item.entity.name),
        [],
    );

    const getItemType = useCallback((item: CalendarFlashListItem) => (typeof item === 'string' ? 'title' : 'content'), []);

    const renderListFooterComponent = useCallback(() => {
        return (
            <View style={listStyles.buttonWrapper}>
                <ConfirmButton
                    text={searchDate.subtract(1, 'month').format('M월 기록 더보기')}
                    size="small"
                    variant="cancel"
                    onPress={subMonth}
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

    const MemoizedExpandableCalendar = useMemo(() => {
        return (
            <ExpandableCalendar<CalendarItem>
                calendarProps={{
                    date: todayString,
                    minDate: '1997-01-01',
                    maxDate: todayString,
                    markedDates: data?.markedDates,
                    onChangeMonth: handleChangeSearchDate,
                }}
                listProps={{
                    data: data?.list,
                    isLoading: isFocused && isLoading,
                    LoadingComponent: <ActivityIndicator />,
                    contentContainerStyle: contentContainerStyle,
                    estimatedItemSize: 50,
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
        data?.markedDates,
        data?.list,
        isFocused,
        isLoading,
        handleChangeSearchDate,
        renderItem,
        keyExtractor,
        getItemType,
        renderListEmptyComponent,
        renderListFooterComponent,
    ]);

    return (
        <View style={styles.wrapper}>
            {MemoizedExpandableCalendar}
            <FloatingActionButtons>
                <FloatingActionButtonGroup position={{ right: 70, bottom: 70 }}>
                    <FloatingActionButtonGroup.Button
                        name="primary"
                        Icon={PostWriteIcon}
                        iconStyle={primaryIcon}
                        onPress={navigateCalendarCreate}
                    />
                </FloatingActionButtonGroup>
            </FloatingActionButtons>
        </View>
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
        flex: 1,
        position: 'relative',
        backgroundColor: color.White.toString(),
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
