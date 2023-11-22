import { Typo, color } from '@reptile-region/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useReadPushLog from '@/apis/notification/push/hooks/mutations/useReadPushLog';
import useInfinitePushLog from '@/apis/notification/push/hooks/queries/useInfinitePushLog';
import { Avatar } from '@/components/@common/atoms';
import { ContentType, type FetchPushLogResponse } from '@/types/apis/notification/push';

export default function PushLogList() {
    const { data, isFetching, hasNextPage, fetchNextPage } = useInfinitePushLog();
    const { mutate } = useReadPushLog();

    useEffect(() => {
        mutate();
    }, [mutate]);

    const renderItem: ListRenderItem<FetchPushLogResponse> = useCallback(({ item }) => {
        switch (item.contents.type) {
            case ContentType.Profile:
                return (
                    <View style={styles.row}>
                        <Avatar image={{ src: item.contents.profileThumbnail }} size={40} />
                        <View>
                            <Typo variant="title5" color="placeholder">
                                {item.contents.title}
                            </Typo>
                            <Typo>{item.contents.article}</Typo>
                        </View>
                    </View>
                );
            case ContentType.SharePost:
                return (
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
                );
            case ContentType.Notice:
                return (
                    <View style={styles.row}>
                        <View>
                            <Typo variant="title5" color="placeholder">
                                {item.contents.title}
                            </Typo>
                            <Typo>{item.contents.article}</Typo>
                        </View>
                    </View>
                );
        }
    }, []);

    const handleFetchNextPage = () => !isFetching && hasNextPage && fetchNextPage();

    return (
        <View style={styles.container}>
            <FlashList data={data} renderItem={renderItem} onEndReached={handleFetchNextPage} estimatedItemSize={50} />
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
});
