import { color } from '@crawl/design-system';
import React from 'react';
import { View, Text, StyleSheet, type ListRenderItem, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { BottomSheetListType } from '../mocks/list';

type TestBottomSheetState = {
    data: BottomSheetListType[];
};

interface TestBottomSheetActions {}

type TestBottomSheetProps = TestBottomSheetState & TestBottomSheetActions;

export default function TestBottomSheet({ data }: TestBottomSheetProps) {
    const renderItem: ListRenderItem<BottomSheetListType> = ({ item }) => {
        return (
            <View style={styles.itemWrapper}>
                <View style={styles.image} />
                <Text>{item.name}</Text>
            </View>
        );
    };

    const renderHeader = () => {
        return <TextInput style={styles.inputWrapper} placeholder="ex). name" />;
    };

    return (
        <View style={styles.wrapper}>
            <FlatList data={data} renderItem={renderItem} ListHeaderComponent={renderHeader} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    itemWrapper: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    image: {
        borderRadius: 9999,
        width: 40,
        height: 40,
        backgroundColor: color.Gray[400].toString(),
    },
    inputWrapper: {
        backgroundColor: color.Gray[200].toString(),
        marginHorizontal: 20,
        marginVertical: 10,
        height: 40,
        borderRadius: 10,
        padding: 10,
    },
});
