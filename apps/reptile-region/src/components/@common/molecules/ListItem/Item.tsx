import { color } from '@crawl/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ConditionalRenderer } from '../../atoms';

import Chevron from './Chevron';
import EmphasisText from './EmphasisText';
import Title from './Title';

type ListState = {
    leftChildren?: ReactNode;
    rightChildren?: ReactNode;
    style?: Pick<ViewStyle, 'paddingLeft' | 'paddingRight' | 'paddingBottom' | 'paddingTop'>;
};

interface ListActions {
    onPress?(): void;
}

type ListProps = ListState & ListActions;

function ListItemView({ leftChildren, rightChildren, style }: ListState) {
    return (
        <View style={[styles.container, StyleSheet.flatten(style)]}>
            <View style={styles.rightContainer}>{leftChildren}</View>
            <View style={styles.rightContainer}>{rightChildren}</View>
        </View>
    );
}

export default function ListItem({
    leftChildren,
    rightChildren,
    style = { paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 15 },
    onPress,
}: ListProps) {
    return (
        <ConditionalRenderer
            condition={!!onPress}
            trueContent={
                <TouchableOpacity onPress={onPress}>
                    <ListItemView leftChildren={leftChildren} rightChildren={rightChildren} style={style} />
                </TouchableOpacity>
            }
            falseContent={<ListItemView leftChildren={leftChildren} rightChildren={rightChildren} style={style} />}
        />
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
