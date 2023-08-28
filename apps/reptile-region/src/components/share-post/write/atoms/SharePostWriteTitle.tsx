import React from 'react';
import { StyleSheet, Text } from 'react-native';

type SharePostWriteTitleProps = {
    title: string;
};

const SharePostWriteTitle = ({ title }: SharePostWriteTitleProps) => {
    return (
        <Text style={styles.text}>
            {title}
            <Text style={styles.require}>{' *'}</Text>
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    require: {
        color: 'red',
    },
});

export default SharePostWriteTitle;
