import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Logo } from '@/assets/icons';

export default function SignInLogo() {
    const { width } = useWindowDimensions();
    const LogoSize = width * 0.3;

    return (
        <View style={styles.container}>
            <Logo width={LogoSize} height={LogoSize} />
            <Typo variant="body2" color="primary">
                Reptile Region
            </Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
});
