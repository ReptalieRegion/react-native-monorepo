import { TouchableTypo } from '@reptile-region/design-system';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useDeleteEntity from '@/apis/diary/entity-manager/hooks/mutations/useDeleteEntity';
import type { EntityManagerOptionsMenuScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerOptionsMenu({
    navigation,
    route: {
        params: { entity },
    },
}: EntityManagerOptionsMenuScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { mutate } = useDeleteEntity({
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list });
            navigation.pop(2);
        },
    });

    const deletePost = () => {
        Alert.alert('정말로 삭제 하시겠어요?', '', [
            {
                text: '취소',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: '삭제',
                style: 'destructive',
                onPress: () => {
                    mutate({ diaryId: entity.id });
                },
            },
        ]);
    };

    const navigateUpdatePage = () => {
        navigation.navigate('entity-manager/update', { entity });
    };

    const listItem = [
        {
            text: '삭제',
            onPress: deletePost,
        },
        {
            text: '수정',
            onPress: navigateUpdatePage,
        },
    ];

    return (
        <View style={[styles.content, { paddingBottom: bottom }]}>
            {listItem.map(({ text, onPress }) => (
                <View key={text} style={styles.listItem}>
                    <TouchableTypo variant="body2" onPress={onPress}>
                        {text}
                    </TouchableTypo>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});
