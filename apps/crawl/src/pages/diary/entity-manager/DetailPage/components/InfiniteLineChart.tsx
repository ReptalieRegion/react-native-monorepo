import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import useEntityWeightChartData from '../hooks/queries/useEntityWeightChartData';

type InfiniteLineChartState = {
    entityId: string;
    yAxisSuffix?: string;
};

interface InfiniteLineChartActions {}

type InfiniteLineChartProps = InfiniteLineChartState & InfiniteLineChartActions;

export default function InfiniteLineChart({ entityId, yAxisSuffix }: InfiniteLineChartProps) {
    const { width } = useWindowDimensions();
    const { data } = useEntityWeightChartData(entityId);

    return (
        <View style={styles.container}>
            <LineChart
                segments={5}
                data={{
                    labels: data?.dateList ? ['', ...data.dateList] : [''],
                    datasets: [
                        {
                            data: data?.weightList ? [0, ...data.weightList] : [0],
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
            <View />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
});
