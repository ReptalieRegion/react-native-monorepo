import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type UserOptionsMenuProps = {
    listItem: {
        text: string;
        onPress?(): void;
    }[];
    bottomSheetHeight: number;
};

export default function UserOptionsMenu({ listItem, bottomSheetHeight }: UserOptionsMenuProps) {
    return (
        <View style={[styles.content, { height: bottomSheetHeight }]}>
            {listItem.map(({ text, onPress }) => (
                <TouchableOpacity key={text} style={styles.listItem} onPress={onPress}>
                    <Typo>{text}</Typo>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});
