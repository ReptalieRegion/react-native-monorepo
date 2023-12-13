import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type DividerProps = {
    height?: number;
    dividerColor?: string;
};

export default function Divider({ height = 1, dividerColor = color.Gray[200].toString() }: DividerProps) {
    return <View style={[{ backgroundColor: dividerColor, height: height, maxHeight: height }, styles.container]} />;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
