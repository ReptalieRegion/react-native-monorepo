import { TouchableTypo, Typo, color } from '@crawl/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useCreateWeightBottomSheet from './@common/bottom-sheet/CreateWeight/useCreateWeightBottomSheet';
import useFindEntity from './@common/hooks/useFindEntity';
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
    const { data } = useFindEntity(entityId);
    const openCreateWeightBottomSheet = useCreateWeightBottomSheet();

    if (data === undefined) {
        return null;
    }

    const {
        entity: { id, gender, hatching, image, name, variety, weightUnit },
    } = data;

    const navigateCreateWeight = () => {
        openCreateWeightBottomSheet({ entity: { id, weightUnit } });
    };

    return (
        <>
            <ChangeHeader navigation={props.navigation} entity={{ hatching, id, image, name, variety, gender }} />
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.wrapperContent}>
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
                <View>
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
                    <InfiniteLineChart entityId={entityId} yAxisSuffix={weightUnit} />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    wrapperContent: {
        paddingBottom: 160,
    },
    container: {
        padding: 20,
        marginBottom: 40,
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
