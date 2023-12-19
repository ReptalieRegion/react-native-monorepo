import { Typo, color } from '@crawl/design-system';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import useFetchCalendarDetail from './hooks/queries/useFetchCalendarDetail';

import TagView from '@/components/@common/atoms/TagView/TagView';
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
                <Image source={{ uri: data?.entity.image.src }} style={cardStyles.imageSize} />
                <View>
                    <Typo variant="title2">{data?.entity.name}</Typo>
                    <TagView label="파충류" />
                    <TagView label="개코도마뱀" />
                    <TagView label="몰라몰라" />
                    <TagView label="ㅋㅋㅋ" />
                </View>
                <View>
                    <Typo variant="title2">여</Typo>
                    <Typo variant="title2">2023-12-23</Typo>
                </View>
            </View>
            <View style={articleStyles.wrapper}>
                <Typo variant="heading1">메모</Typo>
                <Typo>{data?.calendar.memo}</Typo>
                <Typo>{data?.calendar.date}</Typo>
                <View style={articleStyles.tagWrapper}>
                    {data?.calendar.markType.map((mark) => (
                        <Typo key={mark} color="primary" textAlign="left" variant="body1">
                            #{mark}
                        </Typo>
                    ))}
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
        flexDirection: 'row',
        padding: 20,
        gap: 10,
    },
    imageSize: {
        width: 150,
        height: 150,
    },
});

const articleStyles = StyleSheet.create({
    wrapper: {
        padding: 20,
        gap: 10,
    },
    tagWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
});
