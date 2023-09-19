import { Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type SharePostWriteTitleProps = {
    title: string;
};

const SharePostWriteTitle = ({ title }: SharePostWriteTitleProps) => {
    return (
        <View style={styles.container}>
            <Typo variant="heading3">
                {title}
                <Typo variant="heading3" color="require">
                    {' *'}
                </Typo>
            </Typo>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});

export default SharePostWriteTitle;
