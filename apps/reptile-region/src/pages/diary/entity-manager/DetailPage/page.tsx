import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCreateWeightBottomSheet from './bottom-sheet/CreateWeight/useCreateWeightBottomSheet';
import { ChangeHeader } from './header';
import useFindEntity from './hooks/queries/useFindEntity';
import type { WeightData } from './hooks/queries/useInfiniteFetchEntityWeight';
import useInfiniteFetchEntityWeight from './hooks/queries/useInfiniteFetchEntityWeight';

import { Plus } from '@/assets/icons';
import { ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';
import GenderIcon from '@/components/@common/molecules/GenderIcon/GenderIcon';
import InfiniteLineChart from '@/pages/diary/entity-manager/DetailPage/components/InfiniteLineChart';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerDetailPage({
    navigation,
    route: {
        params: { entityId },
    },
}: EntityManagerDetailScreenProps) {
    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const wrapperStyle = useMemo(() => [styles.wrapper, { paddingBottom: bottom }], [bottom]);

    const { data } = useFindEntity(entityId);
    const { data: weightData, isFetchingNextPage, fetchNextPage } = useInfiniteFetchEntityWeight(entityId);
    const openCreateWeightBottomSheet = useCreateWeightBottomSheet();

    const renderListHeader = useCallback(() => {
        if (!data?.entity) {
            return null;
        }

        const { id, gender, hatching, image, name, variety, weightUnit } = data.entity;
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
                </View>
                <InfiniteLineChart entityId={id} yAxisSuffix={weightUnit} />
            </>
        );
    }, [data?.entity, width, openCreateWeightBottomSheet]);

    const weightUnit = data?.entity.weightUnit ?? 'g';

    const renderItem: ListRenderItem<WeightData> = useCallback(
        ({ item: { date, weight, diffWeight }, index }) => {
            return (
                <View style={[weightStyles.itemWrapper, index === 0 ? weightStyles.topBoarder : undefined]}>
                    <Typo>{dayjs(date).format('YYYY.MM.DD')}</Typo>
                    <View style={weightStyles.weightWrapper}>
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

    return data?.entity ? (
        <View style={wrapperStyle}>
            <ChangeHeader navigation={navigation} entity={data.entity} />
            <FlashList
                data={weightData}
                renderItem={renderItem}
                onEndReached={fetchNextPage}
                estimatedItemSize={weightStyles.itemWrapper.height}
                ListHeaderComponent={renderListHeader}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        margin: 0,
        padding: 0,
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
