import { Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type NumberArticleProps = {
    subTitle: string;
    contents: string[];
};

export default function NumberArticle({ subTitle, contents }: NumberArticleProps) {
    return (
        <View style={styles.contents}>
            <Typo variant="title2">{subTitle}</Typo>
            {contents.map((content, index) => {
                return (
                    <View key={index} style={styles.numberContentsContainer}>
                        <Typo variant="body3" color="sub-placeholder">
                            {index + 1}.
                        </Typo>
                        <Typo key={index} variant="body3" color="sub-placeholder" lineBreakStrategyIOS="hangul-word">
                            {content}
                        </Typo>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    contents: {
        gap: 5,
        marginBottom: 20,
    },
    numberContentsContainer: {
        flexDirection: 'row',
        gap: 5,
    },
});
