import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type TitleProps = {
    contents: string;
};

export default function Title({ contents }: TitleProps) {
    return (
        <View style={styles.title}>
            <Typo variant="title5">{contents}</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 25,
    },
});
