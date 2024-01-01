import { Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import type { WeightData } from '../hooks/queries/useInfiniteFetchEntityWeight';

import useDeleteEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useDeleteEntityWeight';
import { Edit } from '@/assets/icons';
import Delete from '@/assets/icons/Delete';
import { ConditionalRenderer } from '@/components/@common/atoms';
import type { WeightUnit } from '@/types/apis/diary/entity';

type WeightListItemState = {
    index: number;
    weightInfo: WeightData;
    weightUnit: WeightUnit;
};

interface WeightListItemActions {}

type WeightListItemProps = WeightListItemState & WeightListItemActions;

export default function WeightListItem({
    index,
    weightInfo: { id: weightId, date, diffWeight, weight },
    weightUnit,
}: WeightListItemProps) {
    const { mutate } = useDeleteEntityWeight();

    const deleteWeight = () => {
        mutate({ date, weightId });
    };

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
                <TouchableOpacity>
                    <Edit />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteWeight}>
                    <Delete />
                </TouchableOpacity>
            </View>
        </View>
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
