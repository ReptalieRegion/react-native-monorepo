import { color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Chevron from './Chevron';
import EmphasisText from './EmphasisText';
import Title from './Title';

type ListProps = {
    leftChildren?: ReactNode;
    rightChildren?: ReactNode;
};

export default function ListItem({ leftChildren, rightChildren }: ListProps) {
    return (
        <View style={styles.container}>
            <View style={styles.rightContainer}>{leftChildren}</View>
            <View style={styles.rightContainer}>{rightChildren}</View>
        </View>
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
