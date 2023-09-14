import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Logo } from '@/assets/icons';

const LogoAndTextPage = () => {
    const { width } = useWindowDimensions();
    const LogoSize = width * 0.3;

    return (
        <View style={styles.container}>
            <Logo width={LogoSize} height={LogoSize} />
            <Text style={styles.text}>Reptile Region</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    text: {
        color: color.Teal[150].toString(),
        fontSize: 14,
        fontFamily: 'DancingScript-Bold',
    },
});

export default LogoAndTextPage;
