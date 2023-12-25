import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ListItem from './@common/components/ListItem';
import TouchableScale from './@common/components/TouchableScale';
import useFetchCalendarDetail from './@common/hooks/queries/useFetchCalendarDetail';
import ChangeHeader from './header';

import type { CalendarDetailScreenProps } from '@/types/routes/props/diary/calendar';

export default function CalendarDetailPage({
    navigation,
    route: {
        params: { calendar, entity, searchDate },
    },
}: CalendarDetailScreenProps) {
    const { data } = useFetchCalendarDetail({ calendarId: calendar.id, entityId: entity.id, date: searchDate });

    return (
        <>
            <ChangeHeader navigation={navigation} searchDate={searchDate} calendarId={calendar.id} />
            <ScrollView style={styles.wrapper}>
                <View>
                    <View style={cardStyles.container}>
                        <Image source={{ uri: data?.entity.image.src }} style={cardStyles.imageSize} />
                    </View>
                </View>
                <View style={articleStyles.wrapper}>
                    <TouchableScale containerStyle={articleStyles.padding}>
                        <ListItem label="메모" content={<Typo textAlign="right">{data?.calendar.memo}</Typo>} />
                    </TouchableScale>
                    <TouchableScale containerStyle={articleStyles.padding}>
                        <ListItem
                            label="태그"
                            content={data?.calendar.markType.map((mark) => (
                                <Typo key={mark} color="primary" textAlign="left" variant="body1">
                                    #{mark}
                                </Typo>
                            ))}
                        />
                    </TouchableScale>
                    <View style={[articleStyles.itemWrapper, articleStyles.padding]}>
                        <Typo variant="title2">기록날짜</Typo>
                        <Typo>{dayjs(data?.calendar.date).format('YYYY년 MM월 DD일 HH:mm')}</Typo>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});

const cardStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: color.White.toString(),
        ...Platform.select({
            ios: {
                shadowColor: color.DarkGray[500].toString(),
                shadowOpacity: 0.15,
                shadowRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
            android: {
                elevation: 10,
            },
        }),
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    varietyWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    imageSize: {
        width: '100%',
        aspectRatio: '1/1',
    },
});

const articleStyles = StyleSheet.create({
    wrapper: {
        paddingVertical: 20,
        gap: 10,
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    padding: {
        padding: 20,
    },
    tagWrapper: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'flex-end',
    },
    memoContainer: {
        flex: 1,
    },
});
