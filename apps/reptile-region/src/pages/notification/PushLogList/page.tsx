import { Typo } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { PushLogListScreenProp } from '../../../types/routes/props/notification/push-log';

import useReadPushLog from '@/apis/notification/push/hooks/mutations/useReadPushLog';
import useInfinitePushLog from '@/apis/notification/push/hooks/queries/useInfinitePushLog';
import { Avatar, FadeInCellRenderComponent } from '@/components/@common/atoms';
import { Divider } from '@/components/@common/atoms/Divider';
import PageWrapper from '@/components/PageWrapper';
import { navigateLinking } from '@/routes/@utils/linking';
import { ContentType, type FetchPushLogResponse } from '@/types/apis/notification';
import { calculateTimeAgo } from '@/utils/date/time-ago';

export default function PushLogList({ navigation }: PushLogListScreenProp) {
    const { bottom } = useSafeAreaInsets();
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfinitePushLog();
    const { mutate } = useReadPushLog();

    useEffect(mutate, [mutate]);

    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    const renderItem: ListRenderItem<FetchPushLogResponse> = ({ item }) => {
        const handlePressLog = () => {
            navigateLinking(navigation, item.contents.deepLink);
        };

        const timeAgo = calculateTimeAgo(item.createdAt);

        switch (item.contents.type) {
            case ContentType.Profile:
                return (
                    <TouchableOpacity key={item.contents.article} onPress={handlePressLog}>
                        <View style={styles.row}>
                            <Avatar image={{ src: item.contents.profileThumbnail }} size={40} />
                            <View style={styles.profileContent}>
                                <Typo variant="title4">
                                    {item.contents.title}
                                    <Typo color="placeholder" variant="body3">
                                        {' '}
                                        {timeAgo}
                                    </Typo>
                                </Typo>
                                <Typo>{item.contents.article}</Typo>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case ContentType.SharePost:
                return (
                    <TouchableOpacity key={item.contents.article} onPress={handlePressLog}>
                        <View style={styles.row}>
                            <Avatar image={{ src: item.contents.profileThumbnail }} size={40} />
                            <View style={styles.text}>
                                <Typo variant="title4">
                                    {item.contents.title}
                                    <Typo color="placeholder" variant="body3">
                                        {' '}
                                        {timeAgo}
                                    </Typo>
                                </Typo>
                                <Typo variant="body2">{item.contents.article}</Typo>
                            </View>
                            <Image source={{ uri: item.contents.postThumbnail }} style={styles.postThumbnail} />
                        </View>
                    </TouchableOpacity>
                );
            case ContentType.Notice:
                return (
                    <TouchableOpacity key={item.contents.article} onPress={handlePressLog}>
                        <View style={styles.row}>
                            <View>
                                <Typo variant="title4">
                                    {item.contents.title}
                                    <Typo color="placeholder" variant="body3">
                                        {' '}
                                        {timeAgo}
                                    </Typo>
                                </Typo>
                                <Typo>{item.contents.article}</Typo>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
        }
    };

    return (
        <PageWrapper>
            <FlashList
                data={data}
                contentContainerStyle={{ paddingBottom: bottom }}
                renderItem={renderItem}
                onEndReached={handleFetchNextPage}
                getItemType={(item) => item.contents.type}
                CellRendererComponent={FadeInCellRenderComponent}
                ListFooterComponent={ListFooterComponent}
                estimatedItemSize={80}
            />
        </PageWrapper>
    );
}

// 리스트 하단
function ListFooterComponent() {
    return (
        <View style={styles.footer}>
            <Divider />
            <Typo variant="body3" color="placeholder">
                최대 2주 전까지의 알림을 확인할 수 있어요
            </Typo>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 10,
    },
    profileContent: {
        flex: 1,
    },
    text: {
        gap: 5,
        flex: 1,
    },
    postThumbnail: {
        width: 40,
        height: 40,
        marginLeft: 'auto',
    },
    footer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 20,
    },
});
