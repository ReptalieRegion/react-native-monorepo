import { useBottomSheet } from '@crawl/bottom-sheet';
import { TouchableTypo } from '@crawl/design-system';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseDeleteEntity from '@/apis/diary/entity-manager/hooks/mutations/useBaseDeleteEntity';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import useAlert from '@/components/overlay/Alert/useAlert';
import type { EntityGender, EntityVariety } from '@/types/apis/diary/entity';
import type { ImageType } from '@/types/global/image';
import type { EntityManagerDetailNavigationProp } from '@/types/routes/props/diary/entity';

type EntityManagerOptionsMenuBottomSheetState = {
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

export type EntityManagerOptionsMenuBottomSheetProps = EntityManagerOptionsMenuBottomSheetState;

export default function EntityManagerOptionsMenuBottomSheet({ entity, navigation }: EntityManagerOptionsMenuBottomSheetProps) {
    const { bottom } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const { bottomSheetClose } = useBottomSheet();
    const { closeLoading, openLoading } = useGlobalLoading();
    const { mutate } = useBaseDeleteEntity({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: () => {
            bottomSheetClose();
            navigation.goBack();
            queryClient.refetchQueries({ queryKey: DIARY_QUERY_KEYS.list, exact: true });
            queryClient.invalidateQueries({ queryKey: DIARY_QUERY_KEYS.calendar });
        },
    });

    const openAlert = useAlert();

    const deletePost = async () => {
        await bottomSheetClose();
        openAlert({
            title: '정말로 삭제하시겠어요?',
            contents: '캘린더에 등록된 내용도 같이 사라져요',
            buttons: [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '삭제',
                    onPress: () => {
                        mutate({ entityId: entity.id });
                    },
                },
            ],
        });
    };

    const navigateUpdatePage = async () => {
        await bottomSheetClose();
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
