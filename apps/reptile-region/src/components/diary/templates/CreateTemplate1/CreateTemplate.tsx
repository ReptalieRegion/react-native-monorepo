import { color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import TitleAndDescription, { type TitleAndDescriptionProps } from '../../atoms/TitleAndDescription/TitleAndDescription';

type CreateTemplateState = {
    contents: ReactNode;
    button?: ReactNode;
};

interface CreateTemplateActions {}

type CreateTemplateProps = CreateTemplateState & TitleAndDescriptionProps & CreateTemplateActions;

export default function CreateTemplate({ title, description, contents, button }: CreateTemplateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <TitleAndDescription title={title} description={description} />
            </View>
            <View>{contents}</View>
            {button}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        paddingTop: 150,
        gap: 20,
        paddingHorizontal: 40,
    },
    text: {
        left: 0,
        justifyContent: 'flex-start',
    },
});
