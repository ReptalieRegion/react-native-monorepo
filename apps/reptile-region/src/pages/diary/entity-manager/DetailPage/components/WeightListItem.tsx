import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import useDeleteEntityWeight from '../hooks/mutations/useDeleteEntityWeight';
import type { WeightData } from '../hooks/queries/useInfiniteFetchEntityWeight';

import { Edit } from '@/assets/icons';
import Delete from '@/assets/icons/Delete';
import { ConditionalRenderer } from '@/components/@common/atoms';
import useAlert from '@/components/overlay/Alert/useAlert';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';

type WeightListItemState = {
    index: number;
    entityInfo: Pick<FetchEntityListResponse['entity'], 'weightUnit' | 'id'>;
    weightInfo: WeightData;
};

interface WeightListItemActions {}

type WeightListItemProps = WeightListItemState & WeightListItemActions;

export default function WeightListItem({
    index,
    weightInfo: { id: weightId, date, diffWeight, weight },
    entityInfo: { id: entityId, weightUnit },
}: WeightListItemProps) {
    return (
        <View style={[styles.itemWrapper, index === 0 ? styles.topBoarder : undefined]}>
            <Typo>{dayjs(date).format('YYYY.MM.DD')}</Typo>

            <View style={styles.weightWrapper}>
                <Typo variant="title2" textAlign="right">
                    {weight + weightUnit}
                </Typo>
                <ConditionalRenderer
                    condition={diffWeight === 0}
                    trueContent={null}
                    falseContent={
                        <ConditionalRenderer
                            condition={diffWeight > 0}
                            trueContent={
                                <Typo variant="body3" color="placeholder" textAlign="right">
                                    +{diffWeight + weightUnit}
                                </Typo>
                            }
                            falseContent={
                                <Typo variant="body3" color="error" textAlign="right">
                                    {diffWeight + weightUnit}
                                </Typo>
                            }
                        />
                    }
                />
            </View>
            <View style={styles.actions}>
                <EditButton />
                <DeleteButton entityId={entityId} weightId={weightId} />
            </View>
        </View>
    );
}

function EditButton() {
    return (
        <TouchableOpacity>
            <Edit />
        </TouchableOpacity>
    );
}

function DeleteButton({ entityId, weightId }: { entityId: string; weightId: string }) {
    const { mutate, isPending } = useDeleteEntityWeight({ entityId });
    const openAlert = useAlert();

    const deleteWeight = () => {
        openAlert({
            contents: '정말로 삭제하시겠어요?',
            buttons: [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '삭제',
                    onPress: () => mutate({ weightId }),
                },
            ],
        });
    };

    return (
        <ConditionalRenderer
            condition={isPending}
            trueContent={<ActivityIndicator />}
            falseContent={
                <TouchableOpacity onPress={deleteWeight}>
                    <Delete />
                </TouchableOpacity>
            }
        />
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 80,
        borderColor: color.Gray[200].toString(),
        borderBottomWidth: 1,
    },
    topBoarder: {
        borderTopWidth: 1,
    },
    weightWrapper: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 10,
    },
});
