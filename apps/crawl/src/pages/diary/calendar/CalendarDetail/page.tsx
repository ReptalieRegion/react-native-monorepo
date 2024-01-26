import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useMemoUpdateBottomSheet from '../@common/bottom-sheet/MemoUpdate/useMemoUpdateBottomSheet';
import useTagUpdateBottomSheet from '../@common/bottom-sheet/TagUpdate/useTagUpdateBottomSheet';

import ListItem, { type DisableListItemProps } from './components/ListItem/DisableListItem';
import EditListItem, { type EditListItemProps } from './components/ListItem/EditListItem';
import useDeleteCalendarItem from './hooks/mutations/useDeleteCalendarItem';
import useFetchCalendarDetail from './hooks/queries/useFetchCalendarDetail';

import PageWrapper from '@/components/PageWrapper';
import withPageHeaderUpdate from '@/components/withPageHeaderUpdate';
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

const CalendarDetailPage = withPageHeaderUpdate<CalendarDetailScreenProps>(
    ({
        route: {
            params: { calendar, entity, searchDate },
        },
    }) => {
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
            <PageWrapper>
                <FlashList
                    data={listItems}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    ListHeaderComponent={renderListHeader}
                    getItemType={(item) => item.type}
                    estimatedItemSize={67}
                />
            </PageWrapper>
        );
    },
    // Change Header
    ({
        navigation,
        route: {
            params: {
                calendar: { id: calendarId },
                searchDate,
            },
        },
    }) => {
        const { mutate, isPending } = useDeleteCalendarItem({ searchDate });

        useEffect(() => {
            const headerRight = () => {
                return (
                    <TouchableOpacity
                        onPress={() => mutate({ calendarId })}
                        style={headerStyles.wrapper}
                        containerStyle={headerStyles.container}
                        disabled={isPending}
                    >
                        <Typo color={'error'} disabled={isPending}>
                            삭제
                        </Typo>
                    </TouchableOpacity>
                );
            };

            navigation.setOptions({ headerRight });
        }, [navigation, isPending, mutate, calendarId]);

        return null;
    },
);

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

const headerStyles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginRight: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default CalendarDetailPage;
