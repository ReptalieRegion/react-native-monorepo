import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { PushLogListScreenProp } from './type';

import useReadPushLog from '@/apis/notification/push/hooks/mutations/useReadPushLog';
import useInfinitePushLog from '@/apis/notification/push/hooks/queries/useInfinitePushLog';
import { Avatar, FadeInCellRenderComponent } from '@/components/@common/atoms';
import { Divider } from '@/components/@common/atoms/Divider';
import { ContentType, type FetchPushLogResponse } from '@/types/apis/notification';
import { navigateLinking } from '@/utils/navigation/linking';

export default function PushLogList({ navigation }: PushLogListScreenProp) {
    const { bottom } = useSafeAreaInsets();
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfinitePushLog();
    const { mutate } = useReadPushLog();

    useEffect(mutate, [mutate]);

    const renderItem: ListRenderItem<FetchPushLogResponse> = ({ item }) => {
        const handlePressLog = () => {
            navigateLinking(navigation, item.contents.deepLink);
        };

        switch (item.contents.type) {
            case ContentType.Profile:
                return (
                    <TouchableOpacity onPress={handlePressLog}>
                        <View style={styles.row}>
                            <Avatar image={{ src: item.contents.profileThumbnail }} size={40} />
                            <View>
                                <Typo variant="title5" color="placeholder">
                                    {item.contents.title}
                                </Typo>
                                <Typo>{item.contents.article}</Typo>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case ContentType.SharePost:
                return (
                    <TouchableOpacity onPress={handlePressLog}>
                        <View style={styles.row}>
                            <Avatar image={{ src: item.contents.profileThumbnail }} size={40} />
                            <View style={styles.text}>
                                <Typo variant="title5" color="placeholder">
                                    {item.contents.title}
                                </Typo>
                                <Typo>{item.contents.article}</Typo>
                            </View>
                            <Image source={{ uri: item.contents.postThumbnail }} style={styles.postThumbnail} />
                        </View>
                    </TouchableOpacity>
                );
            case ContentType.Notice:
                return (
                    <TouchableOpacity onPress={handlePressLog}>
                        <View style={styles.row}>
                            <View>
                                <Typo variant="title5" color="placeholder">
                                    {item.contents.title}
                                </Typo>
                                <Typo>{item.contents.article}</Typo>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
        }
    };

    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                contentContainerStyle={{ paddingBottom: bottom }}
                renderItem={renderItem}
                onEndReached={handleFetchNextPage}
                getItemType={(item) => item.contents.type}
                CellRendererComponent={FadeInCellRenderComponent}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Divider />
                        <Typo variant="body3" color="placeholder">
                            최대 2주 전까지의 알림을 확인할 수 있어요
                        </Typo>
                        <Divider />
                    </View>
                }
                estimatedItemSize={50}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    row: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        height: 70,
    },
    text: {
        gap: 5,
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
