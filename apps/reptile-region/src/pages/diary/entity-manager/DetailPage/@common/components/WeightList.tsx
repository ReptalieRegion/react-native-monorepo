import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import useInfiniteFetchEntityWeight, { type WeightData } from '../hooks/queries/useInfiniteFetchEntityWeight';

import { ConditionalRenderer } from '@/components/@common/atoms';
import type { WeightUnit } from '@/types/apis/diary/entity';

type WeightListState = {
    entityId: string;
    weightUnit: WeightUnit;
};

interface WeightListActions {}

type WeightListProps = WeightListState & WeightListActions;

export default function WeightList({ entityId, weightUnit }: WeightListProps) {
    const { data, fetchNextPage } = useInfiniteFetchEntityWeight(entityId);

    const renderItem: ListRenderItem<WeightData> = useCallback(
        ({ item: { date, weight, diffWeight }, index }) => {
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
                </View>
            );
        },
        [weightUnit],
    );

    return (
        <View style={styles.wrapper}>
            <FlashList data={data} renderItem={renderItem} onEndReached={fetchNextPage} estimatedItemSize={60} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 500,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
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
});
