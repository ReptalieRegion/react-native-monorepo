import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import useMemoUpdateBottomSheet from '../@common/bottom-sheet/MemoUpdate/useMemoUpdateBottomSheet';

import ListItem, { type DisableListItemProps } from './@common/components/ListItem/DisableListItem';
import EditListItem, { type EditListItemProps } from './@common/components/ListItem/EditListItem';
import useFetchCalendarDetail from './@common/hooks/queries/useFetchCalendarDetail';
import ChangeHeader from './header';

import type { CalendarDetailScreenProps } from '@/types/routes/props/diary/calendar';

interface EditListItemType {
    type: 'EDIT';
    props: EditListItemProps;
}

interface DisableListItemType {
    type: 'DISABLE';
    props: DisableListItemProps;
}

type Item = EditListItemType | DisableListItemType;

export default function CalendarDetailPage({
    navigation,
    route: {
        params: { calendar, entity, searchDate },
    },
}: CalendarDetailScreenProps) {
    const { data } = useFetchCalendarDetail({ calendarId: calendar.id, entityId: entity.id, date: searchDate });
    const openMemoBottomSheet = useMemoUpdateBottomSheet();

    const listItems: Item[] = [
        {
            type: 'EDIT',
            props: {
                label: '메모',
                content: <Typo textAlign="right">{data.calendar.memo}</Typo>,
                onPress: () =>
                    openMemoBottomSheet({ calendar: { id: data.calendar.id, memo: data.calendar.memo }, searchDate }),
            },
        },
        {
            type: 'EDIT',
            props: {
                label: '태그',
                content: data.calendar.markType.map((mark) => (
                    <Typo color="primary" textAlign="right" key={mark}>
                        #{mark}
                    </Typo>
                )),
            },
        },
        {
            type: 'DISABLE',
            props: {
                label: '기록날짜',
                content: dayjs(data?.calendar.date).format('YYYY년 MM월 DD일 HH:mm'),
            },
        },
    ];

    const keyExtractor = useCallback((item: Item) => item.props.label, []);

    const renderListHeader = useCallback(() => {
        return (
            <View style={styles.imageWrapper}>
                <Image source={{ uri: data?.entity.image.src }} style={styles.imageSize} />
            </View>
        );
    }, [data?.entity.image.src]);

    const renderItem: ListRenderItem<Item> = useCallback(({ item }) => {
        switch (item.type) {
            case 'EDIT':
                return <EditListItem {...item.props} containerStyle={styles.padding} />;
            case 'DISABLE':
                return <ListItem {...item.props} containerStyle={styles.padding} />;
        }
    }, []);

    return (
        <>
            <ChangeHeader navigation={navigation} searchDate={searchDate} calendarId={calendar.id} />
            <View style={styles.wrapper}>
                <FlashList
                    data={listItems}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    ListHeaderComponent={renderListHeader}
                    getItemType={(item) => item.type}
                    estimatedItemSize={67}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    imageWrapper: {
        marginBottom: 10,
    },
    imageSize: {
        width: '100%',
        aspectRatio: '1/1',
    },
    padding: {
        padding: 20,
    },
});
