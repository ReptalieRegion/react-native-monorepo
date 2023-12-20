import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import useFetchCalendarDetail from './@hooks/queries/useFetchCalendarDetail';

import type { CalendarDetailScreenProps } from '@/types/routes/props/diary/calendar';

export default function CalendarDetailPage({
    route: {
        params: { calendar, entity, searchDate },
    },
}: CalendarDetailScreenProps) {
    const { data } = useFetchCalendarDetail({ calendarId: calendar.id, entityId: entity.id, date: searchDate });

    return (
        <View style={styles.wrapper}>
            <View style={cardStyles.wrapper}>
                <View style={cardStyles.container}>
                    <Image source={{ uri: data?.entity.image.src }} style={cardStyles.imageSize} />
                    {/* <View style={cardStyles.content}>
                        <Typo variant="title2">
                            {data?.entity.name} <GenderIcon gender="Female" />
                        </Typo>
                        <View style={cardStyles.varietyWrapper}>
                            <TagView label="파충류" />
                            <TagView label="개코도마뱀" />
                            <TagView label="몰라몰라" />
                            <TagView label="ㅋㅋㅋ" />
                        </View>
                        <Typo variant="body3" color="placeholder">
                            {data?.entity.hatching ?? '2023-12-23'}
                        </Typo>
                    </View> */}
                </View>
            </View>
            <View style={articleStyles.wrapper}>
                <View style={articleStyles.itemWrapper}>
                    <Typo variant="title2">메모</Typo>
                    <Typo>{data?.calendar.memo}</Typo>
                </View>
                <View style={articleStyles.itemWrapper}>
                    <Typo variant="title2">태그</Typo>
                    <View style={articleStyles.tagWrapper}>
                        {data?.calendar.markType.map((mark) => (
                            <Typo key={mark} color="primary" textAlign="left" variant="body1">
                                #{mark}
                            </Typo>
                        ))}
                    </View>
                </View>
                <View style={articleStyles.itemWrapper}>
                    <Typo variant="title2">기록날짜</Typo>
                    <Typo>{dayjs(data?.calendar.date).format('YYYY년 MM월 DD일 HH:mm')}</Typo>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});

const cardStyles = StyleSheet.create({
    wrapper: {
        // padding: 20,
    },
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
        padding: 20,
        gap: 10,
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        gap: 30,
    },
    tagWrapper: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'flex-end',
    },
});