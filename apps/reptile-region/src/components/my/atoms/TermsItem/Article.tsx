import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ArticleProps = {
    subTitle: string;
    contents: string;
};

export default function Article({ subTitle, contents }: ArticleProps) {
    return (
        <View style={styles.contents}>
            <Typo variant="title2">{subTitle}</Typo>
            <Typo variant="body3" color="sub-placeholder" lineBreakStrategyIOS="hangul-word">
                {contents}
            </Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    contents: {
        gap: 5,
        marginBottom: 20,
    },
});
