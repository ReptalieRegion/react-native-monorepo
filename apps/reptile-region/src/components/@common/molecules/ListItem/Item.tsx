import { color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Chevron from './Chevron';
import EmphasisText from './EmphasisText';
import Title from './Title';

type ListState = {
    leftChildren?: ReactNode;
    rightChildren?: ReactNode;
};

interface ListActions {
    onPress?(): void;
}

type ListProps = ListState & ListActions;

export default function ListItem({ leftChildren, rightChildren, onPress }: ListProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.rightContainer}>{leftChildren}</View>
                <View style={styles.rightContainer}>{rightChildren}</View>
            </View>
        </TouchableOpacity>
    );
}

ListItem.Title = Title;
ListItem.EmphasisText = EmphasisText;
ListItem.Chevron = Chevron;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: color.White.toString(),
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
