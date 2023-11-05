import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootRoutesParamList } from '<routes/root>';

type LicenseListScreenProps = NativeStackScreenProps<RootRoutesParamList, 'my/license/contents'>;

export default function LicenseContentsPage({ route: { params } }: LicenseListScreenProps) {
    const { bottom } = useSafeAreaInsets();
    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: bottom + 20 }}>
                <View style={styles.licenseContentContainer}>
                    <Typo>{params.licenseContent}</Typo>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        padding: 10,
    },
    licenseContentContainer: {
        backgroundColor: color.Gray[100].toString(),
        padding: 5,
    },
});
