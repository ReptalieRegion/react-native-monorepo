import { color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import TitleAndDescription, { type TitleAndDescriptionProps } from '../TitleAndDescription/TitleAndDescription';

type CreateTemplateState = {
    contents: ReactNode;
    button: ReactNode;
};

interface CreateTemplateActions {}

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps & CreateTemplateActions;

export default function CreateTemplate({ title, description, contents, button }: CreateTemplateProps) {
    return (
        <View style={styles.container}>
            <TitleAndDescription title={title} description={description} />
            {contents}
            {button}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});
