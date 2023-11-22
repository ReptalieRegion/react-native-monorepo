import { color } from '@reptile-region/design-system';
import React from 'react';
import { View } from 'react-native';

type DividerProps = {
    height?: number;
    dividerColor?: string;
};

export default function Divider({ height = 0.4, dividerColor = color.Gray[350].toString() }: DividerProps) {
    return <View style={{ borderColor: dividerColor, borderWidth: height }} />;
}
