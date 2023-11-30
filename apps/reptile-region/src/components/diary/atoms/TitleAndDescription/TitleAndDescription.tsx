import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export type TitleAndDescriptionProps = {
    title: string;
    description: string;
};

export default function TitleAndDescription({ title, description }: TitleAndDescriptionProps) {
    return (
        <View style={styles.container}>
            <Typo variant="heading2">{title}</Typo>
            <Typo variant="body2">{description}</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
});
