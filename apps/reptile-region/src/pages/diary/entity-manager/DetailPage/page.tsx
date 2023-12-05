import { Typo, color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ChangeHeader } from './header';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import GenderIcon from '@/components/diary/atoms/GenderIcon/GenderIcon';
import InfiniteLineChart from '@/components/diary/organisms/Chart/components/InfiniteLineChart';
import type { EntityManagerDetailScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerDetailPage(props: EntityManagerDetailScreenProps) {
    const {
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
        entity: { gender, hatching, image, name, variety, weightUnit },
    } = foundEntity;

    return (
        <>
            <ChangeHeader {...props} />
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
                        <Typo variant="heading1Bold" color="placeholder">
                            무게
                        </Typo>
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
        paddingBottom: 100,
    },
    container: {
        padding: 20,
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
        paddingLeft: 20,
        marginBottom: 10,
    },
});
