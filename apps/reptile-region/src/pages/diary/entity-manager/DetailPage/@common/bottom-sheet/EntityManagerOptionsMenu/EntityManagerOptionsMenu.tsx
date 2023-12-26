import { BottomSheet } from '@crawl/bottom-sheet';
import { TouchableTypo } from '@crawl/design-system';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useDeleteEntity from '@/apis/diary/entity-manager/hooks/mutations/useDeleteEntity';
import { ConditionalRenderer } from '@/components/@common/atoms';
import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';
import type { ImageType } from '@/types/global/image';
import type { EntityManagerDetailNavigationProp } from '@/types/routes/props/diary/entity';

type EntityManagerOptionsMenuBottomSheetState = {
    isOpen: boolean;
    entity: {
        id: string;
        image: ImageType;
        variety: EntityVariety;
        name: string;
        hatching: string | undefined;
        gender: EntityGender;
    };
    navigation: EntityManagerDetailNavigationProp;
};

interface EntityManagerOptionsMenuBottomSheetActions {
    onClose(): void;
}

export type EntityManagerOptionsMenuBottomSheetProps = EntityManagerOptionsMenuBottomSheetState &
    EntityManagerOptionsMenuBottomSheetActions;

export default function EntityManagerOptionsMenuBottomSheet({
    isOpen,
    entity,
    navigation,
    onClose,
}: EntityManagerOptionsMenuBottomSheetProps) {
    const { bottom } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { mutate } = useDeleteEntity({
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list });
            onClose();
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
                    mutate({ entityId: entity.id });
                },
            },
        ]);
    };

    const navigateUpdatePage = () => {
        onClose();
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

    const bottomSheetHeight = 59 + 38 * listItem.length;

    return (
        <ConditionalRenderer
            condition={isOpen}
            trueContent={
                <BottomSheet onClose={onClose} snapInfo={{ startIndex: 0, pointsFromTop: [bottomSheetHeight] }}>
                    <View style={[styles.content, { paddingBottom: bottom }]}>
                        {listItem.map(({ text, onPress }) => (
                            <View key={text} style={styles.listItem}>
                                <TouchableTypo variant="body2" onPress={onPress}>
                                    {text}
                                </TouchableTypo>
                            </View>
                        ))}
                    </View>
                </BottomSheet>
            }
        />
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
