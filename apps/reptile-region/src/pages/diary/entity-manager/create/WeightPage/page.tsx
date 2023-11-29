import { TouchableTypo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { EntityManagerCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerWeightPage({ navigation }: EntityManagerCreateWeightScreenProps) {
    const nextPage = () => {
        navigation.navigate('name');
    };

    return (
        <View style={styles.container}>
            <TouchableTypo onPress={nextPage}>다음</TouchableTypo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
