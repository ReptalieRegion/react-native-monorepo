import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

import useInfiniteFetchEntityWeight from '@/apis/diary/entity-manager/hooks/queries/useInfiniteFetchEntityWeight';

type InfiniteLineChartState = {
    entityId: string;
    yAxisSuffix?: string;
};

interface InfiniteLineChartActions {}

type InfiniteLineChartProps = InfiniteLineChartState & InfiniteLineChartActions;

export default function InfiniteLineChart({ entityId, yAxisSuffix }: InfiniteLineChartProps) {
    const { width } = useWindowDimensions();
    const { data } = useInfiniteFetchEntityWeight({ entityId });
    const newData = data.reduce<{ dateList: string[]; weightList: number[] }>(
        (prev, curr) => {
            return {
                dateList: [...prev.dateList, curr.date],
                weightList: [...prev.weightList, Number(curr.weight)],
            };
        },
        {
            dateList: [],
            weightList: [],
        },
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentOffset={{ x: 0, y: 0 }} showsHorizontalScrollIndicator={false}>
                <LineChart
                    segments={5}
                    data={{
                        labels: newData.dateList ? ['', ...newData.dateList] : [''],
                        datasets: [
                            {
                                data: newData.weightList ? [0, ...newData.weightList] : [0],
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
                    width={width - 20}
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
