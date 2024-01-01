import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import useMemoUpdateBottomSheet from '../@common/bottom-sheet/MemoUpdate/useMemoUpdateBottomSheet';
import useTagUpdateBottomSheet from '../@common/bottom-sheet/TagUpdate/useTagUpdateBottomSheet';

import ListItem, { type DisableListItemProps } from './components/ListItem/DisableListItem';
import EditListItem, { type EditListItemProps } from './components/ListItem/EditListItem';
import ChangeHeader from './header';
import useFetchCalendarDetail from './hooks/queries/useFetchCalendarDetail';

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
    const openTagBottomSheet = useTagUpdateBottomSheet();

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

    const listItems: Item[] = [
        {
            type: 'EDIT',
            props: {
                label: '메모',
                content: <Typo textAlign="right">{data?.calendar.memo}</Typo>,
                onPress: () => {
                    if (data) {
                        openMemoBottomSheet({
                            calendar: { id: data.calendar.id, memo: data.calendar.memo },
                            searchDate,
                        });
                    }
                },
            },
        },
        {
            type: 'EDIT',
            props: {
                label: '태그',
                content: (
                    <>
                        {data?.calendar.markType.map((mark) => (
                            <Typo color="primary" textAlign="right" key={mark}>
                                #{mark}
                            </Typo>
                        ))}
                    </>
                ),
                onPress: () => {
                    if (data) {
                        openTagBottomSheet({
                            calendar: { id: data.calendar.id, markType: data.calendar.markType },
                            searchDate,
                        });
                    }
                },
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
