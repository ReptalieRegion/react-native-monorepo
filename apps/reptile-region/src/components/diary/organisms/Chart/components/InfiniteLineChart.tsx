import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

type InfiniteLineChartState = {
    labels?: string[];
    data?: number[];
    yAxisSuffix?: string;
};

interface InfiniteLineChartActions {}

type InfiniteLineChartProps = InfiniteLineChartState & InfiniteLineChartActions;

export default function InfiniteLineChart({ labels, data, yAxisSuffix }: InfiniteLineChartProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentOffset={{ x: 0, y: 0 }} showsHorizontalScrollIndicator={false}>
                <LineChart
                    segments={5}
                    data={{
                        labels: labels ? ['', ...labels] : [''],
                        datasets: [
                            {
                                data: data ? [0, ...data] : [0],
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
