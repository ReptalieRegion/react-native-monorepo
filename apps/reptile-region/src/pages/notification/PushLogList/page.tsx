import { color } from '@reptile-region/design-system';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useReadPushLog from '@/apis/notification/push/hooks/mutations/useReadPushLog';
import useInfinitePushLog from '@/apis/notification/push/hooks/queries/useInfinitePushLog';

type PushLogListProps = {};

export default function PushLogList({}: PushLogListProps) {
    const { data } = useInfinitePushLog();
    console.log(data);
    const { mutate } = useReadPushLog();

    useEffect(() => {
        mutate();
    }, [mutate]);

    const renderItem = useCallback(() => <View />, []);

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
