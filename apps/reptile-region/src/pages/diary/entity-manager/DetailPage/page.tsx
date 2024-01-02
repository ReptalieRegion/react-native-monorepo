import { Typo, color } from '@crawl/design-system';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCreateWeightBottomSheet from './bottom-sheet/CreateWeight/useCreateWeightBottomSheet';
import useUpdateWeightBottomSheet from './bottom-sheet/UpdateWeight/useUpdateWeightBottomSheet';
import WeightListItem from './components/WeightListItem';
import { ChangeHeader } from './header';
import useDeleteEntityWeight from './hooks/mutations/useDeleteEntityWeight';
import useFindEntity from './hooks/queries/useFindEntity';
import type { WeightData } from './hooks/queries/useInfiniteFetchEntityWeight';
import useInfiniteFetchEntityWeight from './hooks/queries/useInfiniteFetchEntityWeight';

import { Plus } from '@/assets/icons';
import { ConditionalRenderer, ListFooterLoading } from '@/components/@common/atoms';
import GenderIcon from '@/components/@common/molecules/GenderIcon/GenderIcon';
import useAlert from '@/components/overlay/Alert/useAlert';
import InfiniteLineChart from '@/pages/diary/entity-manager/DetailPage/components/InfiniteLineChart';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary/entity';

type ExtraData = Pick<FetchEntityListResponse['entity'], 'weightUnit' | 'id'>;

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
    const openUpdateWeightBottomSheet = useUpdateWeightBottomSheet();
    const openAlert = useAlert();
    const { mutate } = useDeleteEntityWeight({ entityId });

    const openAlertDeleteWeight = useCallback(
        (weightId: string) => {
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
        },
        [mutate, openAlert],
    );

    const renderListHeader = useCallback(
        () =>
            data?.entity ? (
                <>
                    <Image source={{ uri: data.entity.image.src }} style={{ width, height: width }} />
                    <View style={styles.container}>
                        <View style={styles.topContainer}>
                            <Typo variant="title1">
                                {data.entity.name} <GenderIcon gender={data.entity.gender} size={31} />
                            </Typo>
                            <View style={styles.hatchingContainer}>
                                <ConditionalRenderer
                                    condition={!!data.entity.hatching}
                                    trueContent={
                                        <Typo color="placeholder">{dayjs(data.entity.hatching).format('YYYY-MM-DD')}</Typo>
                                    }
                                    falseContent={null}
                                />
                            </View>
                        </View>
                        <View style={styles.tagContainer}>
                            <Typo variant="body1" color="primary">
                                {data.entity.variety.classification} · {data.entity.variety.species}
                            </Typo>
                        </View>
                        <View style={styles.tagContainer}>
                            <Typo variant="body1" color="primary">
                                {data.entity.variety.detailedSpecies}{' '}
                                {data.entity.variety.morph ? `· ${data.entity.variety.morph?.join(', ')}` : ''}
                            </Typo>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Typo variant="heading1Bold">최근 무게</Typo>
                        <TouchableOpacity
                            style={styles.plusContainer}
                            onPress={() =>
                                openCreateWeightBottomSheet({
                                    entity: {
                                        id: data.entity.id,
                                        weightUnit: data.entity.weightUnit,
                                    },
                                })
                            }
                        >
                            <Plus width={16} height={16} fill={color.White.toString()} />
                        </TouchableOpacity>
                    </View>
                    <InfiniteLineChart entityId={data.entity.id} yAxisSuffix={data.entity.weightUnit} />
                </>
            ) : null,
        [data?.entity, width, openCreateWeightBottomSheet],
    );

    const renderItem: ListRenderItem<WeightData> = useCallback(
        ({ item, index, extraData }) => (
            <WeightListItem
                weightInfo={item}
                index={index}
                entityInfo={extraData as ExtraData}
                onPressEdit={openUpdateWeightBottomSheet}
                onPressDelete={openAlertDeleteWeight}
            />
        ),
        [openUpdateWeightBottomSheet, openAlertDeleteWeight],
    );

    const extraData: ExtraData = useMemo(
        () => ({
            id: data?.entity.id ?? '',
            weightUnit: data?.entity.weightUnit ?? 'g',
        }),
        [data?.entity.id, data?.entity.weightUnit],
    );

    return data?.entity ? (
        <View style={wrapperStyle}>
            <ChangeHeader navigation={navigation} entity={data.entity} />
            <FlashList
                data={weightData}
                extraData={extraData}
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
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 10,
    },
});
