import { TouchableTypo, Typo, color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ChangeHeader } from './header';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import { Plus } from '@/assets/icons';
import GenderIcon from '@/components/diary/atoms/GenderIcon/GenderIcon';
import InfiniteLineChart from '@/components/diary/organisms/Chart/components/InfiniteLineChart';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerDetailPage(props: EntityManagerDetailScreenProps) {
    const {
        navigation,
        route: {
            params: { entityId },
        },
    } = props;

    const { width } = useWindowDimensions();
    const { data } = useInfiniteFetchEntity();

    const foundEntity = data.find(({ entity }) => entity.id === entityId);
    if (foundEntity === undefined) {
        return null;
    }

    const {
        entity: { id, gender, hatching, image, name, variety, weightUnit },
    } = foundEntity;

    const navigateCreateWeight = () => {
        navigation.navigate('entity-manager/create-weight', { entity: { id, weightUnit } });
    };

    return (
        <>
            <ChangeHeader navigation={props.navigation} entity={{ hatching, id, image, name, variety }} />
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.wrapperContent}>
                <Image source={{ uri: image.src }} style={{ width, height: width }} />
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Typo variant="title1">{name}</Typo>
                        <GenderIcon gender={gender} size={31} />
                        <View style={styles.hatchingContainer}>
                            <Typo color="placeholder">{dayjs(hatching).format('YYYY-MM-DD')}</Typo>
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
                    <InfiniteLineChart yAxisSuffix={weightUnit} />
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
