import { color } from '@reptile-region/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useReadPushLog from '@/apis/notification/push/hooks/mutations/useReadPushLog';
import useInfinitePushLog from '@/apis/notification/push/hooks/queries/useInfinitePushLog';
import { ContentType, type FetchPushLogResponse } from '@/types/apis/notification/push';

export default function PushLogList() {
    const { data } = useInfinitePushLog();
    const { mutate } = useReadPushLog();

    useEffect(() => {
        mutate();
    }, [mutate]);

    const renderItem: ListRenderItem<FetchPushLogResponse> = useCallback(({ item }) => {
        switch (item.contents.type) {
            case ContentType.Profile:
            case ContentType.SharePost:
            case ContentType.Notice:
        }
        return <View />;
    }, []);

    return (
        <View style={styles.container}>
            <FlashList data={data} renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
