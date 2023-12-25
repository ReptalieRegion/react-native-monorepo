import { TouchableTypo, Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import useCreateWeightBottomSheet from './@common/bottom-sheet/CreateWeight/useCreateWeightBottomSheet';
import useFindEntity from './@common/hooks/queries/useFindEntity';
import type { WeightData } from './@common/hooks/queries/useInfiniteFetchEntityWeight';
import useInfiniteFetchEntityWeight from './@common/hooks/queries/useInfiniteFetchEntityWeight';
import { ChangeHeader } from './header';

import { Plus } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';
import GenderIcon from '@/components/diary/atoms/GenderIcon/GenderIcon';
import InfiniteLineChart from '@/pages/diary/entity-manager/DetailPage/@common/components/InfiniteLineChart';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerDetailPage(props: EntityManagerDetailScreenProps) {
    const {
        route: {
            params: { entityId },
        },
    } = props;

    const { width } = useWindowDimensions();
    const {
        data: { entity },
    } = useFindEntity(entityId);
    const { data: weightData, fetchNextPage } = useInfiniteFetchEntityWeight(entityId);
    const openCreateWeightBottomSheet = useCreateWeightBottomSheet();

    const renderListHeader = useCallback(() => {
        const { id, gender, hatching, image, name, variety, weightUnit } = entity;
        const navigateCreateWeight = () => {
            openCreateWeightBottomSheet({ entity: { id, weightUnit } });
        };

        return (
            <>
                <Image source={{ uri: image.src }} style={{ width, height: width }} />
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Typo variant="title1">
                            {name} <GenderIcon gender={gender} size={31} />
                        </Typo>
                        <View style={styles.hatchingContainer}>
                            <ConditionalRenderer
                                condition={!!hatching}
                                trueContent={<Typo color="placeholder">{dayjs(hatching).format('YYYY-MM-DD')}</Typo>}
                                falseContent={null}
                            />
                        </View>
                    </View>
                    <View style={styles.tagContainer}>
                        <Typo variant="body1" color="primary">
                            {variety.classification} · {variety.species}
                        </Typo>
                    </View>
                    <View style={styles.tagContainer}>
                        <Typo variant="body1" color="primary">
                            {variety.detailedSpecies} {variety.morph ? `· ${variety.morph?.join(', ')}` : ''}
                        </Typo>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Typo variant="heading1Bold">최근 무게</Typo>
                    <TouchableOpacity style={styles.plusContainer} onPress={navigateCreateWeight}>
                        <Plus width={16} height={16} fill={color.White.toString()} />
                    </TouchableOpacity>
                    <View style={styles.weightDetailButtonContainer}>
                        <TouchableTypo variant="title5" color="placeholder">
                            자세히 보기
                        </TouchableTypo>
                    </View>
                </View>
                <InfiniteLineChart entityId={entity.id} yAxisSuffix={weightUnit} />
            </>
        );
    }, [entity, width, openCreateWeightBottomSheet]);

    const renderItem: ListRenderItem<WeightData> = useCallback(
        ({ item: { date, weight, diffWeight }, index }) => {
            return (
                <View style={[weightStyles.itemWrapper, index === 0 ? weightStyles.topBoarder : undefined]}>
                    <Typo>{dayjs(date).format('YYYY.MM.DD')}</Typo>
                    <View style={weightStyles.weightWrapper}>
                        <Typo variant="title2" textAlign="right">
                            {weight + entity.weightUnit}
                        </Typo>
                        <ConditionalRenderer
                            condition={diffWeight === 0}
                            trueContent={null}
                            falseContent={
                                <ConditionalRenderer
                                    condition={diffWeight > 0}
                                    trueContent={
                                        <Typo variant="body3" color="placeholder" textAlign="right">
                                            +{diffWeight + entity.weightUnit}
                                        </Typo>
                                    }
                                    falseContent={
                                        <Typo variant="body3" color="error" textAlign="right">
                                            {diffWeight + entity.weightUnit}
                                        </Typo>
                                    }
                                />
                            }
                        />
                    </View>
                </View>
            );
        },
        [entity.weightUnit],
    );

    return (
        <View style={styles.wrapper}>
            <ChangeHeader navigation={props.navigation} entity={entity} />
            <FlashList
                data={weightData}
                renderItem={renderItem}
                ListHeaderComponent={renderListHeader}
                onEndReached={fetchNextPage}
                estimatedItemSize={weightStyles.itemWrapper.height}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    container: {
        padding: 20,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 10,
    },
    hatchingContainer: {
        marginLeft: 'auto',
    },
    tagContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 20,
        marginBottom: 10,
    },
    plusContainer: {
        backgroundColor: color.Teal[150].toString(),
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
    },
    weightDetailButtonContainer: {
        marginLeft: 'auto',
        marginRight: 20,
    },
});

const weightStyles = StyleSheet.create({
    wrapper: {
        height: 500,
    },
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
});
