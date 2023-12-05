import { color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

type InfiniteLineChartState = {
    yAxisSuffix?: string;
};

interface InfiniteLineChartActions {}

type InfiniteLineChartProps = InfiniteLineChartState & InfiniteLineChartActions;

type WeightMap = {
    dateList: string[];
    weightList: number[];
};

const fetchWeight = () => {
    return range(30).reduce(
        (prev, _) => {
            const currenWeight = Math.random();
            const roundWeight = Math.round(currenWeight * 199);
            return {
                dateList: [...prev.dateList, dayjs().format('MM/DD')],
                weightList: [...prev.weightList, roundWeight],
            };
        },
        { dateList: [], weightList: [] } as { dateList: string[]; weightList: number[] },
    );
};

export default function InfiniteLineChart({ yAxisSuffix }: InfiniteLineChartProps) {
    const { width } = useWindowDimensions();
    const [weightMap, setWeightMap] = useState<WeightMap>();

    useEffect(() => {
        setWeightMap(fetchWeight());
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentOffset={{ x: 0, y: 0 }} showsHorizontalScrollIndicator={false}>
                <LineChart
                    segments={5}
                    data={{
                        labels: weightMap?.dateList ?? [''],
                        datasets: [
                            {
                                data: weightMap?.weightList ?? [0],
                                color: (opacity = 1) => color.Teal[150].alpha(opacity).toString(), // optional
                                strokeWidth: 1,
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
                    width={Math.max(width, (width * (weightMap?.dateList?.length ?? 0)) / 7)}
                    height={width - 40}
                    chartConfig={{
                        backgroundGradientFrom: color.White.toString(),
                        backgroundGradientTo: color.White.toString(),
                        color: (opacity = 1) => color.Teal[150].alpha(opacity).toString(),
                        labelColor: (opacity = 1) => color.DarkGray[500].alpha(opacity).toString(),
                        propsForLabels: {
                            fontSize: 12,
                        },
                        decimalPlaces: 0,
                        propsForDots: {
                            r: '3',
                            strokeWidth: '1',
                            stroke: color.White.toString(),
                        },
                        horizontalOffset: width,
                    }}
                    yAxisSuffix={yAxisSuffix}
                    bezier
                />
            </ScrollView>
            <View />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
});
