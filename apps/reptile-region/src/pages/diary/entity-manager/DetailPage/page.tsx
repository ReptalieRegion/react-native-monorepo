import { Typo, color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import { ChangeHeader } from './header';

import useInfiniteFetchEntity from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntity';
import GenderIcon from '@/components/diary/atoms/GenderIcon/GenderIcon';
import type { EntityManagerUpdateScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerDetailPage(props: EntityManagerUpdateScreenProps) {
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
        entity: { gender, hatching, image, name, variety, weight },
    } = foundEntity;

    const weightMap = weight.reduce(
        (prev, curr) => {
            const currenWeight = Number(curr.weight.replace('g', ''));
            const roundWeight = Math.round(currenWeight * 10) / 10;
            console.log(dayjs(curr.date).format('MM/DD'), roundWeight, typeof roundWeight);
            return {
                dateList: [...prev.dateList, dayjs(curr.date).format('MM/DD')],
                weightList: [...prev.weightList, roundWeight],
            };
        },
        { dateList: [], weightList: [] } as { dateList: string[]; weightList: number[] },
    );

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
                            {variety.detailedSpecies} {variety.morph ? `· ${variety.morph}` : ''}
                        </Typo>
                    </View>
                </View>
                <View>
                    <View style={styles.titleContainer}>
                        <Typo variant="heading1Bold" color="placeholder">
                            무게
                        </Typo>
                    </View>
                    <ScrollView
                        horizontal={true}
                        contentOffset={{ x: 0, y: 0 }}
                        showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                        <LineChart
                            data={{
                                labels: weightMap.dateList,
                                datasets: [
                                    {
                                        data: weightMap.weightList,
                                        color: (opacity = 1) => color.Teal[150].alpha(opacity).toString(), // optional
                                        strokeWidth: 2,
                                    },
                                    {
                                        data: [0],
                                        withDots: false,
                                    },
                                    {
                                        data: [100],
                                        withDots: false,
                                    },
                                ],
                            }}
                            width={Math.max(width, (width * weightMap.dateList.length) / 7)}
                            height={width - 40}
                            chartConfig={{
                                backgroundGradientFrom: color.White.toString(),
                                backgroundGradientTo: color.White.toString(),
                                color: (opacity = 1) => color.Teal[150].alpha(opacity).toString(),
                                labelColor: (opacity = 1) => color.DarkGray[500].alpha(opacity).toString(),
                                propsForLabels: {
                                    fontSize: 12,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: color.White.toString(),
                                },
                                horizontalOffset: width,
                            }}
                            formatYLabel={(v) => {
                                return v.split('.')[0];
                            }}
                            yAxisSuffix="g"
                            bezier
                        />
                    </ScrollView>
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
