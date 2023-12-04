import { BottomSheet } from '@reptile-region/bottom-sheet';
import { TouchableTypo } from '@reptile-region/design-system';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useDeleteEntity from '@/apis/diary/entity-manager/hooks/mutations/useDeleteEntity';
import type { EntityManagerOptionsMenu } from '@/types/routes/props/diary';

type ListItemProps = {
    text: string;
    onPress?: () => void;
};

const ListItem = ({ text, onPress }: ListItemProps) => {
    return (
        <View style={styles.listItem}>
            <TouchableTypo variant="body2" onPress={onPress}>
                {text}
            </TouchableTypo>
        </View>
    );
};

export default function EntityManagerOptionsMenu({ navigation, route: { params } }: EntityManagerOptionsMenu) {
    const { entityId } = params;
    const { bottom } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { mutate } = useDeleteEntity({
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list });
            navigation.pop(2);
        },
    });

    const closeMenu = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const deletePost = () => {
        Alert.alert('정말로 삭제 하시겠어요?', '', [
            {
                text: '취소',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: '삭제',
                onPress: () => {
                    mutate({ diaryId: entityId });
                },
            },
        ]);
    };

    const navigateUpdatePage = () => {};

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
        <BottomSheet onClose={closeMenu} snapInfo={{ startIndex: 0, pointsFromTop: [59 + 38 * listItem.length] }}>
            <View style={[styles.content, { paddingBottom: bottom }]}>
                {listItem.map(({ text, onPress }) => (
                    <ListItem key={text} text={text} onPress={onPress} />
                ))}
            </View>
        </BottomSheet>
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
